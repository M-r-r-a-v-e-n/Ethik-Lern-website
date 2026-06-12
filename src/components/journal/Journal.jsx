import React, { useState } from 'react';
import styles from './Journal.module.css';

const MOODS = ['😊', '😐', '😕', '💪', '🤔', '😴'];

export function Journal({ entries = [], onAdd, onDelete }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(null);

  async function handleSave() {
    if (text.trim().length < 5) return;
    setSaving(true);
    await onAdd(text.trim(), mood || null, null);
    setText('');
    setMood('');
    setSaving(false);
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>📓 Reflexions-Journal</h2>
        <p className={styles.sub}>Was hast du heute gelernt? Schreibe es auf – das verstärkt dein Gedächtnis.</p>
      </div>

      {/* New entry */}
      <div className={styles.newEntry}>
        <div className={styles.moodRow}>
          {MOODS.map((m) => (
            <button key={m} type="button" className={`${styles.moodBtn} ${mood === m ? styles.moodActive : ''}`} onClick={() => setMood((prev) => prev === m ? '' : m)}>
              {m}
            </button>
          ))}
          {mood && <span className={styles.moodLabel}>Stimmung gespeichert</span>}
        </div>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Was habe ich heute gelernt? Welche Verbindungen erkenne ich? Was war schwierig?"
          rows={4}
        />
        <div className={styles.entryFooter}>
          <span className={styles.charCount}>{text.length} Zeichen</span>
          <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={text.trim().length < 5 || saving}>
            {saving ? 'Speichern...' : '+ Eintrag speichern'}
          </button>
        </div>
      </div>

      {/* Previous entries */}
      {entries.length > 0 && (
        <div className={styles.entriesList}>
          <div className={styles.listHeader}>Frühere Einträge ({entries.length})</div>
          {entries.map((e) => (
            <div key={e.id} className={styles.entryCard}>
              <div className={styles.entryMeta}>
                <span className={styles.entryMood}>{e.mood ?? '📝'}</span>
                <span className={styles.entryDate}>{e.date}</span>
                <button type="button" className={styles.expandBtn} onClick={() => setExpanded(expanded === e.id ? null : e.id)}>
                  {expanded === e.id ? '▲' : '▼'}
                </button>
                <button type="button" className={styles.deleteBtn} onClick={() => onDelete(e.id)}>✕</button>
              </div>
              {expanded === e.id ? (
                <div className={styles.entryFull}>{e.text}</div>
              ) : (
                <div className={styles.entryPreview}>{e.text.slice(0, 120)}{e.text.length > 120 ? '...' : ''}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && (
        <div className={styles.empty}>
          Noch keine Einträge. Schreibe deinen ersten Gedanken nach dem Lernen!
        </div>
      )}
    </div>
  );
}
