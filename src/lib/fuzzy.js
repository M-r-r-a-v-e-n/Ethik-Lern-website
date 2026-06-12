/**
 * Levenshtein distance between two strings
 */
export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Normalize text for comparison
 */
function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Check if input fuzzy-matches any keyword.
 * Returns { matched: bool, distance: number, suggestion: string|null }
 */
export function fuzzyMatch(input, keyword, maxDistance = 2) {
  const normInput = normalize(input);
  const normKeyword = normalize(keyword);

  // Direct match
  if (normInput.includes(normKeyword) || normKeyword.includes(normInput)) {
    return { matched: true, distance: 0, suggestion: null };
  }

  // Word-level fuzzy check
  const inputWords = normInput.split(' ');
  for (const word of inputWords) {
    if (word.length < 3) continue;
    const dist = levenshtein(word, normKeyword);
    if (dist <= maxDistance) {
      return {
        matched: true,
        distance: dist,
        suggestion: dist > 0 ? keyword : null,
      };
    }
  }

  // Substring fuzzy
  for (let start = 0; start <= normInput.length - normKeyword.length + maxDistance; start++) {
    const sub = normInput.slice(start, start + normKeyword.length);
    const dist = levenshtein(sub, normKeyword);
    if (dist <= maxDistance) {
      return { matched: true, distance: dist, suggestion: dist > 0 ? keyword : null };
    }
  }

  return { matched: false, distance: Infinity, suggestion: null };
}

/**
 * Analyze a free-text answer against a model answer.
 * Returns detailed feedback with typo detection.
 */
export function analyzeAnswer(userInput, modelAnswer, customKeywords = []) {
  if (!userInput || !modelAnswer) return { score: 0, matched: [], missing: [], typos: [], total: 0 };

  const stopWords = new Set([
    'und','oder','ist','sind','die','der','das','ein','eine','von','zu','in','im',
    'an','auf','bei','mit','nach','als','für','sich','des','dem','den','aus','es',
    'er','sie','wir','ich','du','z.b','bzw','etc','durch','also','dass','aber',
  ]);

  function extractKeywords(text) {
    return text
      .toLowerCase()
      .replace(/[()[\]{}„"'`´]/g, ' ')
      .split(/[\s,;:.–/\\+\d]+/)
      .map(w => w.trim().replace(/[^a-zäöüß]/g, ''))
      .filter(w => w.length >= 4 && !stopWords.has(w));
  }

  const modelKeywords = [...new Set([
    ...extractKeywords(modelAnswer),
    ...customKeywords.map(k => k.toLowerCase()),
  ])];

  const matched = [];
  const missing = [];
  const typos = [];

  for (const kw of modelKeywords) {
    const result = fuzzyMatch(userInput, kw, 2);
    if (result.matched) {
      matched.push(kw);
      if (result.distance > 0 && result.suggestion) {
        typos.push({ written: kw, correct: kw, hint: `Meintest du „${kw}"?` });
      }
    } else {
      missing.push(kw);
    }
  }

  const total = modelKeywords.length;
  const score = total > 0 ? matched.length / total : 0;

  return { score, matched, missing, typos, total };
}

/**
 * Generate specific feedback message for a typo
 */
export function generateTypoFeedback(userWord, correctWord) {
  const dist = levenshtein(normalize(userWord), normalize(correctWord));
  if (dist === 0) return null;
  if (dist === 1) {
    // Detect type of error
    const u = normalize(userWord);
    const c = normalize(correctWord);
    if (u.length === c.length) return `„${userWord}" → richtig: „${correctWord}" (ein Buchstabe vertauscht)`;
    if (u.length < c.length) return `„${userWord}" → richtig: „${correctWord}" (ein Buchstabe fehlt)`;
    return `„${userWord}" → richtig: „${correctWord}" (ein Buchstabe zu viel)`;
  }
  return `„${userWord}" → richtig: „${correctWord}"`;
}
