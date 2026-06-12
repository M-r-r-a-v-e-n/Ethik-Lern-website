import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth.jsx';
import * as db from '../lib/db.js';
import { sm2, newCard, getDueCards } from '../lib/sm2.js';
import { checkNewBadges } from '../lib/badges.js';
import { ALL_QUESTIONS_DEDUPED as ALL_QUESTIONS } from '../data/index.js';

const LS = {
  get: (key, def) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

const DEFAULTS = {
  stats: { sessions: [], totalCorrect: 0, totalWrong: 0, bestStreak: 0, textCorrect: 0, cardsReviewed: 0, learnedTopics: [], learnedCategories: [] },
  wrongIds: [],
  cards: {},      // { [questionId]: cardState }
  badgeIds: [],
  journal: [],
};

export function useUserData() {
  const { user } = useAuth();
  const uid = user?.id ?? 'guest';

  const [stats, setStats] = useState(() => LS.get(`ethik_stats_${uid}`, DEFAULTS.stats));
  const [wrongIds, setWrongIds] = useState(() => LS.get(`ethik_wrong_${uid}`, []));
  const [cards, setCards] = useState(() => LS.get(`ethik_cards_${uid}`, {}));
  const [badgeIds, setBadgeIds] = useState(() => LS.get(`ethik_badges_${uid}`, []));
  const [journal, setJournal] = useState(() => LS.get(`ethik_journal_${uid}`, []));
  const [newBadges, setNewBadges] = useState([]);
  const [synced, setSynced] = useState(false);
  const syncRef = useRef(false);

  // ── Persist to localStorage on every change ──────────────
  useEffect(() => { LS.set(`ethik_stats_${uid}`, stats); }, [stats, uid]);
  useEffect(() => { LS.set(`ethik_wrong_${uid}`, wrongIds); }, [wrongIds, uid]);
  useEffect(() => { LS.set(`ethik_cards_${uid}`, cards); }, [cards, uid]);
  useEffect(() => { LS.set(`ethik_badges_${uid}`, badgeIds); }, [badgeIds, uid]);
  useEffect(() => { LS.set(`ethik_journal_${uid}`, journal); }, [journal, uid]);

  // ── Sync from Supabase on mount ───────────────────────────
  useEffect(() => {
    if (!user || user.isGuest || syncRef.current) return;
    syncRef.current = true;

    async function syncFromSupabase() {
      try {
        const [progress, sessions, remoteCards, remoteBadges, remoteJournal] = await Promise.all([
          db.loadProgress(user.id).catch(() => null),
          db.loadSessions(user.id).catch(() => []),
          db.loadCards(user.id).catch(() => []),
          db.loadBadges(user.id).catch(() => []),
          db.loadJournalEntries(user.id).catch(() => []),
        ]);

        if (progress) {
          setStats((prev) => ({
            ...DEFAULTS.stats,
            ...prev,
            ...(progress.stats ?? {}),
            sessions: sessions.length > 0
              ? sessions.map((s) => ({ date: s.created_at?.slice(0, 10), correct: s.correct, wrong: s.wrong, mode: s.mode, pct: s.pct }))
              : prev.sessions,
          }));
          if (progress.wrong_ids) setWrongIds(progress.wrong_ids);
          if (progress.badge_ids) setBadgeIds(progress.badge_ids);
        }

        if (remoteCards.length > 0) {
          const cardMap = {};
          for (const c of remoteCards) {
            cardMap[c.question_id] = {
              questionId: c.question_id,
              repetitions: c.repetitions,
              easeFactor: c.ease_factor,
              interval: c.interval,
              nextReview: c.next_review,
              lastReview: c.last_review,
              lastQuality: c.last_quality,
            };
          }
          setCards(cardMap);
        }

        if (remoteBadges.length > 0) {
          setBadgeIds(remoteBadges.map((b) => b.badge_id));
        }

        if (remoteJournal.length > 0) {
          setJournal(remoteJournal.map((e) => ({
            id: e.id,
            text: e.text,
            mood: e.mood,
            topicId: e.topic_id,
            date: e.created_at?.slice(0, 10),
            ts: new Date(e.created_at).getTime(),
          })));
        }

        setSynced(true);
      } catch (err) {
        console.warn('[sync] Supabase sync failed:', err.message);
        setSynced(true);
      }
    }

    syncFromSupabase();
  }, [user]);

  // ── Badge check helper ────────────────────────────────────
  const checkAndAwardBadges = useCallback(async (updatedStats, currentBadgeIds) => {
    const newly = checkNewBadges(updatedStats, currentBadgeIds);
    if (newly.length === 0) return currentBadgeIds;
    const merged = [...new Set([...currentBadgeIds, ...newly])];
    setBadgeIds(merged);
    setNewBadges(newly);
    if (user && !user.isGuest) {
      db.awardBadges(user.id, newly).catch(console.warn);
    }
    return merged;
  }, [user]);

  // ── Add quiz session ──────────────────────────────────────
  const addSession = useCallback(async (correct, wrong, mode, streak = 0, textCorrect = 0) => {
    const pct = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
    const sessionObj = {
      date: new Date().toLocaleDateString('de-DE'),
      correct, wrong, mode, pct,
      ts: Date.now(),
    };

    setStats((prev) => {
      const updated = {
        ...prev,
        totalCorrect: (prev.totalCorrect ?? 0) + correct,
        totalWrong: (prev.totalWrong ?? 0) + wrong,
        bestStreak: Math.max(prev.bestStreak ?? 0, streak),
        textCorrect: (prev.textCorrect ?? 0) + textCorrect,
        sessions: [...(prev.sessions ?? []), sessionObj].slice(-30),
      };
      // async badge check
      checkAndAwardBadges(updated, badgeIds);
      // async Supabase sync
      if (user && !user.isGuest) {
        db.addSession(user.id, { correct, wrong, mode, pct }).catch(console.warn);
        db.saveProgress(user.id, { stats: updated, wrong_ids: wrongIds, badge_ids: badgeIds }).catch(console.warn);
      }
      return updated;
    });
  }, [user, badgeIds, wrongIds, checkAndAwardBadges]);

  // ── Update wrong IDs ──────────────────────────────────────
  const updateWrongIds = useCallback((newWrong, corrected) => {
    setWrongIds((prev) => {
      const merged = [...new Set([...prev, ...newWrong])];
      return merged.filter((id) => !corrected.includes(id));
    });
  }, []);

  // ── Mark topic learned ────────────────────────────────────
  const markTopicLearned = useCallback((topicId, category) => {
    setStats((prev) => {
      const topics = [...new Set([...(prev.learnedTopics ?? []), topicId])];
      const cats = [...new Set([...(prev.learnedCategories ?? []), ...(category ? [category] : [])])];
      return { ...prev, learnedTopics: topics, learnedCategories: cats };
    });
  }, []);

  // ── SR card update ────────────────────────────────────────
  const updateCard = useCallback((questionId, quality) => {
    setCards((prev) => {
      const existing = prev[questionId] ?? newCard(questionId);
      const updated = { ...existing, ...sm2(existing, quality) };
      const next = { ...prev, [questionId]: updated };

      setStats((s) => {
        const reviewed = (s.cardsReviewed ?? 0) + 1;
        return { ...s, cardsReviewed: reviewed };
      });

      if (user && !user.isGuest) {
        db.upsertCard(user.id, updated).catch(console.warn);
      }
      return next;
    });
  }, [user]);

  // ── Initialize cards for new questions ───────────────────
  const ensureCards = useCallback((questionIds) => {
    setCards((prev) => {
      const toAdd = questionIds.filter((id) => !prev[id]);
      if (toAdd.length === 0) return prev;
      const additions = {};
      for (const id of toAdd) additions[id] = newCard(id);
      return { ...prev, ...additions };
    });
  }, []);

  // ── Journal ───────────────────────────────────────────────
  const addJournalEntry = useCallback(async (text, mood, topicId) => {
    const entry = {
      id: `j_${Date.now()}`,
      text,
      mood: mood ?? null,
      topicId: topicId ?? null,
      date: new Date().toLocaleDateString('de-DE'),
      ts: Date.now(),
    };
    setJournal((prev) => [entry, ...prev].slice(0, 50));

    if (user && !user.isGuest) {
      try {
        const remote = await db.addJournalEntry(user.id, { text, mood, topic_id: topicId });
        if (remote) {
          setJournal((prev) => prev.map((e) => e.id === entry.id ? { ...e, id: remote.id } : e));
        }
      } catch (err) {
        console.warn('[journal] save failed:', err.message);
      }
    }
    return entry;
  }, [user]);

  const deleteJournalEntry = useCallback(async (id) => {
    setJournal((prev) => prev.filter((e) => e.id !== id));
    if (user && !user.isGuest) {
      db.deleteJournalEntry(id, user.id).catch(console.warn);
    }
  }, [user]);

  // ── Dismiss new badge notification ───────────────────────
  const dismissNewBadges = useCallback(() => setNewBadges([]), []);

  // ── Computed: due cards ───────────────────────────────────
  const dueCards = getDueCards(Object.values(cards));
  const dueQuestions = dueCards
    .map((c) => ALL_QUESTIONS.find((q) => q.id === c.questionId))
    .filter(Boolean);

  // ── Reset ─────────────────────────────────────────────────
  const resetAll = useCallback(() => {
    setStats(DEFAULTS.stats);
    setWrongIds([]);
    setCards({});
    setBadgeIds([]);
    setJournal([]);
  }, []);

  return {
    stats, wrongIds, cards, badgeIds, journal,
    newBadges, dismissNewBadges, synced,
    dueCards, dueQuestions,
    addSession, updateWrongIds, markTopicLearned,
    updateCard, ensureCards,
    addJournalEntry, deleteJournalEntry,
    resetAll,
  };
}
