import React, { useMemo, useState } from 'react';
import { SubjectSelector } from '../subject/SubjectSelector.jsx';
import { SUBJECTS } from '../../data/subjects.js';
import { getTopicsBySubject, getQuestionsBySubject, getCategoriesBySubject, SUBJECTS_DATA } from '../../data/index.js';
import styles from './QuizHub.module.css';

function safeArr(v) { return Array.isArray(v) ? v : []; }

function shuffle(arr) {
  const a = [...safeArr(arr)];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function QuizHub({ onStartQuiz, wrongIds = [], dueCount = 0 }) {
  const [activeSubject, setActiveSubject] = useState('ethik');
  const [expandedCat, setExpandedCat] = useState(null);

  const topics = useMemo(() => getTopicsBySubject(activeSubject), [activeSubject]);
  const questions = useMemo(() => getQuestionsBySubject(activeSubject), [activeSubject]);
  const categories = useMemo(() => getCategoriesBySubject(activeSubject), [activeSubject]);
  const textQs = questions.filter((q) => q.type === 'text');

  const subjectInfo = SUBJECTS.find((s) => s.id === activeSubject);

  function startSubjectQuiz(type) {
    let qs = questions;
    let title = `${subjectInfo?.label} – `;
    if (type === 'textonly') { qs = textQs; title += 'Nur Schreiben'; }
    else if (type === 'mc') { qs = questions.filter((q) => q.type === 'mc'); title += 'Multiple Choice'; }
    else { title += 'Alle Fragen'; }
    onStartQuiz({ questions: shuffle(qs), title, mode: type });
  }

  function startCategoryQuiz(cat, typeFilter = 'all') {
    const catTopics = topics.filter((t) => t.category === cat);
    const catTopicIds = catTopics.map((t) => t.id);
    let qs = questions.filter((q) => safeArr(q.topicIds).some((tid) => catTopicIds.includes(tid)));
    if (typeFilter === 'textonly') qs = qs.filter((q) => q.type === 'text');
    if (qs.length === 0) return;
    onStartQuiz({ questions: shuffle(qs), title: `${cat}`, mode: 'topic' });
  }

  function startTopicQuiz(topicId, topicTitle) {
    const qs = questions.filter((q) => safeArr(q.topicIds).includes(topicId));
    if (qs.length === 0) return;
    onStartQuiz({ questions: shuffle(qs), title: topicTitle, mode: 'topic' });
  }

  const colorMap = { deutsch: 'rose', ethik: 'indigo', english: 'emerald' };
  const color = colorMap[activeSubject] ?? 'indigo';

  return (
    <div className={styles.root}>
      {/* Due cards shortcut */}
      {dueCount > 0 && (
        <button type="button" className={styles.dueBanner} onClick={() => onStartQuiz({ mode: 'review' })}>
          🔁 {dueCount} Wiederholungs-Karten heute fällig →
        </button>
      )}

      {/* Wrong shortcut */}
      {wrongIds.length > 0 && (
        <button type="button" className={styles.wrongBanner} onClick={() => onStartQuiz({ mode: 'wrong' })}>
          📉 {wrongIds.length} Fehler wiederholen →
        </button>
      )}

      {/* Subject selector */}
      <SubjectSelector onSelect={setActiveSubject} activeSubject={activeSubject} />

      {/* Subject quick-start */}
      <div className={styles.quickRow}>
        <button type="button" className={`${styles.quickBtn} ${styles[`quick_${color}`]}`} onClick={() => startSubjectQuiz('all')}>
          📋 Alle {questions.length} Fragen
        </button>
        {textQs.length > 0 && (
          <button type="button" className={`${styles.quickBtn} ${styles.quick_amber}`} onClick={() => startSubjectQuiz('textonly')}>
            ✍️ Nur Schreiben ({textQs.length})
          </button>
        )}
        <button type="button" className={`${styles.quickBtn} ${styles.quick_surface}`} onClick={() => startSubjectQuiz('mc')}>
          ☑️ MC-Quiz
        </button>
      </div>

      {/* Categories with topic drilldown */}
      <div className={styles.catList}>
        {categories.map((cat) => {
          const catTopics = topics.filter((t) => t.category === cat);
          const catTopicIds = catTopics.map((t) => t.id);
          const catQCount = questions.filter((q) => safeArr(q.topicIds).some((id) => catTopicIds.includes(id))).length;
          const isExpanded = expandedCat === cat;
          return (
            <div key={cat} className={styles.catBlock}>
              <button
                type="button"
                className={`${styles.catHeader} ${styles[`catBorder_${color}`]}`}
                onClick={() => setExpandedCat(isExpanded ? null : cat)}
                aria-expanded={isExpanded}
              >
                <span className={styles.catName}>{cat}</span>
                <span className={styles.catCount}>{catQCount} Fragen</span>
                <span className={styles.catChevron} aria-hidden="true">{isExpanded ? '▲' : '▼'}</span>
              </button>

              {isExpanded && (
                <div className={styles.topicPanel}>
                  {/* All in category */}
                  <button type="button" className={styles.topicRow} onClick={() => startCategoryQuiz(cat)}>
                    <span className={styles.topicRowIcon}>📚</span>
                    <span className={styles.topicRowName}>Alle in dieser Kategorie</span>
                    <span className={styles.topicRowCount}>{catQCount}</span>
                  </button>
                  {/* Text-only if available */}
                  {questions.filter((q) => q.type === 'text' && safeArr(q.topicIds).some((id) => catTopicIds.includes(id))).length > 0 && (
                    <button type="button" className={`${styles.topicRow} ${styles.topicRowText}`} onClick={() => startCategoryQuiz(cat, 'textonly')}>
                      <span className={styles.topicRowIcon}>✍️</span>
                      <span className={styles.topicRowName}>Nur Schreiben</span>
                      <span className={styles.topicRowCount}>{questions.filter((q) => q.type === 'text' && safeArr(q.topicIds).some((id) => catTopicIds.includes(id))).length}</span>
                    </button>
                  )}
                  {/* Individual topics */}
                  {catTopics.map((topic) => {
                    const tqCount = questions.filter((q) => safeArr(q.topicIds).includes(topic.id)).length;
                    if (tqCount === 0) return null;
                    return (
                      <button key={topic.id} type="button" className={styles.topicRow} onClick={() => startTopicQuiz(topic.id, topic.title)}>
                        <span className={styles.topicRowIcon}>{topic.icon}</span>
                        <span className={styles.topicRowName}>{topic.title}</span>
                        <span className={styles.topicRowCount}>{tqCount}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
