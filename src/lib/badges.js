export const BADGES = [
  {
    id: 'first_quiz',
    name: 'Erster Start',
    desc: 'Erstes Quiz abgeschlossen',
    icon: '🎯',
    color: '#6366f1',
    condition: (stats) => (stats.sessions?.length ?? 0) >= 1,
  },
  {
    id: 'streak_5',
    name: '5er-Streak',
    desc: '5 Fragen in Folge richtig',
    icon: '🔥',
    color: '#f97316',
    condition: (stats) => (stats.bestStreak ?? 0) >= 5,
  },
  {
    id: 'streak_10',
    name: '10er-Streak',
    desc: '10 Fragen in Folge richtig',
    icon: '⚡',
    color: '#eab308',
    condition: (stats) => (stats.bestStreak ?? 0) >= 10,
  },
  {
    id: 'perfectionist',
    name: 'Perfektionist',
    desc: 'Ein Quiz mit 100% abgeschlossen',
    icon: '💎',
    color: '#06b6d4',
    condition: (stats) =>
      (stats.sessions ?? []).some((s) => s.pct === 100 && (s.correct + s.wrong) >= 5),
  },
  {
    id: 'marathon',
    name: 'Marathon',
    desc: '10 Quizze gespielt',
    icon: '🏃',
    color: '#84cc16',
    condition: (stats) => (stats.sessions?.length ?? 0) >= 10,
  },
  {
    id: 'text_master',
    name: 'Schreiber',
    desc: '15 Freitext-Fragen richtig beantwortet',
    icon: '✍️',
    color: '#a855f7',
    condition: (stats) => (stats.textCorrect ?? 0) >= 15,
  },
  {
    id: 'category_friedensethik',
    name: 'Friedensstifter',
    desc: 'Friedensethik vollständig gelernt',
    icon: '🕊️',
    color: '#f43f5e',
    condition: (stats) => (stats.learnedCategories ?? []).includes('Friedensethik'),
  },
  {
    id: 'category_sinnsuche',
    name: 'Sinnsucher',
    desc: 'Sinnsuche vollständig gelernt',
    icon: '🔍',
    color: '#10b981',
    condition: (stats) => (stats.learnedCategories ?? []).includes('Sinnsuche'),
  },
  {
    id: 'category_weltreligionen',
    name: 'Weltenkenner',
    desc: 'Weltreligionen vollständig gelernt',
    icon: '🌍',
    color: '#6366f1',
    condition: (stats) => (stats.learnedCategories ?? []).includes('Weltreligionen'),
  },
  {
    id: 'all_topics',
    name: 'Ethik-Profi',
    desc: 'Alle Themen gelernt und ein Quiz bestanden',
    icon: '🏆',
    color: '#f59e0b',
    condition: (stats) =>
      (stats.learnedTopics?.length ?? 0) >= 8 &&
      (stats.sessions ?? []).some((s) => s.pct >= 80),
  },
  {
    id: 'spaced_rep',
    name: 'Wiederholer',
    desc: '20 Wiederholungs-Karten reviewt',
    icon: '🔁',
    color: '#8b5cf6',
    condition: (stats) => (stats.cardsReviewed ?? 0) >= 20,
  },
  {
    id: 'quali_ready',
    name: 'Quali-Ready',
    desc: 'Durchschnittlich ≥75% in mindestens 5 Quizzen',
    icon: '🎓',
    color: '#059669',
    condition: (stats) => {
      const sessions = stats.sessions ?? [];
      if (sessions.length < 5) return false;
      const avg = sessions.reduce((s, q) => s + q.pct, 0) / sessions.length;
      return avg >= 75;
    },
  },
];

/**
 * Check which badges are newly unlocked
 * Returns array of newly unlocked badge ids
 */
export function checkNewBadges(stats, currentBadgeIds = []) {
  const newlyUnlocked = [];
  for (const badge of BADGES) {
    if (!currentBadgeIds.includes(badge.id) && badge.condition(stats)) {
      newlyUnlocked.push(badge.id);
    }
  }
  return newlyUnlocked;
}

/**
 * Get all unlocked badges for given stats
 */
export function getUnlockedBadges(stats, badgeIds = []) {
  return BADGES.filter((b) => badgeIds.includes(b.id));
}
