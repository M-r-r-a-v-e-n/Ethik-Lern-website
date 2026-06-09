import React, { useEffect, useRef, useState } from 'react';
import { TOPICS, ALL_QUESTIONS, CATEGORIES, CATEGORY_COLORS } from './data/content.js';
import { TopicContent } from './components/TopicContent.jsx';
import { QuizEngine } from './components/QuizEngine.jsx';
import { useStats } from './hooks/useStats.js';
import styles from './App.module.css';

const FALLBACK_CATEGORIES = ['Friedensethik', 'Sinnsuche', 'Weltreligionen'];

const CATEGORY_COLORS_FALLBACK = {
  Friedensethik: 'rose',
  Sinnsuche: 'emerald',
  Weltreligionen: 'indigo',
};

const categoryList =
  Array.isArray(CATEGORIES) && CATEGORIES.length > 0
    ? CATEGORIES
    : FALLBACK_CATEGORIES;

const categoryColors = {
  ...CATEGORY_COLORS_FALLBACK,
  ...(CATEGORY_COLORS && typeof CATEGORY_COLORS === 'object' ? CATEGORY_COLORS : {}),
};

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function getQuestionId(q, fallbackIndex = 0) {
  if (!q) return '';
  if (q.id) return String(q.id);

  return `q-${fallbackIndex}-${q.category || 'unknown'}-${q.question || 'unknown'}`;
}

const DEFAULT_MINI_IDS = safeArray(ALL_QUESTIONS)
  .filter((q) => q?.mini === true || q?.important === true)
  .map((q) => q.id)
  .filter(Boolean);

function getMiniIds() {
  if (DEFAULT_MINI_IDS.length > 0) return DEFAULT_MINI_IDS;

  return safeArray(ALL_QUESTIONS)
    .slice(0, 10)
    .map((q) => q.id)
    .filter(Boolean);
}

