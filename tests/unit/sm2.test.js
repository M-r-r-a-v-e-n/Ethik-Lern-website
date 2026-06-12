import { describe, it, expect } from 'vitest';
import { sm2, newCard, isDue, getDueCards, answerToQuality } from '../../src/lib/sm2.js';

describe('SM-2 Algorithm', () => {
  it('creates a new card with correct defaults', () => {
    const card = newCard('q1');
    expect(card.questionId).toBe('q1');
    expect(card.repetitions).toBe(0);
    expect(card.easeFactor).toBe(2.5);
    expect(card.interval).toBe(1);
    expect(card.lastReview).toBeNull();
  });

  it('correct answer (quality=5) increases interval on first rep', () => {
    const card = newCard('q1');
    const result = sm2(card, 5);
    expect(result.repetitions).toBe(1);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBeGreaterThan(2.5); // gets easier
  });

  it('correct answer after first rep gives interval 6', () => {
    let card = newCard('q1');
    card = { ...card, ...sm2(card, 5) }; // rep 1
    const result = sm2(card, 5);          // rep 2
    expect(result.interval).toBe(6);
    expect(result.repetitions).toBe(2);
  });

  it('wrong answer (quality<3) resets repetitions to 0', () => {
    let card = newCard('q1');
    card = { ...card, ...sm2(card, 5) };
    card = { ...card, ...sm2(card, 5) }; // rep 2, interval=6
    const result = sm2(card, 1);          // wrong
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(1);
  });

  it('ease factor never goes below 1.3', () => {
    let card = newCard('q1');
    // Answer wrong many times
    for (let i = 0; i < 10; i++) {
      card = { ...card, ...sm2(card, 0) };
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it('nextReview is in the future after correct answer', () => {
    const card = newCard('q1');
    const result = sm2(card, 5);
    expect(new Date(result.nextReview).getTime()).toBeGreaterThan(Date.now());
  });

  it('isDue returns true for new card', () => {
    const card = newCard('q1');
    expect(isDue(card)).toBe(true);
  });

  it('isDue returns false for card reviewed today (interval > 1)', () => {
    const card = newCard('q1');
    let updated = sm2(card, 5); // rep 1, interval=1
    updated = sm2({ ...card, ...updated }, 5); // rep 2, interval=6
    expect(isDue(updated)).toBe(false);
  });

  it('getDueCards filters correctly', () => {
    const dueCard = newCard('due');
    const futureCard = { ...newCard('future'), nextReview: new Date(Date.now() + 86400000).toISOString() };
    const result = getDueCards([dueCard, futureCard]);
    expect(result.length).toBe(1);
    expect(result[0].questionId).toBe('due');
  });

  it('answerToQuality maps correct=true to quality 5', () => {
    expect(answerToQuality(true, false)).toBe(5);
    expect(answerToQuality(true, true)).toBe(3);
    expect(answerToQuality(false)).toBe(1);
  });
});
