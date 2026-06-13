import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { analyzeAnswer } from '../lib/fuzzy.js';
import { answerToQuality } from '../lib/sm2.js';
import styles from './QuizEngine.module.css';

function shuffle(input = []) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function optionLabel(option) {
  if (typeof option === 'string' || typeof option === 'number') return String(option);
  if (option && typeof option === 'object') return option.text ?? option.label ?? option.name ?? option.value ?? option.id ?? '';
  return '';
}

function optionEqualsAnswer(answer, option, originalIndex) {
  if (answer === undefined || answer === null) return false;
  if (typeof answer === 'number') return originalIndex === answer;
  if (typeof answer === 'object') {
    const answerText = optionLabel(answer);
    if (answerText) return optionLabel(option) === answerText;
    if (answer.id !== undefined) return Boolean(option && typeof option === 'object' && option.id === answer.id);
  }
  return optionLabel(option) === String(answer);
}

function optionMatchesAnswer(answer, option, originalIndex) {
  if (Array.isArray(answer)) return answer.some((item) => optionEqualsAnswer(item, option, originalIndex));
  return optionEqualsAnswer(answer, option, originalIndex);
}

function typeLabel(type) {
  return { mc: 'Multiple Choice', multiple: 'Multiple Choice', order: 'Reihenfolge', match: 'Zuordnen', text: 'Freitext', open: 'Freitext', multi: 'Mehrfachauswahl' }[type] || 'Frage';
}

// ── MC Question ────────────────────────────────────────────
function MCQuestion({ q, onAnswer }) {
  const options = q.options ?? [];
  const answer = q.answer ?? q.correct;
  const answerUsesIndex = typeof answer === 'number' || (Array.isArray(answer) && answer.some((item) => typeof item === 'number'));
  const shuffledOptions = useMemo(() => (answerUsesIndex ? [...options] : shuffle(options)), []);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const selectedOption = selected !== null ? shuffledOptions[selected] : null;
  const isCorrect = selected !== null && optionMatchesAnswer(answer, selectedOption, selected);
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function check() {
    if (selected === null || checked) return;
    setChecked(true);
    onAnswer(isCorrect, true, isCorrect ? 5 : 1);
  }

  return (
    <div>
      {options.length === 0 ? (
        <p className={styles.feedbackBad}>Diese Frage hat keine Antwortmöglichkeiten.</p>
      ) : (
        <div className={styles.optionList}>
          {shuffledOptions.map((option, index) => {
            const correct = optionMatchesAnswer(answer, option, index);
            const selectedThis = selected === index;
            let stateClass = '';
            if (checked && correct) stateClass = styles.optionCorrect;
            else if (checked && selectedThis && !correct) stateClass = styles.optionWrong;
            else if (!checked && selectedThis) stateClass = styles.optionSelected;
            return (
              <button key={`opt-${index}`} type="button" className={`${styles.option} ${stateClass}`}
                onClick={() => { if (!checked) setSelected(index); }} disabled={checked}>
                <span className={styles.optLetter}>{letters[index]}</span>
                <span className={styles.optText}>{optionLabel(option)}</span>
                {checked && correct && <span className={styles.optIcon}>✓</span>}
                {checked && selectedThis && !correct && <span className={styles.optIcon}>✗</span>}
              </button>
            );
          })}
        </div>
      )}
      {!checked && <button type="button" className={styles.submitBtn} onClick={check} disabled={selected === null}>Antwort prüfen</button>}
      {checked && (
        <div>
          <p className={isCorrect ? styles.feedbackGood : styles.feedbackBad}>
            {isCorrect ? '✓ Richtig!' : `✗ Falsch. Die richtige Antwort: ${shuffledOptions.map((o, i) => optionMatchesAnswer(answer, o, i) ? optionLabel(o) : null).filter(Boolean).join(', ')}`}
          </p>
          {q.explanation && <p className={styles.explanationBox}>💡 {q.explanation}</p>}
        </div>
      )}
    </div>
  );
}

