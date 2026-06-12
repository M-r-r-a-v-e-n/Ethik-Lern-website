// ============================================================
//  MASTER CONTENT INDEX
//  Merges Deutsch + Ethik (original + extended) + English
// ============================================================
import { DEUTSCH_TOPICS, DEUTSCH_QUESTIONS } from './deutsch.js';
import { ENGLISH_TOPICS, ENGLISH_QUESTIONS } from './english.js';
import { ETHIK_EXTENDED_TOPICS, ETHIK_EXTENDED_QUESTIONS } from './ethik_extended.js';

// ── Original Ethik content (preserved) ──────────────────
export { TOPICS as ETHIK_ORIGINAL_TOPICS } from './content.js';
export { ALL_QUESTIONS as ETHIK_ORIGINAL_QUESTIONS } from './content.js';
export { MINI_IDS } from './content.js';

import { TOPICS as ETHIK_ORIGINAL_TOPICS, ALL_QUESTIONS as ETHIK_ORIGINAL_QUESTIONS } from './content.js';

// ── Tag all original Ethik content with subjectId ────────
const taggedEthikTopics = ETHIK_ORIGINAL_TOPICS.map((t) => ({
  ...t,
  subjectId: t.subjectId ?? 'ethik',
}));
const taggedEthikQuestions = ETHIK_ORIGINAL_QUESTIONS.map((q) => ({
  ...q,
  subjectId: q.subjectId ?? 'ethik',
}));

// ── All Topics (by subject) ──────────────────────────────
export const ALL_TOPICS = [
  ...taggedEthikTopics,
  ...ETHIK_EXTENDED_TOPICS,
  ...DEUTSCH_TOPICS,
  ...ENGLISH_TOPICS,
];

// Deduplicate by id (original ethik takes precedence)
const seenTopicIds = new Set();
export const TOPICS_DEDUPED = ALL_TOPICS.filter((t) => {
  if (seenTopicIds.has(t.id)) return false;
  seenTopicIds.add(t.id);
  return true;
});

// ── All Questions (by subject) ───────────────────────────
export const ALL_QUESTIONS_MASTER = [
  ...taggedEthikQuestions,
  ...ETHIK_EXTENDED_QUESTIONS,
  ...DEUTSCH_QUESTIONS,
  ...ENGLISH_QUESTIONS,
];

// Deduplicate by id
const seenQIds = new Set();
export const ALL_QUESTIONS_DEDUPED = ALL_QUESTIONS_MASTER.filter((q) => {
  if (seenQIds.has(q.id)) return false;
  seenQIds.add(q.id);
  return true;
});

// ── Subject-filtered helpers ─────────────────────────────
export function getTopicsBySubject(subjectId) {
  return TOPICS_DEDUPED.filter((t) => t.subjectId === subjectId || (!t.subjectId && subjectId === 'ethik'));
}

export function getQuestionsBySubject(subjectId) {
  return ALL_QUESTIONS_DEDUPED.filter((q) => q.subjectId === subjectId || (!q.subjectId && subjectId === 'ethik'));
}

export function getQuestionsByTopic(topicId) {
  return ALL_QUESTIONS_DEDUPED.filter((q) => Array.isArray(q.topicIds) && q.topicIds.includes(topicId));
}

// ── Category helpers ─────────────────────────────────────
export function getCategoriesBySubject(subjectId) {
  const topics = getTopicsBySubject(subjectId);
  return [...new Set(topics.map((t) => t.category).filter(Boolean))];
}

// ── Stats ────────────────────────────────────────────────
export const CONTENT_STATS = {
  totalTopics: TOPICS_DEDUPED.length,
  totalQuestions: ALL_QUESTIONS_DEDUPED.length,
  bySubject: {
    ethik: {
      topics: TOPICS_DEDUPED.filter((t) => (t.subjectId ?? 'ethik') === 'ethik').length,
      questions: ALL_QUESTIONS_DEDUPED.filter((q) => (q.subjectId ?? 'ethik') === 'ethik').length,
    },
    deutsch: {
      topics: DEUTSCH_TOPICS.length,
      questions: DEUTSCH_QUESTIONS.length,
    },
    english: {
      topics: ENGLISH_TOPICS.length,
      questions: ENGLISH_QUESTIONS.length,
    },
  },
};

// ── Re-export for backward compat ────────────────────────
// Components that import from content.js still work
export { CATEGORIES, CATEGORY_COLORS } from './content.js';

// New subject-aware exports
export const SUBJECTS_DATA = {
  deutsch: { topics: DEUTSCH_TOPICS, questions: DEUTSCH_QUESTIONS },
  ethik:   { topics: [...taggedEthikTopics, ...ETHIK_EXTENDED_TOPICS], questions: [...taggedEthikQuestions, ...ETHIK_EXTENDED_QUESTIONS] },
  english: { topics: ENGLISH_TOPICS, questions: ENGLISH_QUESTIONS },
};
