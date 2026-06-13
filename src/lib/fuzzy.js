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
 * Toleranz: 1 Fehler bei kurzen Wörtern (4-6), 2 Fehler bei langen (7+)
 */
export function fuzzyMatch(input, keyword, maxDistance = 2) {
  const normInput = normalize(input);
  const normKeyword = normalize(keyword);

  if (normInput.includes(normKeyword) || normKeyword.includes(normInput)) {
    return { matched: true, distance: 0, suggestion: null };
  }

  const inputWords = normInput.split(' ');
  const kwLen = normKeyword.length;
  const dynMax = kwLen <= 5 ? 1 : kwLen <= 8 ? 2 : maxDistance;

  for (const word of inputWords) {
    if (word.length < 3) continue;
    const dist = levenshtein(word, normKeyword);
    if (dist <= dynMax) {
      return { matched: true, distance: dist, suggestion: dist > 0 ? keyword : null };
    }
  }

  for (let start = 0; start <= normInput.length - normKeyword.length + dynMax; start++) {
    const sub = normInput.slice(start, start + normKeyword.length);
    const dist = levenshtein(sub, normKeyword);
    if (dist <= dynMax) {
      return { matched: true, distance: dist, suggestion: dist > 0 ? keyword : null };
    }
  }

  return { matched: false, distance: Infinity, suggestion: null };
}

/**
 * Wichtigkeits-Gewichtung für Keywords.
 * Kernbegriffe (in keywords[]) zählen mehr, lange Wörter mehr als kurze.
 */
function keywordWeight(word, isCore) {
  if (isCore) return 3;
  if (word.length >= 8) return 2;
  if (word.length >= 5) return 1.5;
  return 1;
}

/**
 * Analysiert eine Freitext-Antwort SMART:
 * - Filterwörter und kurze Füllwörter werden ignoriert
 * - Kernbegriffe (keywords[]) haben höhere Gewichtung
 * - Score basiert auf gewichteten Kernbegriffen, nicht auf Füllwörtern
 * - Erklärung warum etwas falsch/richtig ist
 */
export function analyzeAnswer(userInput, modelAnswer, customKeywords = []) {
  if (!userInput || !modelAnswer) return { score: 0, matched: [], missing: [], typos: [], total: 0, weightedScore: 0 };

  // Große Stopword-Liste – Füllwörter die NIEMANDEN interessieren
  const stopWords = new Set([
    'und','oder','ist','sind','die','der','das','ein','eine','von','zu','in','im',
    'an','auf','bei','mit','nach','als','für','sich','des','dem','den','aus','es',
    'er','sie','wir','ich','du','z.b','bzw','etc','durch','also','dass','aber',
    'wenn','dann','kann','wird','noch','auch','sehr','mehr','nur','zum','zur',
    'wird','war','hat','haben','sein','keine','nicht','wird','werden','wurde',
    'man','wie','was','wer','wo','wann','warum','welche','welcher','welches',
    'this','that','the','and','or','is','are','in','at','on','to','a','an',
    'of','for','with','by','as','it','its','be','been','have','has','had',
    'will','would','could','should','may','might','can','do','does','did',
    'but','so','if','then','than','there','their','they','we','you','he','she',
    'all','some','any','from','about','into','over','after','under','since',
    'because','when','while','which','who','what','how','our','your','his','her',
    // sehr kurze Wörter (< 4 Buchstaben) werden sowieso ignoriert
  ]);

  function extractKeywords(text, isCore = false) {
    return text
      .toLowerCase()
      .replace(/[()[\]{}„"'`´]/g, ' ')
      .split(/[\s,;:.–/\\+\d]+/)
      .map(w => w.trim().replace(/[^a-zäöüß]/g, ''))
      .filter(w => w.length >= 4 && !stopWords.has(w));
  }

  // Kernbegriffe aus customKeywords haben höchste Priorität
  const coreKws = customKeywords.map(k => k.toLowerCase().trim()).filter(k => k.length >= 3);
  const modelKws = extractKeywords(modelAnswer);

  // Alle Keywords zusammen, Duplikate entfernen
  const allKeywords = [...new Set([...coreKws, ...modelKws])];

  const matched = [];
  const missing = [];
  const typos = [];
  let totalWeight = 0;
  let matchedWeight = 0;

  for (const kw of allKeywords) {
    const isCore = coreKws.includes(kw);
    const weight = keywordWeight(kw, isCore);
    totalWeight += weight;

    const result = fuzzyMatch(userInput, kw, 2);
    if (result.matched) {
      matched.push(kw);
      matchedWeight += weight;
      if (result.distance > 0 && result.suggestion) {
        typos.push({ written: kw, correct: kw, hint: `Tippfehler bei „${kw}" – trotzdem gezählt ✓` });
      }
    } else {
      // Nur Kernbegriffe als "missing" anzeigen, nicht alle Füllwörter
      if (isCore || kw.length >= 5) {
        missing.push(kw);
      }
    }
  }

  const total = allKeywords.length;
  const score = total > 0 ? matched.length / total : 0;
  const weightedScore = totalWeight > 0 ? matchedWeight / totalWeight : 0;

  // Benutze weightedScore als primäre Metrik
  return { score: weightedScore, matched, missing: missing.slice(0, 5), typos, total, weightedScore };
}

/**
 * Erkläre warum eine Antwort falsch/richtig ist
 */
export function generateExplanation(score, matched, missing, modelAnswer) {
  if (score >= 0.8) {
    return null; // Gut genug, keine Erklärung nötig
  }
  const parts = [];
  if (missing.length > 0) {
    parts.push(`Fehlende Schlüsselbegriffe: **${missing.slice(0, 4).join(', ')}**`);
  }
  if (score < 0.4 && modelAnswer) {
    parts.push(`Musterantwort zur Orientierung beachten.`);
  }
  return parts.join(' · ');
}

export function generateTypoFeedback(userWord, correctWord) {
  const dist = levenshtein(normalize(userWord), normalize(correctWord));
  if (dist === 0) return null;
  if (dist === 1) {
    const u = normalize(userWord);
    const c = normalize(correctWord);
    if (u.length === c.length) return `„${userWord}" → richtig: „${correctWord}" (ein Buchstabe vertauscht)`;
    if (u.length < c.length) return `„${userWord}" → richtig: „${correctWord}" (ein Buchstabe fehlt)`;
    return `„${userWord}" → richtig: „${correctWord}" (ein Buchstabe zu viel)`;
  }
  return `„${userWord}" → richtig: „${correctWord}"`;
}
