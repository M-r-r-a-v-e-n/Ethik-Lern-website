import { describe, it, expect } from 'vitest';
import { BADGES, checkNewBadges, getUnlockedBadges } from '../../src/lib/badges.js';

function makeStats(overrides = {}) {
  return {
    sessions: [],
    totalCorrect: 0,
    totalWrong: 0,
    bestStreak: 0,
    textCorrect: 0,
    cardsReviewed: 0,
    learnedTopics: [],
    learnedCategories: [],
    ...overrides,
  };
}

describe('Badge Definitions', () => {
  it('all badges have required fields', () => {
    for (const b of BADGES) {
      expect(b.id, `${b.id} missing id`).toBeTruthy();
      expect(b.name, `${b.id} missing name`).toBeTruthy();
      expect(b.icon, `${b.id} missing icon`).toBeTruthy();
      expect(typeof b.condition, `${b.id} condition not function`).toBe('function');
    }
  });

  it('has at least 10 badges', () => {
    expect(BADGES.length).toBeGreaterThanOrEqual(10);
  });

  it('all badge ids are unique', () => {
    const ids = BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('checkNewBadges', () => {
  it('unlocks first_quiz after 1 session', () => {
    const stats = makeStats({ sessions: [{ correct: 5, wrong: 2, pct: 71, mode: 'mini' }] });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('first_quiz');
  });

  it('does not re-unlock already earned badges', () => {
    const stats = makeStats({ sessions: [{ correct: 5, wrong: 2, pct: 71, mode: 'mini' }] });
    const newly = checkNewBadges(stats, ['first_quiz']); // already has it
    expect(newly).not.toContain('first_quiz');
  });

  it('unlocks streak_5 when bestStreak >= 5', () => {
    const stats = makeStats({ bestStreak: 5 });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('streak_5');
  });

  it('does NOT unlock streak_10 when bestStreak is 7', () => {
    const stats = makeStats({ bestStreak: 7 });
    const newly = checkNewBadges(stats, []);
    expect(newly).not.toContain('streak_10');
  });

  it('unlocks streak_10 when bestStreak >= 10', () => {
    const stats = makeStats({ bestStreak: 10 });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('streak_10');
  });

  it('unlocks perfectionist badge with 100% on 5+ questions', () => {
    const stats = makeStats({
      sessions: [{ correct: 5, wrong: 0, pct: 100, mode: 'mini' }],
    });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('perfectionist');
  });

  it('does NOT unlock perfectionist on too-small quiz', () => {
    const stats = makeStats({
      sessions: [{ correct: 3, wrong: 0, pct: 100, mode: 'mini' }],
    });
    const newly = checkNewBadges(stats, []);
    expect(newly).not.toContain('perfectionist');
  });

  it('unlocks text_master when textCorrect >= 15', () => {
    const stats = makeStats({ textCorrect: 15 });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('text_master');
  });

  it('unlocks category badge when category learned', () => {
    const stats = makeStats({ learnedCategories: ['Friedensethik'] });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('category_friedensethik');
  });

  it('unlocks quali_ready after 5+ sessions with avg >= 75%', () => {
    const sessions = Array(5).fill(null).map(() => ({ correct: 8, wrong: 2, pct: 80, mode: 'full' }));
    const stats = makeStats({ sessions });
    const newly = checkNewBadges(stats, []);
    expect(newly).toContain('quali_ready');
  });

  it('does NOT unlock quali_ready with fewer than 5 sessions', () => {
    const sessions = Array(4).fill(null).map(() => ({ correct: 8, wrong: 2, pct: 80, mode: 'full' }));
    const stats = makeStats({ sessions });
    const newly = checkNewBadges(stats, []);
    expect(newly).not.toContain('quali_ready');
  });
});

describe('getUnlockedBadges', () => {
  it('returns badge objects for given IDs', () => {
    const unlocked = getUnlockedBadges({}, ['first_quiz', 'streak_5']);
    expect(unlocked.length).toBe(2);
    expect(unlocked.map((b) => b.id)).toContain('first_quiz');
  });

  it('ignores unknown badge IDs', () => {
    const unlocked = getUnlockedBadges({}, ['does_not_exist']);
    expect(unlocked.length).toBe(0);
  });
});
