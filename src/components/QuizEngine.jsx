import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  return { mc: 'Multiple Choice', multiple: 'Multiple Choice', order: 'Reihenfolge', match: 'Zuordnen', text: 'Freitext', open: 'Freitext' }[type] || 'Frage';
}

// ── MC Question ────────────────────────────────────────────
function MCQuestion({ q, onAnswer }) {
  const options = q.options ?? [];
  const answer = q.answer ?? q.correct;
  const answerUsesIndex = typeof answer === 'number' || (Array.isArray(answer) && answer.some((item) => typeof item === 'number'));
  const shuffledOptions = useMemo(() => (answerUsesIndex ? [...options] : shuffle(options)), [options, answerUsesIndex]);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const selectedOption = selected !== null ? shuffledOptions[selected] : null;
  const isCorrect = selected !== null && optionMatchesAnswer(answer, selectedOption, selected);

  function check() {
    if (selected === null || checked) return;
    setChecked(true);
    onAnswer(isCorrect, true);
  }

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

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
              <button
                key={`opt-${index}`}
                type="button"
                className={`${styles.option} ${stateClass}`}
                onClick={() => { if (!checked) setSelected(index); }}
                disabled={checked}
              >
                <span className={styles.optLetter}>{letters[index]}</span>
                <span className={styles.optText}>{optionLabel(option)}</span>
                {checked && correct && <span className={styles.optIcon}>✓</span>}
                {checked && selectedThis && !correct && <span className={styles.optIcon}>✗</span>}
              </button>
            );
          })}
        </div>
      )}
      {!checked && (
        <button type="button" className={styles.submitBtn} onClick={check} disabled={selected === null}>
          Antwort prüfen
        </button>
      )}
      {checked && (
        <p className={isCorrect ? styles.feedbackGood : styles.feedbackBad}>
          {isCorrect ? '✓ Richtig!' : '✗ Leider falsch.'}
          {q.explanation ? ` ${q.explanation}` : ''}
        </p>
      )}
    </div>
  );
}

// ── Order Question (FIXED) ─────────────────────────────────
function OrderQuestion({ q, onAnswer }) {
  const rawItems = q.items ?? q.options ?? [];
  const correctOrder = rawItems.map((item) => (typeof item === 'string' ? item : optionLabel(item)));

  // Give each item a stable unique id to avoid key conflicts after shuffle
  const [items, setItems] = useState(() =>
    shuffle(correctOrder.map((text, i) => ({ id: i, text })))
  );
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
    const isCorrectOrder = items.length === correctOrder.length && items.every((item, index) => item.text === correctOrder[index]);
    setCorrect(isCorrectOrder);
    setSubmitted(true);
    onAnswer(isCorrectOrder, true);
  }

  if (rawItems.length === 0) {
    return <p className={styles.feedbackBad}>Keine Elemente zum Sortieren vorhanden.</p>;
  }

  return (
    <div>
      <p className={styles.hint}>Ziehe die Elemente in die richtige Reihenfolge.</p>
      <div className={styles.orderList}>
        {items.map((item, index) => {
          const isCorrectPos = submitted && item.text === correctOrder[index];
          return (
            <div
              key={item.id}
              className={`${styles.orderItem} ${submitted ? (isCorrectPos ? styles.orderCorrect : styles.orderWrong) : ''}`}
              draggable={!submitted}
              onDragStart={() => dragStart(index)}
              onDragOver={(e) => dragOver(e, index)}
              onDragEnd={dragEnd}
            >
              <span className={styles.dragHandle}>⠿</span>
              <span className={styles.orderNum}>{index + 1}.</span>
              <span className={styles.orderText}>{item.text}</span>
              {submitted && <span className={styles.optIcon}>{isCorrectPos ? '✓' : '✗'}</span>}
            </div>
          );
        })}
      </div>
      {!submitted ? (
        <button type="button" className={styles.submitBtn} onClick={check}>
          Reihenfolge prüfen
        </button>
      ) : (
        <p className={correct ? styles.feedbackGood : styles.feedbackBad}>
          {correct ? '✓ Richtige Reihenfolge!' : '✗ Nicht ganz – richtige Position ist grün.'}
        </p>
      )}
    </div>
  );
}