// ── Order Question ─────────────────────────────────────────
function OrderQuestion({ q, onAnswer }) {
  const rawItems = q.items ?? q.options ?? [];
  const correctOrder = rawItems.map((item) => (typeof item === 'string' ? item : optionLabel(item)));
  const [items, setItems] = useState(() => shuffle(correctOrder.map((text, i) => ({ id: i, text }))));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const dragFrom = useRef(null);

  function dragStart(index) { dragFrom.current = index; }
  function dragOver(event, index) {
    event.preventDefault();
    if (submitted || dragFrom.current === null || dragFrom.current === index) return;
    const from = dragFrom.current;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(index, 0, moved);
    setItems(next);
    dragFrom.current = index;
  }
  function dragEnd() { dragFrom.current = null; }

  function check() {
    if (submitted || items.length === 0) return;
    const isCorrectOrder = items.every((item, index) => item.text === correctOrder[index]);
    setCorrect(isCorrectOrder);
    setSubmitted(true);
    onAnswer(isCorrectOrder, true, isCorrectOrder ? 5 : 1);
  }

  if (rawItems.length === 0) return <p className={styles.feedbackBad}>Keine Elemente zum Sortieren.</p>;

  return (
    <div>
      <p className={styles.hintBox}>Ziehe die Karten in die richtige Reihenfolge.</p>
      <div className={styles.orderList}>
        {items.map((item, index) => {
          const isCorrectPos = submitted && item.text === correctOrder[index];
          return (
            <div key={item.id}
              className={`${styles.orderItem} ${submitted ? (isCorrectPos ? styles.orderCorrect : styles.orderWrong) : ''}`}
              draggable={!submitted}
              onDragStart={() => dragStart(index)}
              onDragOver={(e) => dragOver(e, index)}
              onDragEnd={dragEnd}>
              <span className={styles.dragHandle}>⠿</span>
              <span className={styles.orderNum}>{index + 1}.</span>
              <span className={styles.orderText}>{item.text}</span>
              {submitted && <span className={styles.optIcon}>{isCorrectPos ? '✓' : '✗'}</span>}
            </div>
          );
        })}
      </div>
      {!submitted
        ? <button type="button" className={styles.submitBtn} onClick={check}>Reihenfolge prüfen</button>
        : <p className={correct ? styles.feedbackGood : styles.feedbackBad}>
            {correct ? '✓ Richtige Reihenfolge!' : `✗ Nicht ganz. Richtig wäre: ${correctOrder.join(' → ')}`}
          </p>}
    </div>
  );
}

