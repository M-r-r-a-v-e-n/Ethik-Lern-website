import React, { useMemo, useState } from 'react';
import { ALL_QUESTIONS_DEDUPED as ALL_QUESTIONS, TOPICS_DEDUPED as TOPICS, getTopicsBySubject, getQuestionsBySubject } from '../../data/index.js';
import { SUBJECTS } from '../../data/subjects.js';
import { BADGES } from '../../lib/badges.js';
import styles from './ForYou.module.css';

function safeArr(v) { return Array.isArray(v) ? v : []; }

function greetTime() {
  const h = new Date().getHours();
  if (h < 12) return 'Guten Morgen';
  if (h < 17) return 'Guten Tag';
  return 'Guten Abend';
}

export function ForYou({ userData, onNavigate, displayName }) {
  const { stats, wrongIds, dueQuestions, badgeIds } = userData;
  const sessions = safeArr(stats?.sessions);
  const totalCorrect = stats?.totalCorrect ?? 0;
  const totalWrong = stats?.totalWrong ?? 0;
  const totalAnswered = totalCorrect + totalWrong;
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;
  const recentSessions = sessions.slice(-7).reverse();
  const learnedTopics = safeArr(stats?.learnedTopics);
  const isNew = sessions.length === 0;
  const dueCount = dueQuestions.length;

  // ── Per-subject progress ───────────────────────────────
  const subjectStats = useMemo(() => {
    return SUBJECTS.map((s) => {
      const subTopics = getTopicsBySubject(s.id);
      const subQs = getQuestionsBySubject(s.id);
      const done = subTopics.filter((t) => learnedTopics.includes(t.id)).length;
      const pct = subTopics.length > 0 ? Math.round((done / subTopics.length) * 100) : 0;
      // answered in this subject
      const answeredIds = safeArr(wrongIds);
      return { ...s, topicCount: subTopics.length, qCount: subQs.length, done, pct };
    });
  }, [learnedTopics, wrongIds]);

  // ── Weak topics across all subjects ──────────────────
  const weakTopics = useMemo(() => {
    if (sessions.length === 0) return [];
    const wrongQs = ALL_QUESTIONS.filter((q) => safeArr(wrongIds).includes(q.id));
    const topicScore = {};
    for (const q of wrongQs) {
      for (const tid of safeArr(q.topicIds)) topicScore[tid] = (topicScore[tid] ?? 0) + 1;
    }
    return Object.entries(topicScore)
      .sort(([, a], [, b]) => b - a).slice(0, 3)
      .map(([tid, count]) => {
        const topic = TOPICS.find((t) => t.id === tid);
        return topic ? { ...topic, wrongCount: count } : null;
      }).filter(Boolean);
  }, [wrongIds, sessions.length]);

  // ── Smart "next topic" per subject ───────────────────
  const nextTopics = useMemo(() => {
    return SUBJECTS.map((s) => {
      const subTopics = getTopicsBySubject(s.id);
      const next = subTopics.find((t) => !learnedTopics.includes(t.id));
      return next ? { ...s, nextTopic: next } : null;
    }).filter(Boolean);
  }, [learnedTopics]);

  // ── Mood/motivation message ───────────────────────────
  const motivMsg = useMemo(() => {
    if (isNew) return 'Fang einfach an – jedes Thema bringt dich weiter! 🚀';
    if (overallPct >= 85) return 'Hammer! Du bist auf Quali-Kurs. Weiter so! 🔥';
    if (overallPct >= 70) return 'Sehr gut! Noch ein bisschen üben und du bist ready. 💪';
    if (overallPct >= 50) return 'Guter Fortschritt – konzentrier dich auf deine Schwachstellen. 📈';
    return 'Du schaffst das! Leg einfach los und üb täglich ein bisschen. 🌱';
  }, [isNew, overallPct]);

  const colorMap = { deutsch: 'rose', ethik: 'indigo', english: 'emerald' };

  return (
    <div className={styles.root}>

      {/* ── Greeting ── */}
      <div className={styles.greeting}>
        <div className={styles.greetLeft}>
          <p className={styles.greetTime}>{greetTime()}, {displayName} 👋</p>
          <h1 className={styles.greetTitle}>
            {isNew ? 'Willkommen!' : overallPct !== null ? `${overallPct}% Trefferquote` : 'Wie läuft\'s?'}
          </h1>
          <p className={styles.greetSub}>{motivMsg}</p>
        </div>
        {!isNew && overallPct !== null && (
          <div className={styles.greetScore} style={{ color: overallPct >= 75 ? 'var(--emerald)' : overallPct >= 50 ? 'var(--amber)' : 'var(--rose)' }}>
            {overallPct}<span className={styles.greetScoreUnit}>%</span>
          </div>
        )}
      </div>

      {/* ── Due cards CTA ── */}
      {dueCount > 0 && (
        <button type="button" className={styles.dueCta} onClick={() => onNavigate('quiz', 'review')}>
          <span className={styles.dueIcon}>🔁</span>
          <div>
            <div className={styles.dueName}>{dueCount} Karte{dueCount !== 1 ? 'n' : ''} zur Wiederholung</div>
            <div className={styles.dueSub}>Spaced Repetition · heute fällig</div>
          </div>
          <span className={styles.dueArrow}>→</span>
        </button>
      )}

      {/* ── Fächer-Fortschritt ── */}
      <div className={styles.sectionHead}>Fächer</div>
      <div className={styles.subjectGrid}>
        {subjectStats.map((s) => {
          const color = colorMap[s.id] ?? 'indigo';
          return (
            <button key={s.id} type="button" className={`${styles.subjectCard} ${styles[`subj_${color}`]}`}
              onClick={() => onNavigate('quizhub')}>
              <div className={styles.subjectTop}>
                <span className={styles.subjectIcon}>{s.icon}</span>
                <span className={styles.subjectPct}>{s.pct}%</span>
              </div>
              <div className={styles.subjectName}>{s.label}</div>
              <div className={styles.subjectMeta}>{s.done}/{s.topicCount} Themen</div>
              <div className={styles.subjectBarWrap}>
                <div className={`${styles.subjectBar} ${styles[`bar_${color}`]}`} style={{ width: `${Math.max(4, s.pct)}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Für dich empfohlen ── */}
      <div className={styles.sectionHead}>Für dich empfohlen</div>
      <div className={styles.recList}>

        {weakTopics.length > 0 && (
          <button type="button" className={`${styles.recCard} ${styles.recWeak}`}
            onClick={() => onNavigate('quiz', {
              questions: ALL_QUESTIONS.filter((q) => safeArr(q.topicIds).some((t) => weakTopics.map((x) => x.id).includes(t))),
              title: 'Schwachen Themen aufholen', mode: 'weak',
            })}>
            <span className={styles.recIcon}>📉</span>
            <div className={styles.recBody}>
              <div className={styles.recTitle}>Schwächen aufholen</div>
              <div className={styles.recDesc}>{weakTopics.map((t) => t.title).join(' · ')}</div>
            </div>
            <span className={styles.recArrow}>→</span>
          </button>
        )}

        <button type="button" className={`${styles.recCard} ${styles.recMini}`}
          onClick={() => onNavigate('quiz', 'mini')}>
          <span className={styles.recIcon}>⚡</span>
          <div className={styles.recBody}>
            <div className={styles.recTitle}>Mini-Quiz · 5 min</div>
            <div className={styles.recDesc}>Die wichtigsten Fragen aller Fächer</div>
          </div>
          <span className={styles.recArrow}>→</span>
        </button>

        {nextTopics.slice(0, 2).map((s) => (
          <button key={s.id} type="button" className={`${styles.recCard} ${styles.recNext}`}
            onClick={() => onNavigate('learn', s.nextTopic.id)}>
            <span className={styles.recIcon}>{s.nextTopic.icon}</span>
            <div className={styles.recBody}>
              <div className={styles.recTitle}>{s.icon} {s.label}: nächstes Thema</div>
              <div className={styles.recDesc}>{s.nextTopic.title}</div>
            </div>
            <span className={styles.recArrow}>→</span>
          </button>
        ))}

        {safeArr(wrongIds).length > 0 && (
          <button type="button" className={`${styles.recCard} ${styles.recWrong}`}
            onClick={() => onNavigate('quiz', 'wrong')}>
            <span className={styles.recIcon}>🔁</span>
            <div className={styles.recBody}>
              <div className={styles.recTitle}>Fehler wiederholen</div>
              <div className={styles.recDesc}>{safeArr(wrongIds).length} gespeicherte Fehler</div>
            </div>
            <span className={styles.recArrow}>→</span>
          </button>
        )}
      </div>

      {/* ── Letzte Quizze ── */}
      {recentSessions.length > 0 && (
        <>
          <div className={styles.sectionHead}>Letzte Quizze</div>
          <div className={styles.sessionChart}>
            {recentSessions.map((s, i) => (
              <div key={i} className={styles.sessionCol}>
                <div className={styles.sessionBarWrap}>
                  <div className={styles.sessionBar}
                    style={{
                      height: `${Math.max(10, s.pct * 0.52)}px`,
                      background: s.pct >= 75 ? 'var(--emerald)' : s.pct >= 50 ? 'var(--amber)' : 'var(--rose)',
                    }}
                    title={`${s.pct}% – ${s.date}`}
                  />
                </div>
                <div className={styles.sessionPct}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Badges Preview ── */}
      {safeArr(badgeIds).length > 0 && (
        <>
          <div className={styles.sectionHead}>
            Badges
            <button type="button" className={styles.sectionLink} onClick={() => onNavigate('badges')}>Alle →</button>
          </div>
          <div className={styles.badgeRow}>
            {safeArr(badgeIds).slice(0, 6).map((id) => {
              const badge = BADGES.find((b) => b.id === id);
              if (!badge) return null;
              return (
                <div key={id} className={styles.badgeDot} title={`${badge.name}: ${badge.desc}`}>
                  <span className={styles.badgeEmoji}>{badge.icon}</span>
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
