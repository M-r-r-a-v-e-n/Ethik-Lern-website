import React, { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { useUserData } from './hooks/useUserData.js';
import { AuthScreen } from './components/auth/AuthScreen.jsx';
import { ForYou } from './components/dashboard/ForYou.jsx';
import { QuizEngine } from './components/QuizEngine.jsx';
import { TopicContent } from './components/TopicContent.jsx';
import { CustomPathBuilder } from './components/custom/CustomPathBuilder.jsx';
import { BadgesScreen } from './components/badges/BadgesScreen.jsx';
import { Journal } from './components/journal/Journal.jsx';
import { QuizHub } from './components/subject/QuizHub.jsx';
import { ScenarioSimulator } from './components/scenario/ScenarioSimulator.jsx';
import { ArgumentBuilder } from './components/argument/ArgumentBuilder.jsx';
import { BADGES } from './lib/badges.js';
import { TOPICS as ETHIK_TOPICS, ALL_QUESTIONS as ETHIK_QUESTIONS, CATEGORIES, CATEGORY_COLORS, MINI_IDS } from './data/content.js';
import { ALL_QUESTIONS_DEDUPED, TOPICS_DEDUPED, getQuestionsBySubject, getTopicsBySubject } from './data/index.js';
import { SUBJECTS } from './data/subjects.js';
import scenariosData from '../data/scenarios/scenarios.json';
import styles from './App.module.css';

// Use merged questions for ALL quiz modes
const ALL_QUESTIONS = ALL_QUESTIONS_DEDUPED;
const TOPICS = TOPICS_DEDUPED;

const colorMap = { Friedensethik: 'rose', Sinnsuche: 'emerald', Weltreligionen: 'indigo' };

function safeArr(v) { return Array.isArray(v) ? v : []; }

function shuffle(input) {
  const a = [...safeArr(input)];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getQuestionId(q, i = 0) {
  return q?.id ?? `q-${i}`;
}

function getMiniIds() {
  if (Array.isArray(MINI_IDS) && MINI_IDS.length > 0) return MINI_IDS;
  return ALL_QUESTIONS.slice(0, 15).map((q) => q.id);
}

// ── Inner App (needs AuthContext) ─────────────────────────
function InnerApp() {
  const { user, loading, signOut, displayName, isOnline } = useAuth();
  const userData = useUserData();
  const {
    stats, wrongIds, badgeIds, journal, newBadges, dueQuestions,
    addSession, updateWrongIds, markTopicLearned,
    updateCard, addJournalEntry, deleteJournalEntry,
    resetAll, dismissNewBadges,
  } = userData;

  const [screen, setScreen] = useState('home');
  const [topicId, setTopicId] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState('mini');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizKey, setQuizKey] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  // ── IDs die in dieser App-Session korrekt beantwortet wurden ──
  // Werden beim nächsten Quiz gefiltert → keine Wiederholungen von bekannten Fragen
  const [sessionCorrectIds, setSessionCorrectIds] = useState(new Set());
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('eq_theme') || 'dark'; } catch { return 'dark'; } });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const lastQuizPayloadRef = useRef('mini');
  const quizModeRef = useRef('mini');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('eq_theme', theme); } catch {}
  }, [theme]);

  // Badge notification
  const [badgeNotif, setBadgeNotif] = useState(null);
  useEffect(() => {
    if (newBadges.length > 0) {
      const badge = BADGES.find((b) => b.id === newBadges[0]);
      if (badge) { setBadgeNotif(badge); setTimeout(() => { setBadgeNotif(null); dismissNewBadges(); }, 4000); }
    }
  }, [newBadges, dismissNewBadges]);

  if (loading) return <div className={styles.loadingScreen}><div className={styles.spinner} />Laden…</div>;
  if (!user && isOnline) return <AuthScreen />;

  // ── Quiz prep ───────────────────────────────────────────
  // correctIds = Fragen, die der Nutzer in dieser Session schon richtig beantwortet hat
  // Diese werden gefiltert damit keine Doppelungen kommen
  function prepareQuiz(payload) {
    let qs = [], title = 'Quiz', mode = 'mini';
    // IDs die in dieser Session bereits richtig beantwortet wurden
    const seen = sessionCorrectIds;

    // Hilfsfunktion: richtig beantwortete Fragen rausfiltern AUSSER bei gezielten Modi
    function filterSeen(questions, skipFilter = false) {
      if (skipFilter || seen.size === 0) return questions;
      const filtered = questions.filter((q) => !seen.has(q.id));
      return filtered.length > 0 ? filtered : questions;
    }

    if (payload === 'mini') {
      const ids = getMiniIds();
      qs = shuffle(filterSeen(safeArr(ALL_QUESTIONS).filter((q) => ids.includes(q.id))));
      title = 'Mini-Quiz'; mode = 'mini';
    } else if (payload === 'full') {
      qs = shuffle(filterSeen(ALL_QUESTIONS));
      title = 'Alle Fragen'; mode = 'full';
    } else if (payload === 'wrong') {
      // Fehler-Quiz: KEIN Filter – man soll Fehler üben auch wenn schon richtig
      qs = safeArr(ALL_QUESTIONS).filter((q) => safeArr(wrongIds).includes(q.id));
      title = 'Fehler-Quiz'; mode = 'wrong';
    } else if (payload === 'textonly') {
      qs = shuffle(filterSeen(safeArr(ALL_QUESTIONS).filter((q) => q.type === 'text')));
      title = 'Nur Schreiben'; mode = 'textonly';
    } else if (payload === 'review') {
      qs = dueQuestions.slice(0, 20);
      title = 'Wiederholung fälliger Karten'; mode = 'review';
    } else if (payload && typeof payload === 'object' && Array.isArray(payload.questions)) {
      qs = shuffle(filterSeen(payload.questions.filter(Boolean)));
      title = payload.title ?? 'Quiz'; mode = payload.mode ?? 'topic';
    }
    if (qs.length === 0) { alert('Keine Fragen für dieses Quiz.'); return null; }
    return { questions: qs, title, mode };
  }

  function startQuiz(payload) {
    const prepared = prepareQuiz(payload);
    if (!prepared) return;
    lastQuizPayloadRef.current = payload;
    quizModeRef.current = prepared.mode;
    setQuizQuestions(prepared.questions);
    setQuizMode(prepared.mode);
    setQuizTitle(prepared.title);
    setLastResult(null);
    setQuizKey((k) => k + 1);
    setScreen('quiz');
  }

  function navigate(to, payload) {
    if (to === 'home') { setLastResult(null); setScreen('home'); return; }
    if (to === 'quiz') { startQuiz(payload); return; }
    if (to === 'quizhub') { setScreen('quizhub'); return; }
    if (to === 'learn') { setTopicId(payload ?? null); setScreen('learn'); return; }
    if (to === 'custom') { setScreen('custom'); return; }
    if (to === 'badges') { setScreen('badges'); return; }
    if (to === 'journal') { setScreen('journal'); return; }
    if (to === 'stats') { setScreen('stats'); return; }
    if (to === 'scenarios') { setScreen('scenarios'); return; }
    if (to === 'argument') { setScreen('argument'); return; }
    if (to === 'more') { setScreen('more'); return; }
  }

  function handleQuizFinish(result = {}) {
    const wrong = safeArr(result.wrong);
    const allQs = safeArr(result.allQuestions);
    const correct = Number(result.correct ?? 0);
    const wrongQIds = wrong.map((q, i) => getQuestionId(q, i)).filter(Boolean);
    const allIds = allQs.map((q, i) => getQuestionId(q, i)).filter(Boolean);
    const corrected = allIds.filter((id) => !wrongQIds.includes(id));
    const textCorrect = allQs.filter((q, i) => q?.type === 'text' && result.streak?.[i] === 'c').length;
    updateWrongIds(wrongQIds, corrected);
    addSession(correct, wrong.length, quizModeRef.current, result.bestStreak ?? 0, textCorrect);
    // ── Merke richtig beantwortete Fragen für diese App-Session
    setSessionCorrectIds((prev) => {
      const next = new Set(prev);
      corrected.forEach((id) => next.add(id));
      return next;
    });
    setLastResult({ ...result, correct, wrong, allQuestions: allQs });
    setScreen('result');
  }

  const tabs = [
    { id: 'home', label: 'Für dich', icon: '✨' },
    { id: 'quizhub', label: 'Quiz', icon: '⚡', action: () => navigate('quizhub') },
    { id: 'learn', label: 'Lernen', icon: '📖', action: () => navigate('learn') },
    { id: 'custom', label: 'Eigener Pfad', icon: '🛠️', action: () => navigate('custom') },
    { id: 'more', label: 'Mehr', icon: '⋯', action: () => navigate('more') },
  ];

  const activeTab = screen === 'home' ? 'home' : screen === 'quizhub' ? 'quizhub' : screen === 'learn' ? 'learn' : screen === 'custom' ? 'custom' : ['journal','badges','stats','scenarios','argument','more'].includes(screen) ? 'more' : null;

  return (
    <div className={styles.app}>
      {/* Badge notification */}
      {badgeNotif && (
        <div className={styles.badgeToast}>
          <span>{badgeNotif.icon}</span>
          <div>
            <div className={styles.toastTitle}>Badge freigeschaltet!</div>
            <div className={styles.toastSub}>{badgeNotif.name} – {badgeNotif.desc}</div>
          </div>
          <button type="button" onClick={() => setBadgeNotif(null)} className={styles.toastClose}>✕</button>
        </div>
      )}

      {/* Nav */}
      <nav className={styles.nav}>
        <span className={styles.navBrand}>📚 Quali Lernen</span>
        <div className={styles.navRight}>
          <button type="button" className={styles.themeBtn} onClick={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀️' : '🌙'}</button>
          <div className={styles.userMenu}>
            <button type="button" className={styles.userBtn} onClick={() => setShowUserMenu((v) => !v)}>
              {displayName[0]?.toUpperCase() ?? '?'}
            </button>
            {showUserMenu && (
              <div className={styles.userDropdown}>
                <div className={styles.userDropName}>{displayName}</div>
                {user?.email && <div className={styles.userDropEmail}>{user.email}</div>}
                <div className={styles.userDropDivider} />
                <button type="button" className={styles.userDropItem} onClick={() => { navigate('badges'); setShowUserMenu(false); }}>🏆 Badges</button>
                <button type="button" className={styles.userDropItem} onClick={() => { navigate('stats'); setShowUserMenu(false); }}>📊 Statistik</button>
                <div className={styles.userDropDivider} />
                {isOnline && user && !user.isGuest
                  ? <button type="button" className={styles.userDropItem} onClick={() => { signOut(); setShowUserMenu(false); }}>← Abmelden</button>
                  : <div className={styles.userDropNote}>Offline-Modus</div>}
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {/* HOME */}
        {screen === 'home' && (
          <ForYou userData={userData} onNavigate={navigate} displayName={displayName} />
        )}

        {/* LEARN */}
        {screen === 'learn' && (
          <LearnScreen
            topicId={topicId}
            onSelectTopic={(tid) => { setTopicId(tid); setScreen('learn'); }}
            onBack={() => navigate('home')}
            onQuiz={(tid) => {
              const topic = TOPICS.find((t) => t.id === tid);
              const topicQs = ALL_QUESTIONS.filter((q) => safeArr(q.topicIds).includes(tid));
              const fallback = ALL_QUESTIONS.filter((q) => q.category === topic?.category);
              startQuiz({ questions: topicQs.length > 0 ? topicQs : fallback, title: topic?.title ?? tid, mode: 'topic' });
            }}
            markLearned={(tid) => {
              const topic = TOPICS.find((t) => t.id === tid);
              markTopicLearned(tid, topic?.category);
            }}
            learnedTopics={safeArr(stats?.learnedTopics)}
          />
        )}

        {/* QUIZ */}
        {screen === 'quiz' && (
          <div>
            <div className={styles.screenHeader}>
              <button type="button" className={styles.backBtn} onClick={() => navigate('home')}>✕ Abbrechen</button>
              <h2 className={styles.screenTitle}>{quizTitle}</h2>
            </div>
            <QuizEngine
              key={`quiz-${quizKey}`}
              questions={quizQuestions}
              title={quizTitle}
              onFinish={handleQuizFinish}
              onUpdateCard={updateCard}
            />
          </div>
        )}

        {/* RESULT */}
        {screen === 'result' && lastResult && (
          <ResultScreen
            result={lastResult}
            mode={quizMode}
            onRestart={() => startQuiz(lastQuizPayloadRef.current)}
            onHome={() => navigate('home')}
            onWrongOnly={() => startQuiz('wrong')}
            wrongIdsCount={wrongIds.length}
          />
        )}

        {/* CUSTOM */}
        {screen === 'custom' && (
          <CustomPathBuilder
            onStart={(payload) => startQuiz(payload)}
            onBack={() => navigate('home')}
          />
        )}

        {/* BADGES */}
        {screen === 'badges' && (
          <BadgesScreen badgeIds={badgeIds} stats={stats} onBack={() => navigate('home')} />
        )}

        {/* QUIZHUB */}
        {screen === 'quizhub' && (
          <QuizHub
            onStartQuiz={(payload) => {
              if (payload.mode === 'review') { startQuiz('review'); return; }
              if (payload.mode === 'wrong') { startQuiz('wrong'); return; }
              startQuiz(payload);
            }}
            wrongIds={wrongIds}
            dueCount={dueQuestions.length}
          />
        )}

        {/* SCENARIOS */}
        {screen === 'scenarios' && (
          <div>
            <div className={styles.screenHeader}>
              <button type="button" className={styles.backBtn} onClick={() => navigate('more')}>← Zurück</button>
              <h2 className={styles.screenTitle}>🧭 Szenario-Simulator</h2>
            </div>
            <ScenarioSimulator scenarios={scenariosData} />
          </div>
        )}

        {/* ARGUMENT BUILDER */}
        {screen === 'argument' && (
          <div>
            <div className={styles.screenHeader}>
              <button type="button" className={styles.backBtn} onClick={() => navigate('more')}>← Zurück</button>
              <h2 className={styles.screenTitle}>🏗️ Argument-Builder</h2>
            </div>
            <ArgumentBuilder topic="Sollte Social Media für unter 16-Jährige verboten werden?" />
          </div>
        )}

        {/* MORE SCREEN */}
        {screen === 'more' && (
          <MoreScreen onNavigate={navigate} />
        )}

        {/* JOURNAL */}
        {screen === 'journal' && (
          <Journal
            entries={journal}
            onAdd={addJournalEntry}
            onDelete={deleteJournalEntry}
          />
        )}

        {/* STATS */}
        {screen === 'stats' && (
          <StatsScreen
            stats={stats}
            wrongIds={wrongIds}
            onBack={() => navigate('home')}
            onReset={() => { if (window.confirm('Alle Daten löschen?')) resetAll(); }}
          />
        )}
      </main>

      {/* Bottom nav */}
      <nav className={styles.bottomNav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.bottomTab} ${activeTab === tab.id ? styles.bottomTabActive : ''}`}
            onClick={tab.action ? tab.action : () => navigate(tab.id)}
          >
            <span className={styles.bottomIcon}>{tab.icon}</span>
            <span className={styles.bottomLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// ── Learn Screen ───────────────────────────────────────────
function LearnScreen({ topicId, onSelectTopic, onBack, onQuiz, markLearned, learnedTopics = [] }) {
  const topic = topicId ? TOPICS.find((t) => t.id === topicId) : null;
  const [activeSubject, setActiveSubject] = React.useState('ethik');

  useEffect(() => {
    if (topicId && typeof markLearned === 'function') markLearned(topicId);
  }, [topicId, markLearned]);

  // subject-filtered topics computed inline

  // Filter topics by active subject
  const subjectTopics = TOPICS.filter((t) => {
    if (activeSubject === 'ethik') return (t.subjectId ?? 'ethik') === 'ethik';
    return t.subjectId === activeSubject;
  });
  const subjectCats = [...new Set(subjectTopics.map((t) => t.category).filter(Boolean))];

  const subjectColorMap = { deutsch: 'rose', ethik: 'indigo', english: 'emerald' };
  const catColor = (cat) => {
    // Try to derive color from subject
    const first = subjectTopics.find((t) => t.category === cat);
    if (first) return subjectColorMap[first.subjectId ?? 'ethik'] || 'indigo';
    return colorMap[cat] || 'indigo';
  };

  const subjectTabs = [
    { id: 'ethik', label: 'Ethik', icon: '⚖️' },
    { id: 'deutsch', label: 'Deutsch', icon: '✏️' },
    { id: 'english', label: 'English', icon: '📘' },
  ];

  return (
    <div>
      <div className={styles.screenHeader}>
        <button type="button" className={styles.backBtn} onClick={topic ? () => onSelectTopic(null) : onBack}>
          ← {topic ? 'Alle Themen' : 'Zurück'}
        </button>
        <h2 className={styles.screenTitle}>{topic ? `${topic.icon} ${topic.title}` : '📖 Themen lernen'}</h2>
      </div>

      {!topic && (
        <div>
          {/* Subject Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', padding: '4px' }}>
            {subjectTabs.map((tab) => (
              <button key={tab.id} type="button"
                style={{
                  flex: 1, padding: '0.45rem 0.5rem', border: 'none', cursor: 'pointer',
                  borderRadius: 'var(--radius-xs)', fontSize: 13, fontWeight: 700,
                  background: activeSubject === tab.id ? 'var(--surface)' : 'transparent',
                  color: activeSubject === tab.id ? 'var(--text)' : 'var(--text-muted)',
                  boxShadow: activeSubject === tab.id ? 'var(--shadow)' : 'none',
                  transition: 'all 0.15s',
                }}
                onClick={() => setActiveSubject(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {subjectCats.map((cat) => {
            const catTopics = subjectTopics.filter((t) => t.category === cat);
            const color = catColor(cat);
            return (
              <div key={cat} className={styles.catSection}>
                <div className={styles.catSectionHeader}>
                  <span className={`${styles.catPill} ${styles[`cat_${color}`]}`}>{cat}</span>
                </div>
                <div className={styles.topicGrid}>
                  {catTopics.map((t) => {
                    const isLearned = learnedTopics.includes(t.id);
                    return (
                      <button key={t.id} type="button" className={styles.topicCard} onClick={() => onSelectTopic(t.id)}>
                        <div className={styles.topicCardHeader}>
                          <span className={styles.topicCardIcon}>{t.icon}</span>
                          {isLearned && <span className={styles.learnedBadge}>✓</span>}
                        </div>
                        <div className={styles.topicCardName}>{t.title}</div>
                        <div className={styles.topicCardSub}>{t.subtitle}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {topic && (
        <div>
          <TopicContent topic={topic} />
          <div className={styles.topicActions}>
            <button type="button" className={styles.primaryBtn} onClick={() => onQuiz(topic.id)}>
              Dieses Thema abfragen →
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={() => onSelectTopic(null)}>
              ← Alle Themen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Result Screen ──────────────────────────────────────────
function ResultScreen({ result = {}, mode, onRestart, onHome, onWrongOnly, wrongIdsCount }) {
  const wrong = safeArr(result.wrong);
  const correct = Number(result.correct ?? 0);
  const total = correct + wrong.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const streak = safeArr(result.streak);
  const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚';
  const scoreClass = pct >= 75 ? styles.scoreGood : pct >= 50 ? styles.scoreOk : styles.scoreBad;

  return (
    <div>
      <div className={styles.screenHeader}><h2 className={styles.screenTitle}>Ergebnis</h2></div>
      <div className={styles.resultCard}>
        <div className={`${styles.bigScore} ${scoreClass}`}>{pct}%</div>
        <p className={styles.resultSub}>{emoji} {correct} von {total} richtig</p>
        {result.bestStreak > 0 && <p className={styles.resultStreak}>🔥 Beste Serie: {result.bestStreak}</p>}
        <div className={styles.streakDots}>
          {streak.map((s, i) => <div key={i} className={`${styles.streakDot} ${s === 'c' ? styles.streakGood : styles.streakBad}`} />)}
        </div>
      </div>

      {wrong.length > 0 && (
        <div className={styles.wrongList}>
          <h3 className={styles.wrongTitle}>Falsch beantwortet ({wrong.length})</h3>
          {wrong.map((q, i) => (
            <div key={i} className={styles.wrongItem}>
              <span className={styles.wrongCat}>{q?.category ?? mode}</span>
              <span className={styles.wrongQ}>{q?.question ?? '?'}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.resultActions}>
        {wrongIdsCount > 0 && <button type="button" className={styles.primaryBtn} onClick={onWrongOnly}>🔁 Fehler wiederholen ({wrongIdsCount})</button>}
        <button type="button" className={styles.secondaryBtn} onClick={onRestart}>Nochmal</button>
        <button type="button" className={styles.secondaryBtn} onClick={onHome}>Zur Übersicht</button>
      </div>
    </div>
  );
}

// ── Stats Screen ───────────────────────────────────────────
function StatsScreen({ stats = {}, wrongIds = [], onBack, onReset }) {
  const total = (stats.totalCorrect ?? 0) + (stats.totalWrong ?? 0);
  const pct = total > 0 ? Math.round(((stats.totalCorrect ?? 0) / total) * 100) : 0;
  const sessions = safeArr(stats.sessions);

  return (
    <div>
      <div className={styles.screenHeader}>
        <button type="button" className={styles.backBtn} onClick={onBack}>← Zurück</button>
        <h2 className={styles.screenTitle}>Statistik</h2>
      </div>
      <div className={styles.statsRow}>
        {[
          { value: stats.totalCorrect ?? 0, label: 'Richtig', color: 'var(--emerald)' },
          { value: stats.totalWrong ?? 0, label: 'Falsch', color: 'var(--rose)' },
          { value: `${pct}%`, label: 'Quote', color: 'var(--indigo)' },
          { value: stats.bestStreak ?? 0, label: 'Best Streak', color: 'var(--amber)' },
        ].map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
      {sessions.length > 0 && (
        <div className={styles.tableWrap}>
          <h3 className={styles.tableTitle}>Letzte Quizze</h3>
          <table className={styles.table}>
            <thead><tr><th>Datum</th><th>Modus</th><th>✓</th><th>✗</th><th>%</th></tr></thead>
            <tbody>
              {[...sessions].reverse().slice(0, 10).map((s, i) => (
                <tr key={i}>
                  <td>{s.date}</td>
                  <td>{s.mode}</td>
                  <td style={{ color: 'var(--emerald)', fontWeight: 700 }}>{s.correct}</td>
                  <td style={{ color: 'var(--rose)', fontWeight: 700 }}>{s.wrong}</td>
                  <td><strong>{s.pct}%</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {total === 0 && <p className={styles.emptyStats}>Noch keine Quizze gespielt.</p>}
      <button type="button" className={styles.dangerBtn} onClick={onReset}>🗑 Daten zurücksetzen</button>
    </div>
  );
}

// ── More Screen ────────────────────────────────────────────
function MoreScreen({ onNavigate }) {
  const items = [
    { icon: '🧭', label: 'Szenario-Simulator', desc: 'Ethische Dilemmas durchspielen', screen: 'scenarios' },
    { icon: '🏗️', label: 'Argument-Builder', desc: 'These–Argument–Beleg üben', screen: 'argument' },
    { icon: '📓', label: 'Reflexions-Journal', desc: 'Lernfortschritt reflektieren', screen: 'journal' },
    { icon: '🏆', label: 'Meine Badges', desc: 'Errungenschaften ansehen', screen: 'badges' },
    { icon: '📊', label: 'Statistik', desc: 'Quiz-Verlauf & Trefferquoten', screen: 'stats' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>Mehr</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item) => (
          <button key={item.screen} type="button"
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.12s' }}
            onClick={() => onNavigate(item.screen)}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--indigo-mid)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.desc}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-faint)', fontSize: 16 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
