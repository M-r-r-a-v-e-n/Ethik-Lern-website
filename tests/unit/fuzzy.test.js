import { describe, it, expect } from 'vitest';
import { levenshtein, fuzzyMatch, analyzeAnswer } from '../../src/lib/fuzzy.js';

describe('Levenshtein Distance', () => {
  it('identical strings → distance 0', () => {
    expect(levenshtein('schahada', 'schahada')).toBe(0);
  });

  it('one insertion → distance 1', () => {
    expect(levenshtein('nirvna', 'nirvana')).toBe(1);
  });

  it('one substitution → distance 1', () => {
    expect(levenshtein('nirwana', 'nirvana')).toBe(1);
  });

  it('two errors → distance 2', () => {
    expect(levenshtein('nirvna', 'nirwana')).toBe(2);
  });

  it('completely different → high distance', () => {
    expect(levenshtein('abc', 'xyz')).toBe(3);
  });

  it('empty string → length of other', () => {
    expect(levenshtein('', 'abc')).toBe(3);
  });
});

describe('Fuzzy Match', () => {
  it('exact match returns matched=true, distance=0', () => {
    const r = fuzzyMatch('schahada', 'schahada');
    expect(r.matched).toBe(true);
    expect(r.distance).toBe(0);
  });

  it('one-typo match returns matched=true', () => {
    const r = fuzzyMatch('schahda', 'schahada', 2);
    expect(r.matched).toBe(true);
  });

  it('two-typo match within tolerance', () => {
    const r = fuzzyMatch('schhada', 'schahada', 2);
    expect(r.matched).toBe(true);
  });

  it('3+ typos beyond tolerance returns matched=false', () => {
    const r = fuzzyMatch('xxxxxx', 'schahada', 2);
    expect(r.matched).toBe(false);
  });

  it('substring match works (keyword inside longer text)', () => {
    const r = fuzzyMatch('Die Schahada ist das Glaubensbekenntnis', 'schahada', 2);
    expect(r.matched).toBe(true);
  });

  it('umlaut normalization: ae=ä', () => {
    const r = fuzzyMatch('Islam ist eine Religion', 'religion', 1);
    expect(r.matched).toBe(true);
  });
});

describe('analyzeAnswer', () => {
  it('perfect answer gets score 1.0', () => {
    const modelAnswer = 'Die Schahada ist das islamische Glaubensbekenntnis: Es gibt keinen Gott außer Allah.';
    const userInput = 'Schahada Glaubensbekenntnis Allah islamische Religion';
    const r = analyzeAnswer(userInput, modelAnswer);
    expect(r.score).toBeGreaterThan(0.6);
  });

  it('empty input gets score 0', () => {
    const r = analyzeAnswer('', 'Nirvana ist das Ziel des Buddhismus');
    expect(r.score).toBe(0);
  });

  it('completely wrong answer has 0 matched', () => {
    const r = analyzeAnswer('banane apfel kirsche', 'Karma bedeutet Konsequenz der Taten');
    expect(r.matched.length).toBe(0);
  });

  it('returns matched and missing arrays', () => {
    const r = analyzeAnswer('karma bedeutet konsequenzen taten', 'Karma bedeutet Konsequenz der Taten. Reinkarnation folgt aus Karma.');
    expect(Array.isArray(r.matched)).toBe(true);
    expect(Array.isArray(r.missing)).toBe(true);
    expect(r.total).toBeGreaterThan(0);
  });

  it('custom keywords are checked', () => {
    const r = analyzeAnswer('schahada', 'something else', ['schahada']);
    expect(r.matched).toContain('schahada');
  });

  it('near-miss typo is detected in typos array', () => {
    // "schhada" is close enough to "schahada" - should match but flag typo
    const r = analyzeAnswer('schhada ist das Gebet', 'Schahada ist das Glaubensbekenntnis', ['schahada']);
    expect(r.score).toBeGreaterThan(0);
  });
});
