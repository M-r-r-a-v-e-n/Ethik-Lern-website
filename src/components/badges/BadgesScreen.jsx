import React from 'react';
import { BADGES } from '../../lib/badges.js';
import styles from './BadgesScreen.module.css';

export function BadgesScreen({ badgeIds = [], stats = {}, onBack }) {
  const unlocked = new Set(badgeIds);
  const unlockedList = BADGES.filter((b) => unlocked.has(b.id));
  const lockedList = BADGES.filter((b) => !unlocked.has(b.id));

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={onBack}>← Zurück</button>
        <h2 className={styles.title}>🏆 Deine Badges</h2>
      </div>
      <p className={styles.sub}>{unlockedList.length} von {BADGES.length} freigeschaltet</p>

      {unlockedList.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Freigeschaltet</div>
          <div className={styles.grid}>
            {unlockedList.map((badge) => (
              <div key={badge.id} className={styles.badgeCard}>
                <div className={styles.badgeIcon} style={{ background: badge.color + '22', borderColor: badge.color }}>
                  {badge.icon}
                </div>
                <div className={styles.badgeName}>{badge.name}</div>
                <div className={styles.badgeDesc}>{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedList.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Noch nicht freigeschaltet</div>
          <div className={styles.grid}>
            {lockedList.map((badge) => (
              <div key={badge.id} className={`${styles.badgeCard} ${styles.badgeLocked}`}>
                <div className={styles.badgeIconLocked}>🔒</div>
                <div className={styles.badgeName}>{badge.name}</div>
                <div className={styles.badgeDesc}>{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
