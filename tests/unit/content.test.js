import { describe, it, expect } from 'vitest';
import { ALL_QUESTIONS, TOPICS, CATEGORIES, MINI_IDS } from '../../src/data/content.js';

describe('Content Data Integrity', () => {
  it('ALL_QUESTIONS is a non-empty array', () => {
    expect(Array.isArray(ALL_QUESTIONS)).toBe(true);
    expect(ALL_QUESTIONS.length).toBeGreaterThan(30);
  });

  it('every question has required fields', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.id, `Missing id: ${JSON.stringify(q).slice(0, 80)}`).toBeTruthy();
      expect(q.type, `Missing type on ${q.id}`).toBeTruthy();
      expect(q.question, `Missing question text on ${q.id}`).toBeTruthy();
      expect(q.category, `Missing category on ${q.id}`).toBeTruthy();
    }
  });

  it('all question IDs are unique', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all question categories are in CATEGORIES', () => {
    const catSet = new Set(CATEGORIES);
    for (const q of ALL_QUESTIONS) {
      expect(catSet.has(q.category), `Unknown category "${q.category}" on question ${q.id}`).toBe(true);
    }
  });

  it('MC questions have options and correct field', () => {
    const mcQs = ALL_QUESTIONS.filter((q) => q.type === 'mc' || q.type === 'multiple');
    expect(mcQs.length).toBeGreaterThan(10);
    for (const q of mcQs) {
      expect(Array.isArray(q.options), `${q.id}: missing options`).toBe(true);
      expect(q.options.length, `${q.id}: must have ≥2 options`).toBeGreaterThanOrEqual(2);
      expect(q.correct !== undefined || q.answer !== undefined, `${q.id}: missing correct/answer`).toBe(true);
    }
  });

  it('text questions have an answer string', () => {
    const textQs = ALL_QUESTIONS.filter((q) => q.type === 'text' || q.type === 'open');
    expect(textQs.length).toBeGreaterThan(10);
    for (const q of textQs) {
      expect(typeof q.answer, `${q.id}: answer must be string`).toBe('string');
      expect(q.answer.length, `${q.id}: answer too short`).toBeGreaterThan(10);
    }
  });

  it('order questions have items array', () => {
    const orderQs = ALL_QUESTIONS.filter((q) => q.type === 'order');
    for (const q of orderQs) {
      const items = q.items ?? q.options;
      expect(Array.isArray(items), `${q.id}: missing items`).toBe(true);
      expect(items.length, `${q.id}: must have ≥3 items`).toBeGreaterThanOrEqual(3);
    }
  });

  it('MINI_IDS all exist in ALL_QUESTIONS', () => {
    const qIds = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const id of MINI_IDS) {
      expect(qIds.has(id), `MINI_IDS contains unknown id: ${id}`).toBe(true);
    }
  });

  it('TOPICS is a non-empty array with required fields', () => {
    expect(Array.isArray(TOPICS)).toBe(true);
    expect(TOPICS.length).toBeGreaterThan(5);
    for (const t of TOPICS) {
      expect(t.id, `Topic missing id`).toBeTruthy();
      expect(t.title, `Topic ${t.id} missing title`).toBeTruthy();
      expect(t.category, `Topic ${t.id} missing category`).toBeTruthy();
    }
  });

  it('all topic categories are in CATEGORIES', () => {
    const catSet = new Set(CATEGORIES);
    for (const t of TOPICS) {
      expect(catSet.has(t.category), `Unknown category "${t.category}" in topic ${t.id}`).toBe(true);
    }
  });

  it('there are at least 10 text questions (Freitext)', () => {
    const textQs = ALL_QUESTIONS.filter((q) => q.type === 'text');
    expect(textQs.length).toBeGreaterThanOrEqual(10);
  });

  it('Five Pillars question exists and has correct content', () => {
    const q = ALL_QUESTIONS.find((q) => q.id === 'qt15');
    expect(q, 'Five Pillars question (qt15) must exist').toBeTruthy();
    expect(q.answer.toLowerCase()).toContain('schahada');
    expect(q.answer.toLowerCase()).toContain('salat');
    expect(q.answer.toLowerCase()).toContain('zakat');
    expect(q.answer.toLowerCase()).toContain('haddsch');
  });

  it('Sterbephasen question exists with all 5 phases', () => {
    const q = ALL_QUESTIONS.find((q) => q.id === 'qt8');
    expect(q, 'Sterbephasen question must exist').toBeTruthy();
    const ans = q.answer.toLowerCase();
    expect(ans).toContain('leugnen');
    expect(ans).toContain('zorn');
    expect(ans).toContain('verhandeln');
    expect(ans).toContain('depression');
    expect(ans).toContain('akzeptanz');
  });

  it('Gordon steps question has all 6 steps', () => {
    const q = ALL_QUESTIONS.find((q) => q.id === 'qt1');
    expect(q, 'Gordon question must exist').toBeTruthy();
    const ans = q.answer.toLowerCase();
    expect(ans).toContain('definition');
    expect(ans).toContain('sammlung');
    expect(ans).toContain('entscheidung');
    expect(ans).toContain('realisierung');
    expect(ans).toContain('beurteilung');
  });
});