// ── Match Question ─────────────────────────────────────────
function MatchQuestion({ q, onAnswer }) {
  const pairs = Array.isArray(q.pairs) ? q.pairs : [];
  const [rights, setRights] = useState(() => shuffle(pairs.map(([, right]) => right)));
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [done, setDone] = useState(false);
  const answeredRef = useRef(false);
  const lefts = pairs.map(([left]) => left);
  const isComplete = pairs.length > 0 && Object.keys(matched).length === pairs.length;
  const isCorrect = isComplete && pairs.every(([left, right]) => matched[left] === right);

  useEffect(() => {
    if (isComplete && !done && !answeredRef.current) {
      answeredRef.current = true;
      setDone(true);
      onAnswer(isCorrect, true, isCorrect ? 5 : 1);
    }
  }, [done, isComplete, isCorrect, onAnswer]);

  if (pairs.length === 0) return <p className={styles.feedbackBad}>Keine Zuordnungspaare vorhanden.</p>;

  return (
    <div>
      <p className={styles.hintBox}>Wähle links einen Begriff, dann rechts die passende Erklärung.</p>
      <div className={styles.matchGrid}>
        <div className={styles.matchCol}>
          {lefts.map((left) => (
            <button key={left} type="button"
              className={`${styles.matchItem} ${selectedLeft === left ? styles.matchSelected : ''} ${matched[left] ? styles.matchDone : ''}`}
              onClick={() => { if (!done && !matched[left]) setSelectedLeft((c) => c === left ? null : left); }}
              disabled={done || Boolean(matched[left])}>
              {left}
              {matched[left] && <span className={styles.matchArrow}>→ {matched[left]}</span>}
            </button>
          ))}
        </div>
        <div className={styles.matchCol}>
          {rights.map((right) => {
            const usedLeft = Object.entries(matched).find(([, v]) => v === right)?.[0];
            const expectedLeft = pairs.find(([, r]) => r === right)?.[0];
            const used = Boolean(usedLeft);
            const isPairCorrect = usedLeft === expectedLeft;
            return (
              <button key={right} type="button"
                className={`${styles.matchItem} ${used ? styles.matchDone : ''} ${done && isPairCorrect ? styles.matchCorrectDone : ''} ${done && used && !isPairCorrect ? styles.matchWrongDone : ''}`}
                onClick={() => {
                  if (!selectedLeft || done || (used && usedLeft !== selectedLeft)) { if (used) setWrongFlash('Schon vergeben.'); return; }
                  setMatched((m) => ({ ...m, [selectedLeft]: right }));
                  setSelectedLeft(null); setWrongFlash(null);
                }}
                disabled={done || (used && usedLeft !== selectedLeft)}>
                {right}
              </button>
            );
          })}
        </div>
      </div>
      {wrongFlash && <p className={styles.feedbackBad}>{wrongFlash}</p>}
      {done && <p className={isCorrect ? styles.feedbackGood : styles.feedbackBad}>{isCorrect ? '✓ Alles richtig zugeordnet!' : '✗ Nicht ganz – grün = richtig.'}</p>}
    </div>
  );
}

// ── Multi-Select Question ──────────────────────────────────
function MultiQuestion({ q, onAnswer }) {
  const options = q.options ?? q.opts ?? [];
  const rawCorrect = q.correct ?? q.answer ?? q.cor ?? [];
  const correctIndices = Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect];
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);

  function toggle(i) { if (checked) return; setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]); }
  function check() {
    if (checked || selected.length === 0) return;
    const correct = selected.length === correctIndices.length && correctIndices.every((ci) => selected.includes(ci));
    setChecked(true);
    onAnswer(correct, true, correct ? 5 : 1);
  }

  return (
    <div>
      <p className={styles.hintBox}>Mehrere Antworten können richtig sein – wähle alle zutreffenden.</p>
      <div className={styles.optionList}>
        {options.map((opt, i) => {
          const isSelected = selected.includes(i);
          const isCorrect = correctIndices.includes(i);
          let stateClass = '';
          if (checked && isCorrect) stateClass = styles.optionCorrect;
          else if (checked && isSelected && !isCorrect) stateClass = styles.optionWrong;
          else if (!checked && isSelected) stateClass = styles.optionSelected;
          return (
            <button key={i} type="button" className={`${styles.option} ${stateClass}`} onClick={() => toggle(i)} disabled={checked}>
              <span className={styles.checkbox}>{checked ? (isCorrect ? '☑' : isSelected ? '☒' : '☐') : (isSelected ? '☑' : '☐')}</span>
              <span className={styles.optText}>{typeof opt === 'string' ? opt : optionLabel(opt)}</span>
              {checked && isCorrect && <span className={styles.optIcon}>✓</span>}
              {checked && isSelected && !isCorrect && <span className={styles.optIcon}>✗</span>}
            </button>
          );
        })}
      </div>
      {!checked && <button type="button" className={styles.submitBtn} onClick={check} disabled={selected.length === 0}>Auswahl prüfen</button>}
      {checked && (() => {
        const correct = selected.length === correctIndices.length && correctIndices.every((ci) => selected.includes(ci));
        return (
          <div>
            <p className={correct ? styles.feedbackGood : styles.feedbackBad}>
              {correct ? '✓ Alle richtigen Antworten gefunden!' : '✗ Nicht vollständig richtig.'}
            </p>
            {!correct && <p className={styles.correctHint}>Richtig wären: {correctIndices.map((ci) => options[ci]).filter(Boolean).join(', ')}</p>}
          </div>
        );
      })()}
    </div>
  );
}