// ── Match Question ─────────────────────────────────────────
function MatchQuestion({ q, onAnswer }) {
  const pairs = Array.isArray(q.pairs) ? q.pairs : [];
  const pairCount = pairs.length;
  const lefts = pairs.map(([left]) => left);
  const [rights, setRights] = useState(() => shuffle(pairs.map(([, right]) => right)));
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [done, setDone] = useState(false);
  const answeredRef = useRef(false);
  const matchedCount = Object.keys(matched).length;
  const isComplete = pairCount > 0 && matchedCount === pairCount;
  const isCorrect = isComplete && pairs.every(([left, right]) => matched[left] === right);

  useEffect(() => {
    if (isComplete && !done && !answeredRef.current) {
      answeredRef.current = true;
      setDone(true);
      onAnswer(isCorrect, true);
    }
  }, [done, isComplete, isCorrect, onAnswer]);

  function isRightUsed(right) { return Object.values(matched).includes(right); }

  function chooseLeft(left) {
    if (done || matched[left]) return;
    setSelectedLeft((current) => (current === left ? null : left));
  }

  function chooseRight(right) {
    if (!selectedLeft || done || matched[selectedLeft]) return;
    if (isRightUsed(right) && matched[selectedLeft] !== right) {
      setWrongFlash('Diese Antwort ist schon vergeben.');
      return;
    }
    setMatched((current) => ({ ...current, [selectedLeft]: right }));
    setSelectedLeft(null);
    setWrongFlash(null);
  }

  function reset() {
    answeredRef.current = false;
    setRights(shuffle(pairs.map(([, right]) => right)));
    setSelectedLeft(null);
    setMatched({});
    setWrongFlash(null);
    setDone(false);
  }

  return (
    <div>
      {pairCount === 0 ? (
        <p className={styles.feedbackBad}>Für diese Frage fehlen Zuordnungspaare.</p>
      ) : (
        <>
          <p className={styles.hint}>Wähle links einen Begriff, dann rechts die passende Erklärung.</p>
          <div className={styles.matchGrid}>
            <div className={styles.matchCol}>
              {lefts.map((left) => (
                <button
                  key={left}
                  type="button"
                  className={`${styles.matchItem} ${selectedLeft === left ? styles.matchSelected : ''} ${matched[left] ? styles.matchDone : ''}`}
                  onClick={() => chooseLeft(left)}
                  disabled={done || Boolean(matched[left])}
                >
                  {left}
                  {matched[left] && <span className={styles.matchArrow}>→ {matched[left]}</span>}
                </button>
              ))}
            </div>
            <div className={styles.matchCol}>
              {rights.map((right) => {
                const usedEntry = Object.entries(matched).find(([, value]) => value === right);
                const usedLeft = usedEntry?.[0];
                const expectedLeft = pairs.find(([, value]) => value === right)?.[0];
                const used = Boolean(usedLeft);
                const isPairCorrect = Boolean(usedLeft && expectedLeft === usedLeft);
                return (
                  <button
                    key={right}
                    type="button"
                    className={`${styles.matchItem} ${used ? styles.matchDone : ''} ${done && isPairCorrect ? styles.matchCorrectDone : ''} ${done && used && !isPairCorrect ? styles.matchWrongDone : ''}`}
                    onClick={() => chooseRight(right)}
                    disabled={done || (used && usedLeft !== selectedLeft)}
                  >
                    {right}
                  </button>
                );
              })}
            </div>
          </div>
          {wrongFlash && <p className={styles.feedbackBad}>{wrongFlash}</p>}
          {!done && pairCount > 0 && (
            <button type="button" className={`${styles.submitBtn} ${styles.submitBtnSecondary}`} onClick={reset}>
              Nochmal mischen
            </button>
          )}
          {done && (
            <p className={isCorrect ? styles.feedbackGood : styles.feedbackBad}>
              {isCorrect ? '✓ Alles richtig zugeordnet!' : '✗ Nicht ganz. Richtige Paare sind grün.'}
            </p>
          )}
        </>
      )}
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

  function toggle(i) {
    if (checked) return;
    setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  }

  function check() {
    if (checked || selected.length === 0) return;
    const correct = selected.length === correctIndices.length && correctIndices.every((ci) => selected.includes(ci));
    setChecked(true);
    onAnswer(correct, true);
  }

  return (
    <div>
      <p className={styles.hint}>Mehrere Antworten können richtig sein – wähle alle zutreffenden.</p>
      <div className={styles.optionList}>
        {options.map((opt, i) => {
          const isSelected = selected.includes(i);
          const isCorrect = correctIndices.includes(i);
          let stateClass = '';
          if (checked && isCorrect) stateClass = styles.optionCorrect;
          else if (checked && isSelected && !isCorrect) stateClass = styles.optionWrong;
          else if (!checked && isSelected) stateClass = styles.optionSelected;

          return (
            <button
              key={i}
              type="button"
              className={`${styles.option} ${stateClass}`}
              onClick={() => toggle(i)}
              disabled={checked}
            >
              <span className={styles.checkbox}>{checked ? (isCorrect ? '☑' : isSelected ? '☒' : '☐') : (isSelected ? '☑' : '☐')}</span>
              <span className={styles.optText}>{typeof opt === 'string' ? opt : optionLabel(opt)}</span>
              {checked && isCorrect && <span className={styles.optIcon}>✓</span>}
              {checked && isSelected && !isCorrect && <span className={styles.optIcon}>✗</span>}
            </button>
          );
        })}
      </div>
      {!checked && (
        <button type="button" className={styles.submitBtn} onClick={check} disabled={selected.length === 0}>
          Antwort prüfen
        </button>
      )}
      {checked && (() => {
        const correct = selected.length === correctIndices.length && correctIndices.every((ci) => selected.includes(ci));
        return (
          <div>
            <p className={correct ? styles.feedbackGood : styles.feedbackBad}>
              {correct ? '✓ Alle richtigen Antworten gefunden!' : '✗ Nicht vollständig richtig.'}
            </p>
            {!correct && (
              <p className={styles.correctHint}>
                Richtig wären: {correctIndices.map((ci) => options[ci]).filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        );
      })()}
    </div>
  );
}

// ── Text Question with smart keyword detection ─────────────
function checkKeywords(input, answerStr) {
  if (!answerStr) return { score: 0, matched: [], missing: [], total: 0 };
  // Extract meaningful keywords from the model answer
  // Split on common delimiters, filter short/common words
  const stopWords = new Set(['und', 'oder', 'ist', 'sind', 'die', 'der', 'das', 'ein', 'eine', 'von', 'zu', 'in', 'im', 'an', 'auf', 'bei', 'mit', 'nach', 'als', 'für', 'sich', 'des', 'dem', 'den', 'aus', 'es', 'er', 'sie', 'wir', 'ich', 'du', 'z.b', 'bzw', 'etc', 'durch']);
  
  const extractKeywords = (text) => {
    return text
      .toLowerCase()
      .replace(/[()[\]{}„"'`´]/g, ' ')
      .split(/[\s,;:.–/\\+\d]+/)
      .map(w => w.trim().replace(/[^a-zäöüß]/g, ''))
      .filter(w => w.length >= 4 && !stopWords.has(w));
  };

  const answerKeywords = [...new Set(extractKeywords(answerStr))];
  const inputLower = input.toLowerCase().replace(/[()[\]{}„"'`´]/g, ' ');
  
  const matched = [];
  const missing = [];

  for (const kw of answerKeywords) {
    // Check for the keyword or its stem (first 5 chars)
    const stem = kw.slice(0, 5);
    const found = inputLower.includes(kw) || (stem.length >= 4 && inputLower.includes(stem));
    if (found) matched.push(kw);
    else missing.push(kw);
  }

  const total = answerKeywords.length;
  const score = total > 0 ? matched.length / total : 0;
  return { score, matched, missing, total };
}

function TextQuestion({ q, onAnswer }) {
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(null); // null | true | false
  const [autoResult, setAutoResult] = useState(null);

  const answerStr = q.answer ?? '';

  function submit() {
    if (input.trim().length < 3 || revealed) return;
    const result = checkKeywords(input, answerStr);
    setAutoResult(result);
    setRevealed(true);
    // Auto-grade: >=70% keywords = correct
    if (result.score >= 0.7) {
      setMarked(true);
      onAnswer(true, true);
    }
    // else wait for manual confirm
  }

  function manualMark(val) {
    if (marked !== null) return;
    setMarked(val);
    onAnswer(val, true);
  }

  return (
    <div>
      <textarea
        className={styles.textArea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Deine Antwort eingeben..."
        rows={4}
        disabled={revealed}
      />
      {!revealed && (
        <button type="button" className={styles.submitBtn} onClick={submit} disabled={input.trim().length < 3}>
          Antwort überprüfen
        </button>
      )}
      {revealed && autoResult && (
        <div className={styles.revealBox}>
          {/* Keyword feedback */}
          <div className={styles.keywordRow}>
            {autoResult.matched.map(kw => (
              <span key={kw} className={styles.kwGood}>✓ {kw}</span>
            ))}
            {autoResult.missing.map(kw => (
              <span key={kw} className={styles.kwMissing}>✗ {kw}</span>
            ))}
          </div>
          <div className={styles.keywordScore}>
            {autoResult.matched.length} / {autoResult.total} Schlüsselbegriffe erkannt
          </div>
          <div className={styles.revealLabel}>Musterlösung:</div>
          <div className={styles.revealAnswer}>{answerStr}</div>

          {marked === true && (
            <p className={styles.feedbackGood}>✓ Richtig! Gut gemacht.</p>
          )}
          {marked === null && autoResult.score < 0.7 && (
            <div className={styles.selfMark}>
              <span>War deine Antwort trotzdem inhaltlich richtig?</span>
              <button type="button" className={styles.markCorrect} onClick={() => manualMark(true)}>✓ Ja</button>
              <button type="button" className={styles.markWrong} onClick={() => manualMark(false)}>✗ Nein</button>
            </div>
          )}
          {marked === false && (
            <p className={styles.feedbackBad}>✗ Noch nicht ganz – lerne es nochmal.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Quiz Engine ────────────────────────────────────────────
export function QuizEngine({ questions = [], title = 'Quiz', onFinish }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [streak, setStreak] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [waitingNext, setWaitingNext] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const total = questions.length;
  const q = questions[currentIdx];
  const finishedRef = useRef(false);

  const doFinish = useCallback(() => {
    if (finishedRef.current || typeof onFinish !== 'function') return;
    finishedRef.current = true;
    onFinish({ correct: correctCount, wrong: wrongAnswers, streak, allQuestions: questions });
  }, [correctCount, wrongAnswers, streak, questions, onFinish]);

  useEffect(() => {
    if (total > 0 && currentIdx >= total) doFinish();
  }, [currentIdx, total, doFinish]);

  useEffect(() => {
    if (!autoAdvance) return undefined;
    const timer = window.setTimeout(() => { setAutoAdvance(false); setCurrentIdx((i) => i + 1); }, 900);
    return () => window.clearTimeout(timer);
  }, [autoAdvance]);

  const handleAnswer = useCallback((correct, needsButton = false) => {
    setStreak((prev) => [...prev, correct ? 'c' : 'w']);
    if (correct) setCorrectCount((prev) => prev + 1);
    else setWrongAnswers((prev) => [...prev, q]);
    if (needsButton) setWaitingNext(true);
    else setAutoAdvance(true);
  }, [q]);

  function advance() { setWaitingNext(false); setCurrentIdx((i) => i + 1); }

  if (total === 0) return (
    <div className={styles.root}><div className={styles.card}><h2>{title}</h2><p>Keine Fragen vorhanden.</p></div></div>
  );

  if (!q) return (
    <div className={styles.root}><div className={styles.card}><h2>{title}</h2><p>Quiz wird abgeschlossen...</p></div></div>
  );

  const progress = Math.min(100, Math.round(((currentIdx + 1) / total) * 100));

  let renderedQuestion;
  if (q.type === 'mc' || q.type === 'multiple') renderedQuestion = <MCQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (q.type === 'order') renderedQuestion = <OrderQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (q.type === 'match') renderedQuestion = <MatchQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (q.type === 'multi') renderedQuestion = <MultiQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else if (q.type === 'text' || q.type === 'open') renderedQuestion = <TextQuestion key={currentIdx} q={q} onAnswer={handleAnswer} />;
  else renderedQuestion = <p className={styles.feedbackBad}>Unbekannter Fragetyp: {q.type}</p>;

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.eyebrow}>{q.category || 'Quiz'}</div>
          <h2 className={styles.quizTitle}>{title}</h2>
        </div>
        {streak.length > 0 && (
          <div className={styles.streakPreview}>
            {streak.slice(-12).map((item, index) => (
              <span key={`${index}-${item}`} className={item === 'c' ? styles.streakGood : styles.streakBad} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.card}>
        <div className={styles.cardMeta}>
          <span className={styles.catTag}>{q.category}</span>
          <span className={styles.typeTag}>Frage {currentIdx + 1} von {total} · {typeLabel(q.type)}</span>
        </div>
        <h3 className={styles.questionText}>{q.question}</h3>
        {q.hint && <p className={styles.hint}>💡 {q.hint}</p>}
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
