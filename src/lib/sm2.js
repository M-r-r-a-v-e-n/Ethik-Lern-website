/**
 * SM-2 Spaced Repetition Algorithm
 * 
 * quality: 0-5
 *   5 = Perfect recall
 *   4 = Correct, slight hesitation
 *   3 = Correct, significant difficulty
 *   2 = Incorrect, easy recall after seeing answer
 *   1 = Incorrect, hard to recall
 *   0 = Complete blackout
 * 
 * Returns updated card state.
 */
export function sm2(card, quality) {
  let { repetitions = 0, easeFactor = 2.5, interval = 1 } = card;

  // Clamp quality
  quality = Math.max(0, Math.min(5, quality));

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    // Failed – reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor (min 1.3)
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    nextReview: nextReview.toISOString(),
    lastReview: new Date().toISOString(),
    lastQuality: quality,
  };
}

/**
 * Convert correct/incorrect quiz answer to SM-2 quality score
 */
export function answerToQuality(correct, wasHard = false) {
  if (!correct) return 1;          // Wrong
  if (wasHard) return 3;           // Right but difficult
  return 5;                        // Easy correct
}

/**
 * Check if a card is due for review
 */
export function isDue(card) {
  if (!card.nextReview) return true;
  return new Date(card.nextReview) <= new Date();
}

/**
 * Get cards due today sorted by priority (lowest ease factor first)
 */
export function getDueCards(cards) {
  return cards
    .filter(isDue)
    .sort((a, b) => (a.easeFactor ?? 2.5) - (b.easeFactor ?? 2.5));
}

/**
 * Initialize a new card
 */
export function newCard(questionId) {
  return {
    questionId,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 1,
    nextReview: new Date().toISOString(),
    lastReview: null,
    lastQuality: null,
  };
}
