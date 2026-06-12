import React, { useMemo } from 'react';
import { ALL_QUESTIONS_DEDUPED as ALL_QUESTIONS, TOPICS_DEDUPED as TOPICS } from '../../data/index.js';
import { CATEGORIES } from '../../data/content.js';
import { BADGES } from '../../lib/badges.js';
import styles from './ForYou.module.css';

function safeArr(v) { return Array.isArray(v) ? v : []; }

export function ForYou({ userData, onNavigate, displayName }) {
  const { stats, wrongIds, dueQuestions, cards, badgeIds } = userData;
  const sessions = safeArr(stats?.sessions);
  const totalCorrect = stats?.totalCorrect ?? 0;
  const totalWrong = stats?.totalWrong ?? 0;
  const totalAnswered = totalCorrect + totalWrong;
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;
  const recentSessions = sessions.slice(-5).reverse();
  const learnedTopics = safeArr(stats?.learnedTopics);

  // ── Weak topics (most wrong answers) ─────────────────────
  const weakTopics = useMemo(() => {
    if (sessions.length === 0) return [];
    const wrongQs = ALL_QUESTIONS.filter((q) => safeArr(wrongIds).includes(q.id));
    const topicScore = {};
    for (const q of wrongQs) {
      for (const tid of safeArr(q.topicIds)) {
        topicScore[tid] = (topicScore[tid] ?? 0) + 1;
      }
    }
    return Object.entries(topicScore)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([tid, count]) => {
        const topic = TOPICS.find((t) => t.id === tid);
        return topic ? { ...topic, wrongCount: count } : null;
      })
      .filter(Boolean);
  }, [wrongIds, sessions.length]);

  // ── Next recommended topic ────────────────────────────────
  const nextTopic = useMemo(() => {
    const unleared = TOPICS.filter((t) => !learnedTopics.includes(t.id));
    return unleared[0] ?? null;
  }, [learnedTopics]);

  // ── Due cards count ───────────────────────────────────────
  const dueCount = dueQuestions.length;

  // ── Category progress ─────────────────────────────────────
  const catProgress = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catTopics = TOPICS.filter((t) => t.category === cat);
      const done = catTopics.filter((t) => learnedTopics.includes(t.id)).length;
      return { cat, total: catTopics.length, done, pct: catTopics.length > 0 ? Math.round((done / catTopics.length) * 100) : 0 };
    });
  }, [learnedTopics]);

  const isNew = sessions.length === 0;

  return (
    <div className={styles.root}>
      {/* Greeting */}
      <div className={styles.greeting}>
        <div className={styles.greetEmoji}>{isNew ? '👋' : overallPct >= 80 ? '🔥' : overallPct >= 60 ? '📈' : '💪'}</div>
        <div>
          <h1 className={styles.greetTitle}>
            {isNew ? `Hallo, ${displayName}!` : `Weiter so, ${displayName}!`}
          </h1>
          <p className={styles.greetSub}>
            {isNew
              ? 'Starte dein erstes Quiz oder lerne ein Thema kennen.'
              : overallPct !== null
              ? `Deine Trefferquote: ${overallPct}% · ${sessions.length} Quizze gespielt`
              : 'Wähle was du heute lernen willst.'}
          </p>
        </div>
      </div>

      {/* Due cards CTA */}
      {dueCount > 0 && (
        <button type="button" className={styles.dueCta} onClick={() => onNavigate('quiz', 'review')}>
          <span className={styles.dueIcon}>🔁</span>
          <div>
            <div className={styles.dueName}>{dueCount} Karte{dueCount !== 1 ? 'n' : ''} zur Wiederholung</div>
            <div className={styles.dueSub}>Spaced Repetition – heute fällig</div>
          </div>
          <span className={styles.dueArrow}>→</span>
        </button>
      )}

      {/* Recommended actions */}
      <div className={styles.sectionHead}>Für dich empfohlen</div>
      <div className={styles.recGrid}>
        {weakTopics.length > 0 && (
          <button type="button" className={`${styles.recCard} ${styles.recCardWeak}`}
            onClick={() => onNavigate('quiz', {
              questions: ALL_QUESTIONS.filter((q) => safeArr(q.topicIds).some((t) => weakTopics.map((x) => x.id).includes(t))),
              title: 'Schwache Themen', mode: 'weak',
            })}>
            <span className={styles.recIcon}>📉</span>
            <div className={styles.recText}>
              <div className={styles.recName}>Schwächen aufholen</div>
              <div className={styles.recSub}>{weakTopics.map((t) => t.title).join(', ')}</div>
            </div>
          </button>
        )}

        {nextTopic && (
          <button type="button" className={`${styles.recCard} ${styles.recCardNext}`}
            onClick={() => onNavigate('learn', nextTopic.id)}>
            <span className={styles.recIcon}>{nextTopic.icon}</span>
            <div className={styles.recText}>
              <div className={styles.recName}>Nächstes Thema</div>
              <div className={styles.recSub}>{nextTopic.title}</div>
            </div>
          </button>
        )}

        {safeArr(wrongIds).length > 0 && (
          <button type="button" className={`${styles.recCard} ${styles.recCardWrong}`}
            onClick={() => onNavigate('quiz', 'wrong')}>
            <span className={styles.recIcon}>🔁</span>
            <div className={styles.recText}>
              <div className={styles.recName}>Fehler wiederholen</div>
              <div className={styles.recSub}>{safeArr(wrongIds).length} gespeicherte Fehler</div>
            </div>
          </button>
        )}

        <button type="button" className={`${styles.recCard} ${styles.recCardMini}`}
          onClick={() => onNavigate('quiz', 'mini')}>
          <span className={styles.recIcon}>⚡</span>
          <div className={styles.recText}>
            <div className={styles.recName}>Mini-Quiz</div>
            <div className={styles.recSub}>Wichtigste Fragen · ~5 min</div>
          </div>
        </button>
      </div>

      {/* Category progress */}
      <div className={styles.sectionHead}>Lernfortschritt</div>
      <div className={styles.progressCards}>
        {catProgress.map(({ cat, total, done, pct }) => {
          const colorMap = { Friedensethik: 'rose', Sinnsuche: 'emerald', Weltreligionen: 'indigo' };
          const color = colorMap[cat] || 'indigo';
          return (
            <div key={cat} className={styles.progressCard}>
              <div className={styles.progressCatRow}>
                <span className={styles.progressCatName}>{cat}</span>
                <span className={styles.progressCatPct}>{done}/{total} Themen</span>
              </div>
              <div className={styles.progressBarWrap}>
                <div
                  className={`${styles.progressBar} ${styles[`bar_${color}`]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent sessions mini chart */}
      {recentSessions.length > 0 && (
        <>
          <div className={styles.sectionHead}>Letzte Quizze</div>
          <div className={styles.recentRow}>
            {recentSessions.map((s, i) => (
              <div key={i} className={styles.recentDot}>
                <div
                  className={styles.recentBar}
                  style={{ height: `${Math.max(8, s.pct * 0.4)}px`, background: s.pct >= 75 ? 'var(--emerald)' : s.pct >= 50 ? 'var(--amber)' : 'var(--rose)' }}
                  title={`${s.pct}% – ${s.date}`}
                />
                <div className={styles.recentPct}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Badges preview */}
      {safeArr(badgeIds).length > 0 && (
        <>
          <div className={styles.sectionHead}>Deine Badges <button type="button" className={styles.sectionLink} onClick={() => onNavigate('badges')}>Alle →</button></div>
          <div className={styles.badgeRow}>
            {safeArr(badgeIds).slice(0, 5).map((id) => {
              
              const badge = BADGES.find((b) => b.id === id);
              if (!badge) return null;
              return (
                <div key={id} className={styles.badgeDot} title={badge.name}>
                  <span style={{ fontSize: '1.5rem' }}>{badge.icon}</span>
                  <div className={styles.badgeName}>{badge.name}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
