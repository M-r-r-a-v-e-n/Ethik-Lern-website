import React, { useState, useMemo } from 'react';
import { TOPICS_DEDUPED as TOPICS, ALL_QUESTIONS_DEDUPED as ALL_QUESTIONS, getTopicsBySubject, getCategoriesBySubject } from '../../data/index.js';
import { SUBJECTS } from '../../data/subjects.js';
import styles from './CustomPathBuilder.module.css';

const subjectColorMap = { deutsch: 'rose', ethik: 'indigo', english: 'emerald' };

export function CustomPathBuilder({ onStart, onBack }) {
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState('all');
  const [activeSubject, setActiveSubject] = useState('all');

  function toggle(topicId) {
    setSelected((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  }

  function selectAll() { setSelected(TOPICS.map((t) => t.id)); }
  function selectNone() { setSelected([]); }
  function selectCategory(cat) {
    const catIds = TOPICS.filter((t) => t.category === cat).map((t) => t.id);
    const allSelected = catIds.every((id) => selected.includes(id));
    if (allSelected) setSelected((prev) => prev.filter((id) => !catIds.includes(id)));
    else setSelected((prev) => [...new Set([...prev, ...catIds])]);
  }

  function buildPath() {
    if (selected.length === 0) return;
    let questions = ALL_QUESTIONS.filter((q) =>
      Array.isArray(q.topicIds) && q.topicIds.some((tid) => selected.includes(tid))
    );
    if (mode === 'textonly') questions = questions.filter((q) => q.type === 'text');
    if (mode === 'mc') questions = questions.filter((q) => q.type === 'mc' || q.type === 'multiple');
    if (questions.length === 0) { alert('Keine Fragen für diese Auswahl gefunden.'); return; }
    const topicNames = TOPICS.filter((t) => selected.includes(t.id)).map((t) => t.title).join(', ');
    onStart({ questions, title: `Eigener Pfad: ${topicNames.slice(0, 40)}`, mode: 'custom' });
  }

  const totalQs = (() => {
    let qs = ALL_QUESTIONS.filter((q) =>
      Array.isArray(q.topicIds) && q.topicIds.some((tid) => selected.includes(tid))
    );
    if (mode === 'textonly') qs = qs.filter((q) => q.type === 'text');
    if (mode === 'mc') qs = qs.filter((q) => q.type === 'mc' || q.type === 'multiple');
    return qs.length;
  })();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={onBack}>← Zurück</button>
        <h2 className={styles.title}>🛠️ Eigener Lernpfad</h2>
      </div>

      <p className={styles.desc}>Wähle genau die Themen, die du für deine Prüfung brauchst.</p>

      {/* Mode selector */}
      <div className={styles.modeRow}>
        {[
          { id: 'all', label: 'Alle Typen', icon: '📋' },
          { id: 'textonly', label: 'Nur Schreiben', icon: '✍️' },
          { id: 'mc', label: 'Nur Multiple Choice', icon: '☑️' },
        ].map((m) => (
          <button
            key={m.id}
            type="button"
            className={`${styles.modeBtn} ${mode === m.id ? styles.modeBtnActive : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Bulk controls */}
      <div className={styles.bulkRow}>
        <button type="button" className={styles.bulkBtn} onClick={selectAll}>Alle wählen</button>
        <button type="button" className={styles.bulkBtn} onClick={selectNone}>Keine</button>
        <span className={styles.selectedCount}>{selected.length} Themen · {totalQs} Fragen</span>
      </div>

      {/* Subject filter tabs */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {[{ id: 'all', label: '📋 Alle Fächer' }, ...SUBJECTS.map((s) => ({ id: s.id, label: `${s.icon} ${s.label}` }))].map((tab) => (
          <button key={tab.id} type="button"
            style={{
              padding: '5px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-xs)',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.12s',
              background: activeSubject === tab.id ? 'var(--indigo)' : 'var(--surface2)',
              color: activeSubject === tab.id ? 'white' : 'var(--text-muted)',
              borderColor: activeSubject === tab.id ? 'var(--indigo)' : 'var(--border)',
            }}
            onClick={() => setActiveSubject(tab.id)}
          >{tab.label}</button>
        ))}
      </div>

      {/* Topic checkboxes – filtered by subject */}
      <div className={styles.topicList}>
        {(() => {
          const filteredTopics = activeSubject === 'all' ? TOPICS : TOPICS.filter((t) =>
            activeSubject === 'ethik' ? (t.subjectId ?? 'ethik') === 'ethik' : t.subjectId === activeSubject
          );
          const cats = [...new Set(filteredTopics.map((t) => t.category).filter(Boolean))];
          return cats.map((cat) => {
            const catTopics = filteredTopics.filter((t) => t.category === cat);
            const subjId = catTopics[0]?.subjectId ?? 'ethik';
            const color = subjectColorMap[subjId] || 'indigo';
            const allCatSelected = catTopics.every((t) => selected.includes(t.id));
            return (
              <div key={cat} className={styles.catBlock}>
                <button type="button" className={`${styles.catHeader} ${styles[`cat_${color}`]}`} onClick={() => {
                  const catIds = catTopics.map((t) => t.id);
                  const allSel = catIds.every((id) => selected.includes(id));
                  if (allSel) setSelected((prev) => prev.filter((id) => !catIds.includes(id)));
                  else setSelected((prev) => [...new Set([...prev, ...catIds])]);
                }}>
                  <span className={`${styles.checkBox} ${allCatSelected ? styles.checkBoxChecked : ''}`}>
                    {allCatSelected ? '☑' : '☐'}
                  </span>
                  <span>{cat}</span>
                </button>
                {catTopics.map((topic) => {
                  const isSelected = selected.includes(topic.id);
                  const topicQs = ALL_QUESTIONS.filter((q) => Array.isArray(q.topicIds) && q.topicIds.includes(topic.id));
                  return (
                    <button key={topic.id} type="button"
                      className={`${styles.topicItem} ${isSelected ? styles.topicItemSelected : ''}`}
                      onClick={() => setSelected((prev) =>
                        prev.includes(topic.id) ? prev.filter((id) => id !== topic.id) : [...prev, topic.id]
                      )}>
                      <span className={`${styles.checkBox} ${isSelected ? styles.checkBoxChecked : ''}`}>
                        {isSelected ? '☑' : '☐'}
                      </span>
                      <span className={styles.topicIcon}>{topic.icon}</span>
                      <span className={styles.topicName}>{topic.title}</span>
                      <span className={styles.topicQCount}>{topicQs.length} Fragen</span>
                    </button>
                  );
                })}
              </div>
            );
          });
        })()}
      </div>

      {/* Start button */}
      <button
        type="button"
        className={styles.startBtn}
        onClick={buildPath}
        disabled={selected.length === 0 || totalQs === 0}
      >
        {selected.length === 0
          ? 'Wähle mindestens 1 Thema'
          : `▶ Lernpfad starten · ${totalQs} Fragen`}
      </button>
    </div>
  );
}