function shuffle(input) {
  const a = safeArray(input);

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function HomeScreen({
  onNavigate,
  stats = {},
  wrongIds = [],
  learnedTopics = [],
  categories = categoryList,
}) {
  const correct = Number(stats.totalCorrect || 0);
  const wrong = Number(stats.totalWrong || 0);
  const totalPct = correct + wrong > 0
    ? Math.round((correct / (correct + wrong)) * 100)
    : null;

  const sessionCount = safeArray(stats.sessions).length;
  const wrongList = safeArray(wrongIds);
  const learnedList = safeArray(learnedTopics);
  const activeCategories = Array.isArray(categories) && categories.length > 0
    ? categories
    : categoryList;

  const miniCount = getMiniIds().length;

  return (
    <div className={styles.homeScreen}>
      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Quali-Vorbereitung</div>
        <h1 className={styles.heroTitle}>Ethik Lernapp</h1>
        <p className={styles.heroSub}>Friedensethik · Sinnsuche · Weltreligionen</p>

        {totalPct !== null && (
          <div className={styles.heroBadge}>
            <span>
              Trefferquote: <strong>{totalPct}%</strong>
            </span>
            <span className={styles.separator}>·</span>
            <span>{sessionCount} Quizze gespielt</span>
          </div>
        )}
      </div>

      <div className={styles.sectionHeader}>
        <span>Jetzt abfragen</span>
      </div>

      <div className={styles.modeGrid}>
        <button
          type="button"
          className={`${styles.modeCard} ${styles.modeCardMini}`}
          onClick={() => onNavigate('quiz', 'mini')}
        >
          <span className={styles.modeIcon}>⚡</span>
          <div>
            <div className={styles.modeName}>Mini-Quiz</div>
            <div className={styles.modeSub}>{miniCount} wichtigste Fragen · ~5 min</div>
          </div>
        </button>

        <button
          type="button"
          className={`${styles.modeCard} ${styles.modeCardFull}`}
          onClick={() => onNavigate('quiz', 'full')}
        >
          <span className={styles.modeIcon}>📋</span>
          <div>
            <div className={styles.modeName}>Großes Quiz</div>
            <div className={styles.modeSub}>
              {safeArray(ALL_QUESTIONS).length} alle Fragen · ~20 min
            </div>
          </div>
        </button>

        {wrongList.length > 0 && (
          <button
            type="button"
            className={`${styles.modeCard} ${styles.modeCardWrong}`}
            onClick={() => onNavigate('quiz', 'wrong')}
          >
            <span className={styles.modeIcon}>🔁</span>
            <div>
              <div className={styles.modeName}>Fehler üben</div>
              <div className={styles.modeSub}>{wrongList.length} gespeicherte Fehler</div>
            </div>
          </button>
        )}
      </div>

      {activeCategories.map((cat) => {
        const catTopics = safeArray(TOPICS).filter((t) => t.category === cat);
        const color = categoryColors[cat] || 'indigo';
        const colorClass = styles[`cat_${color}`] || '';

        return (
          <div key={cat} className={styles.catSection}>
            <div className={styles.sectionHeader}>
              <span className={`${styles.catPill} ${colorClass}`}>{cat}</span>
            </div>

            <div className={styles.topicGrid}>
              {catTopics.map((topic) => {
                const isLearned = learnedList.includes(topic.id);

                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={styles.topicCard}
                    onClick={() => onNavigate('topic', topic.id)}
                  >
                    <div className={styles.topicHeader}>
                      <span className={styles.topicIcon}>{topic.icon}</span>
                      {isLearned && <span className={styles.learnedBadge}>✓</span>}
                    </div>

                    <div className={styles.topicName}>{topic.title}</div>
                    <div className={styles.topicSub}>{topic.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopicScreen({ topicId, onBack, onQuiz, markLearned }) {
  const topic = safeArray(TOPICS).find((t) => t.id === topicId);

  useEffect(() => {
    if (topicId && typeof markLearned === 'function') {
      markLearned(topicId);
    }
  }, [topicId, markLearned]);

  if (!topic) return null;

  const color = topic.color || categoryColors[topic.category] || 'indigo';
  const colorClass = styles[`cat_${color}`] || '';

  return (
    <div>
      <div className={styles.screenHeader}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Zurück
        </button>

        <div>
          <div className={`${styles.catPill} ${colorClass}`}>
            {topic.category}
          </div>
          <h2 className={styles.screenTitle}>
            {topic.icon} {topic.title}
          </h2>
        </div>
      </div>

      <TopicContent topic={topic} />

      <div className={styles.topicActions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => onQuiz(topic.id)}
        >
          Dieses Thema abfragen →
        </button>

        <button type="button" className={styles.secondaryBtn} onClick={onBack}>
          ← Zur Übersicht
        </button>
      </div>
    </div>
  );
}

function ResultScreen({
  result = {},
  mode,
  onRestart,
  onHome,
  onWrongOnly,
  wrongIdsCount,
}) {
  const wrong = safeArray(result.wrong);
  const correct = Number(result.correct || 0);
  const total = correct + wrong.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚';
  const scoreClass = pct >= 75 ? styles.scoreGood : pct >= 50 ? styles.scoreOk : styles.scoreBad;
  const streak = safeArray(result.streak);

  return (
    <div>
      <div className={styles.screenHeader}>
        <h2 className={styles.screenTitle}>Ergebnis</h2>
      </div>

      <div className={styles.resultCard}>
        <div className={`${styles.bigScore} ${scoreClass}`}>{pct}%</div>
        <p className={styles.resultSub}>
          {emoji} {correct} von {total} Fragen richtig
        </p>

        <div className={styles.streakPreview}>
          {streak.map((s, i) => (
            <div
              key={`${s}-${i}`}
              className={`${styles.streakDot} ${s === 'c' ? styles.streakGood : styles.streakBad}`}
            />
          ))}
        </div>
      </div>

      {wrong.length > 0 && (
        <div className={styles.wrongList}>
          <h3 className={styles.wrongTitle}>Falsch beantwortet ({wrong.length})</h3>

          {wrong.map((q, i) => {
            const qId = getQuestionId(q, i);

            return (
              <div key={`${qId || mode}-${i}`} className={styles.wrongItem}>
                <span className={styles.wrongCat}>{q?.category || mode || 'Quiz'}</span>
                <span className={styles.wrongQ}>
                  {q?.question || 'Frage ohne Text'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.resultActions}>
        {wrongIdsCount > 0 && (
          <button type="button" className={styles.primaryBtn} onClick={onWrongOnly}>
            🔁 Fehler wiederholen ({wrongIdsCount})
          </button>
        )}

        <button type="button" className={styles.secondaryBtn} onClick={onRestart}>
          Nochmal
        </button>

        <button type="button" className={styles.secondaryBtn} onClick={onHome}>
          Zur Übersicht
        </button>
      </div>
    </div>
  );
}

function StatsScreen({ stats = {}, wrongIds = [], onBack, onReset }) {
  const total = (stats.totalCorrect || 0) + (stats.totalWrong || 0);
  const pct = total > 0
    ? Math.round(((stats.totalCorrect || 0) / total) * 100)
    : 0;

  const modeLabel = {
    mini: 'Mini',
    full: 'Groß',
    wrong: 'Fehler',
    topic: 'Thema',
  };

  const sessions = safeArray(stats.sessions);

  return (
    <div>
      <div className={styles.screenHeader}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          ← Zurück
        </button>
        <h2 className={styles.screenTitle}>Statistik</h2>
      </div>

      <div className={styles.statsRow}>
        {[
          {
            value: stats.totalCorrect || 0,
            label: 'Richtig',
            color: 'var(--emerald)',
          },
          {
            value: stats.totalWrong || 0,
            label: 'Falsch',
            color: 'var(--rose)',
          },
          {
            value: `${pct}%`,
            label: 'Trefferquote',
            color: 'var(--indigo)',
          },
          {
            value: sessions.length,
            label: 'Quizze',
            color: 'var(--text-muted)',
          },
        ].map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statValue} style={{ color: s.color }}>
              {s.value}
            </div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {wrongIds.length > 0 && (
        <div className={styles.wrongAlert}>
          <strong>{wrongIds.length} gespeicherte Fehler</strong> – diese Fragen hast du zuletzt falsch beantwortet.
        </div>
      )}

      {sessions.length > 0 && (
        <div className={styles.sessionTable}>
          <h3 className={styles.sectionLabel}>Letzte Quizze</h3>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Modus</th>
                  <th>Richtig</th>
                  <th>Falsch</th>
                  <th>%</th>
                </tr>
              </thead>

              <tbody>
                {[...sessions].reverse().slice(0, 10).map((s, i) => (
                  <tr key={i}>
                    <td>{s.date}</td>
                    <td>{modeLabel[s.mode] || s.mode}</td>
                    <td style={{ color: 'var(--emerald)', fontWeight: 600 }}>
                      {s.correct}
                    </td>
                    <td style={{ color: 'var(--rose)', fontWeight: 600 }}>
                      {s.wrong}
                    </td>
                    <td>
                      <strong>{s.pct}%</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {total === 0 && (
        <div className={styles.emptyStats}>
          Noch keine Quizze gespielt. Starte ein Quiz, um deine Statistik zu sehen!
        </div>
      )}

      <button
        type="button"
        className={styles.dangerBtn}
        onClick={() => {
          if (window.confirm('Statistik wirklich löschen?')) {
            onReset?.();
          }
        }}
      >
        Statistik zurücksetzen
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [topicId, setTopicId] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState('mini');
  const [quizTitle, setQuizTitle] = useState('');
  const [lastResult, setLastResult] = useState(null);
  const [quizKey, setQuizKey] = useState(0);

  const lastQuizRef = useRef({
    payload: 'mini',
    mode: 'mini',
    title: 'Mini-Quiz',
  });

  const quizModeRef = useRef('mini');

  const {
    stats,
    wrongIds,
    learnedTopics,
    addSession,
    updateWrongIds,
    markTopicLearned,
    resetAll,
  } = useStats();

  function prepareQuiz(payload = 'mini') {
    let qs = [];
    let title = 'Quiz';
    let mode = 'mini';

    if (payload === 'mini') {
      const miniIds = getMiniIds();

      qs = safeArray(ALL_QUESTIONS).filter((q) =>
        miniIds.includes(getQuestionId(q))
      );

      title = 'Mini-Quiz';
      mode = 'mini';
    } else if (payload === 'wrong') {
      const storedWrongIds = safeArray(wrongIds);

      qs = safeArray(ALL_QUESTIONS).filter((q) =>
        storedWrongIds.includes(getQuestionId(q))
      );

      title = 'Fehler-Quiz';
      mode = 'wrong';
    } else if (payload === 'full') {
      qs = shuffle(ALL_QUESTIONS);
      title = 'Großes Quiz';
      mode = 'full';
    } else if (payload && typeof payload === 'object' && Array.isArray(payload.questions)) {
      qs = shuffle(payload.questions.filter(Boolean));
      title = payload.title || 'Quiz';
      mode = payload.mode || 'topic';
    }

    if (qs.length === 0) {
      alert('Keine Fragen für dieses Quiz vorhanden.');
      return null;
    }

    return {
      questions: qs,
      title,
      mode,
    };
  }

  function startQuiz(payload = 'mini') {
    const prepared = prepareQuiz(payload);

    if (!prepared) return;

    lastQuizRef.current = {
      payload,
      mode: prepared.mode,
      title: prepared.title,
    };

    quizModeRef.current = prepared.mode;

    setQuizQuestions(prepared.questions);
    setQuizMode(prepared.mode);
    setQuizTitle(prepared.title);
    setLastResult(null);
    setQuizKey((key) => key + 1);
    setScreen('quiz');
  }

  function navigate(to, payload) {
    if (to === 'home') {
      setLastResult(null);
      setScreen('home');
      return;
    }

    if (to === 'topic') {
      setTopicId(payload);
      setScreen('topic');
      return;
    }

    if (to === 'quiz') {
      startQuiz(payload);
      return;
    }

    if (to === 'stats') {
      setScreen('stats');
    }
  }

  function handleTopicQuiz(tid) {
    const topic = safeArray(TOPICS).find((t) => t.id === tid);

    if (!topic) {
      alert('Thema nicht gefunden.');
      return;
    }

    const topicQuestions = safeArray(ALL_QUESTIONS).filter((q) =>
      safeArray(q.topicIds).includes(tid)
    );

    const fallbackQuestions = safeArray(ALL_QUESTIONS).filter((q) =>
      q.category === topic.category
    );

    const questions = topicQuestions.length > 0 ? topicQuestions : fallbackQuestions;

    navigate('quiz', {
      questions,
      title: topic.title || topic.id || 'Themen-Quiz',
      mode: 'topic',
    });
  }

  function handleQuizFinish(result = {}) {
    const wrong = safeArray(result.wrong);
    const allQuestions = safeArray(result.allQuestions);
    const correct = Number(result.correct || 0);

    const wrongQuestionIds = wrong
      .map((q, i) => getQuestionId(q, i))
      .filter(Boolean);

    const allQuestionIds = allQuestions
      .map((q, i) => getQuestionId(q, i))
      .filter(Boolean);

    const correctedQuestionIds = allQuestionIds.filter((id, index, arr) => {
      const isFirstOccurrence = arr.indexOf(id) === index;
      const wasNotWrong = !wrongQuestionIds.includes(id);

      return isFirstOccurrence && wasNotWrong;
    });

    updateWrongIds(wrongQuestionIds, correctedQuestionIds);
    addSession(correct, wrong.length, quizModeRef.current);

    setLastResult({
      ...result,
      correct,
      wrong,
      allQuestions,
    });

    setScreen('result');
  }

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <span className={styles.navBrand}>📚 Ethik Quali</span>

        <div className={styles.navLinks}>
          <button
            type="button"
            className={`${styles.navBtn} ${screen === 'home' ? styles.navActive : ''}`}
            onClick={() => navigate('home')}
          >
            Start
          </button>

          <button
            type="button"
            className={`${styles.navBtn} ${screen === 'stats' ? styles.navActive : ''}`}
            onClick={() => navigate('stats')}
          >
            Statistik
          </button>
        </div>
      </nav>

      <main className={styles.main}>
        {screen === 'home' && (
          <HomeScreen
            onNavigate={navigate}
            stats={stats}
            wrongIds={wrongIds}
            learnedTopics={learnedTopics}
            categories={categoryList}
          />
        )}

        {screen === 'topic' && (
          <TopicScreen
            topicId={topicId}
            onBack={() => navigate('home')}
            onQuiz={handleTopicQuiz}
            markLearned={markTopicLearned}
          />
        )}

        {screen === 'quiz' && (
          <div>
            <div className={styles.screenHeader}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => navigate('home')}
              >
                ✕ Abbrechen
              </button>
              <h2 className={styles.screenTitle}>{quizTitle}</h2>
            </div>

            <QuizEngine
              key={`quiz-${quizKey}`}
              questions={quizQuestions}
              title={quizTitle}
              onFinish={handleQuizFinish}
            />
          </div>
        )}

        {screen === 'result' && lastResult && (
          <ResultScreen
            result={lastResult}
            mode={quizMode}
            onRestart={() => navigate('quiz', lastQuizRef.current.payload)}
            onHome={() => navigate('home')}
            onWrongOnly={() => navigate('quiz', 'wrong')}
            wrongIdsCount={wrongIds.length}
          />
        )}

        {screen === 'stats' && (
          <StatsScreen
            stats={stats}
            wrongIds={wrongIds}
            onBack={() => navigate('home')}
            onReset={resetAll}
          />
        )}
      </main>
    </div>
  );
}