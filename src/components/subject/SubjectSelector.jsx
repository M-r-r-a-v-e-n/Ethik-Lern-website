import React from 'react';
import { SUBJECTS } from '../../data/subjects.js';
import { CONTENT_STATS } from '../../data/index.js';
import styles from './SubjectSelector.module.css';

export function SubjectSelector({ onSelect, activeSubject }) {
  const stats = CONTENT_STATS.bySubject;

  return (
    <div className={styles.root}>
      <div className={styles.label}>Fach wählen</div>
      <div className={styles.grid}>
        {SUBJECTS.map((s) => {
          const isActive = activeSubject === s.id;
          const sStats = stats[s.id] ?? {};
          return (
            <button
              key={s.id}
              type="button"
              className={`${styles.card} ${styles[`card_${s.color}`]} ${isActive ? styles.cardActive : ''}`}
              onClick={() => onSelect(s.id)}
              aria-pressed={isActive}
              aria-label={`${s.label} – ${sStats.topics ?? 0} Themen, ${sStats.questions ?? 0} Fragen`}
            >
              <span className={styles.icon}>{s.icon}</span>
              <div className={styles.info}>
                <div className={styles.name}>{s.label}</div>
                <div className={styles.meta}>{sStats.topics ?? 0} Themen · {sStats.questions ?? 0} Fragen</div>
              </div>
              {isActive && <span className={styles.activeDot} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