// ── Text Question with Fuzzy Matching ─────────────────────
function TextQuestion({ q, onAnswer }) {
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const answerStr = q.answer ?? '';

  function submit() {
    if (input.trim().length < 3 || revealed) return;
    const result = analyzeAnswer(input, answerStr, q.keywords ?? []);
    setAnalysis(result);
    setRevealed(true);
    // Nutze weightedScore statt score – bewertet Kernbegriffe höher
    const ws = result.weightedScore ?? result.score;
    if (ws >= 0.65) {
      setMarked(true);
      onAnswer(true, true, ws >= 0.9 ? 5 : 4);
    }
    // else: Selbsteinschätzung
  }

  function manualMark(val) {
    if (marked !== null) return;
    setMarked(val);
    onAnswer(val, true, val ? 3 : 1);
  }

  const ws = analysis ? (analysis.weightedScore ?? analysis.score) : 0;
  const autoCorrect = marked === true && analysis && ws >= 0.65;

  return (
    <div>
      <textarea
        className={styles.textArea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Schreibe deine Antwort hier – Stichworte reichen..."
        rows={4}
        disabled={revealed}
      />

      {!revealed && (
        <button type="button" className={styles.submitBtn} onClick={submit} disabled={input.trim().length < 3}>
          Antwort überprüfen
        </button>
      )}

      {revealed && analysis && (
        <div className={styles.revealBox}>

          {/* Score bar */}
          <div className={styles.scoreBarWrap}>
            <div className={styles.scoreBarFill}
              style={{
                width: `${Math.round(ws * 100)}%`,
                background: ws >= 0.65 ? 'var(--emerald)' : ws >= 0.4 ? 'var(--amber)' : 'var(--rose)',
              }}
            />
            <span className={styles.scoreBarLabel}>{Math.round(ws * 100)}%</span>
          </div>

          {/* Keyword analysis – only show IMPORTANT ones */}
          {analysis.total > 0 && (
            <div className={styles.kwSection}>
              <div className={styles.kwTitle}>
                {ws >= 0.65 ? '✓ Wichtige Begriffe erkannt' : 'Fehlende Kernbegriffe:'}
              </div>
              <div className={styles.keywordRow}>
                {analysis.matched.slice(0, 6).map((kw) => (
                  <span key={kw} className={styles.kwGood}>✓ {kw}</span>
                ))}
                {analysis.missing.slice(0, 4).map((kw) => (
                  <span key={kw} className={styles.kwMissing}>✗ {kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Explanation WHY – shown when wrong */}
          {ws < 0.65 && q.explanation && (
            <div className={styles.explanationBox}>
              💡 <strong>Erklärung:</strong> {q.explanation}
            </div>
          )}

          {/* Model answer – always shown */}
          <div className={styles.revealLabel}>Musterlösung:</div>
          <div className={styles.revealAnswer}>{answerStr}</div>

          {/* Auto-correct feedback */}
          {marked === true && <p className={styles.feedbackGood}>✓ Gut! Die wichtigsten Begriffe waren dabei.</p>}

          {/* Self-assessment when not auto-correct */}
          {marked === null && ws < 0.65 && (
            <div className={styles.selfMark}>
              <span>Hattest du den Kern inhaltlich richtig?</span>
              <button type="button" className={styles.markCorrect} onClick={() => manualMark(true)}>✓ Ja</button>
              <button type="button" className={styles.markWrong} onClick={() => manualMark(false)}>✗ Nein</button>
            </div>
          )}
          {marked === false && (
            <p className={styles.feedbackBad}>
              ✗ Merke dir die Musterlösung – beim nächsten Mal schaffst du es!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Quiz Engine ────────────────────────────────────────────
export function QuizEngine({ questions = [], title = 'Quiz', onFinish, onUpdateCard }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState([]); // { correct, quality }
  const [waitingNext, setWaitingNext] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const finishedRef = useRef(false);
  const total = questions.length;
  const q = questions[currentIdx];

  const doFinish = useCallback(() => {
    if (finishedRef.current || typeof onFinish !== 'function') return;
    finishedRef.current = true;
    const correct = results.filter((r) => r.correct).length;
    const wrong = questions.filter((_, i) => results[i] && !results[i].correct);
    onFinish({ correct, wrong, allQuestions: questions, streak: results.map((r) => r.correct ? 'c' : 'w'), bestStreak });
  }, [results, questions, onFinish, bestStreak]);

  useEffect(() => {
    if (total > 0 && currentIdx >= total) doFinish();
  }, [currentIdx, total, doFinish]);

  const handleAnswer = useCallback((correct, needsButton = false, quality = 3) => {
    setResults((prev) => [...prev, { correct, quality }]);
    setCurrentStreak((prev) => {
      const next = correct ? prev + 1 : 0;
      setBestStreak((b) => Math.max(b, next));
      return next;
    });
    // Update SR card
    if (q && typeof onUpdateCard === 'function') {
      onUpdateCard(q.id, quality);
    }
    if (needsButton) setWaitingNext(true);
  }, [q, onUpdateCard]);

  function advance() { setWaitingNext(false); setCurrentIdx((i) => i + 1); }

  if (total === 0) return <div className={styles.root}><div className={styles.card}><p>Keine Fragen vorhanden.</p></div></div>;
  if (!q) return <div className={styles.root}><div className={styles.card}><p>Quiz wird abgeschlossen…</p></div></div>;

  const progress = Math.min(100, Math.round(((currentIdx) / total) * 100));
  const answered = results.length;
  const correctSoFar = results.filter((r) => r.correct).length;

  let renderedQuestion;
  const type = q.type;
  if (type === 'mc' || type === 'multiple') renderedQuestion = <MCQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (type === 'order') renderedQuestion = <OrderQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (type === 'match') renderedQuestion = <MatchQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (type === 'multi') renderedQuestion = <MultiQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (type === 'text' || type === 'open') renderedQuestion = <TextQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else renderedQuestion = <p className={styles.feedbackBad}>Unbekannter Fragetyp: {type}</p>;

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.topBar}>
        <div>
          <div className={styles.eyebrow}>{q.category}</div>
          <h2 className={styles.quizTitle}>{title}</h2>
        </div>
        <div className={styles.liveStats}>
          {answered > 0 && <span className={styles.livePct} style={{ color: correctSoFar / answered >= 0.7 ? 'var(--emerald)' : 'var(--rose)' }}>{Math.round(correctSoFar / answered * 100)}%</span>}
          {currentStreak >= 3 && <span className={styles.streakBadge}>🔥 {currentStreak}</span>}
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressWrap}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.progressLabel}>{currentIdx + 1} / {total}</div>

      {/* Card */}
      <div className={styles.card}>
        <div className={styles.cardMeta}>
          <span className={styles.catTag}>{q.category}</span>
          <span className={styles.typeTag}>{typeLabel(q.type)}</span>
        </div>
        <h3 className={styles.questionText}>{q.question}</h3>
        {q.hint && <p className={styles.hintBox}>💡 {q.hint}</p>}
        {renderedQuestion}
      </div>

      {waitingNext && (
        <button type="button" className={styles.nextBtn} onClick={advance}>
          Weiter →
        </button>
      )}
    </div>
  );
}
