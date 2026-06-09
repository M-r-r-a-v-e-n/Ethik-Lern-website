import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './QuizEngine.module.css';

function shuffle(input = []) {
  const arr = [...input];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function optionLabel(option) {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }

  if (option && typeof option === 'object') {
    return option.text ?? option.label ?? option.name ?? option.value ?? option.id ?? '';
  }

  return '';
}

function optionEqualsAnswer(answer, option, originalIndex) {
  if (answer === undefined || answer === null) return false;

  if (typeof answer === 'number') {
    return originalIndex === answer;
  }

  if (typeof answer === 'object') {
    const answerText = optionLabel(answer);

    if (answerText) {
      return optionLabel(option) === answerText;
    }

    if (answer.id !== undefined) {
      return Boolean(option && typeof option === 'object' && option.id === answer.id);
    }
  }

  return optionLabel(option) === String(answer);
}

function optionMatchesAnswer(answer, option, originalIndex) {
  if (Array.isArray(answer)) {
    return answer.some((item) => optionEqualsAnswer(item, option, originalIndex));
  }

  return optionEqualsAnswer(answer, option, originalIndex);
}

function typeLabel(type) {
  return {
    mc: 'Multiple Choice',
    multiple: 'Multiple Choice',
    order: 'Reihenfolge',
    match: 'Zuordnen',
    text: 'Freitext',
    open: 'Freitext',
  }[type] || 'Frage';
}

function MCQuestion({ q, onAnswer }) {
  const options = q.options ?? [];

  const answerUsesIndex =
    typeof q.answer === 'number' ||
    (Array.isArray(q.answer) && q.answer.some((item) => typeof item === 'number'));

  const shuffledOptions = useMemo(
    () => (answerUsesIndex ? [...options] : shuffle(options)),
    [options, answerUsesIndex]
  );

  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const selectedOption = selected !== null ? shuffledOptions[selected] : null;
  const isCorrect =
    selected !== null && optionMatchesAnswer(q.answer, selectedOption, selected);

  function check() {
    if (selected === null || checked) return;

    setChecked(true);
    onAnswer(isCorrect, true);
  }

  return (
    <div>
      {options.length === 0 ? (
        <p className={styles.feedbackBad}>Diese Frage hat keine Antwortmöglichkeiten.</p>
      ) : (
        <div className={styles.optionList}>
          {shuffledOptions.map((option, index) => {
            const correct = optionMatchesAnswer(q.answer, option, index);
            const selectedThis = selected === index;

            const className = [
              styles.option,
              selectedThis ? styles.optionSelected : '',
              checked && correct ? styles.optionCorrect : '',
              checked && selectedThis && !correct ? styles.optionWrong : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={`${optionLabel(option) || 'option'}-${index}`}
                type="button"
                className={className}
                onClick={() => {
                  if (!checked) setSelected(index);
                }}
                disabled={checked}
                style={
                  checked && correct
                    ? {
                        borderColor: 'var(--emerald)',
                        background: 'var(--emerald-light)',
                      }
                    : checked && selectedThis && !correct
                    ? {
                        borderColor: 'var(--rose)',
                        background: 'var(--rose-light)',
                      }
                    : undefined
                }
              >
                {optionLabel(option)}
              </button>
            );
          })}
        </div>
      )}

      {!checked && (
        <button
          type="button"
          className={styles.submitBtn}
          onClick={check}
          disabled={selected === null}
        >
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

function OrderQuestion({ q, onAnswer }) {
  const initialItems = (q.options ?? []).map((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return { text: String(item) };
    }

    if (item && typeof item === 'object') {
      const normalized = { ...item };
      normalized.text = optionLabel(item);
      return normalized;
    }

    return { text: optionLabel(item) };
  });

  const [items, setItems] = useState(() => shuffle(initialItems));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const dragFrom = useRef(null);

  function dragStart(index) {
    dragFrom.current = index;
  }

  function dragOver(event, index) {
    event.preventDefault();

    if (submitted || dragFrom.current === null || dragFrom.current === index) {
      return;
    }

    const from = dragFrom.current;
    const next = [...items];
    const [moved] = next.splice(from, 1);

    next.splice(index, 0, moved);

    setItems(next);
    dragFrom.current = index;
  }

  function dragEnd() {
    dragFrom.current = null;
  }

  function check() {
    if (submitted || items.length === 0) return;

    const isCorrectOrder =
      items.length === (q.order ?? []).length &&
      items.every((item, index) => item.text === q.order[index]);

    setCorrect(isCorrectOrder);
    setSubmitted(true);
    onAnswer(isCorrectOrder, true);
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className={styles.feedbackBad}>Keine Elemente zum Sortieren vorhanden.</p>
      ) : (
        <div className={styles.optionList}>
          {items.map((item, index) => {
            const isCorrectPosition = submitted && item.text === q.order?.[index];

            return (
              <div
                key={`${item.text || 'item'}-${index}`}
                className={styles.orderItem}
                draggable={!submitted}
                onDragStart={() => dragStart(index)}
                onDragOver={(event) => dragOver(event, index)}
                onDragEnd={dragEnd}
                style={
                  submitted
                    ? {
                        borderColor: isCorrectPosition ? 'var(--emerald)' : 'var(--rose)',
                        background: isCorrectPosition
                          ? 'var(--emerald-light)'
                          : 'var(--rose-light)',
                      }
                    : undefined
                }
              >
                <span className={styles.dragHandle}>⠿</span>
                <span className={styles.orderNum}>{index + 1}.</span>
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      )}

      {!submitted ? (
        <button type="button" className={styles.submitBtn} onClick={check}>
          Reihenfolge prüfen
        </button>
      ) : (
        <p className={correct ? styles.feedbackGood : styles.feedbackBad}>
          {correct
            ? '✓ Richtige Reihenfolge!'
            : '✗ Nicht ganz – die richtige Position ist grün markiert.'}
        </p>
      )}
    </div>
  );
}

function MatchQuestion({ q, onAnswer }) {
  const pairs = Array.isArray(q.pairs) ? q.pairs : [];
  const pairCount = pairs.length;
  const lefts = pairs.map(([left]) => left);

  const [rights, setRights] = useState(() =>
    shuffle(pairs.map(([, right]) => right))
  );
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [done, setDone] = useState(false);
  const answeredRef = useRef(false);

  const matchedCount = Object.keys(matched).length;
  const isComplete = pairCount > 0 && matchedCount === pairCount;
  const isCorrect =
    isComplete && pairs.every(([left, right]) => matched[left] === right);

  useEffect(() => {
    if (isComplete && !done && !answeredRef.current) {
      answeredRef.current = true;
      setDone(true);
      onAnswer(isCorrect, true);
    }
  }, [done, isComplete, isCorrect, onAnswer]);

  function isRightUsed(right) {
    return Object.values(matched).includes(right);
  }

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

    setMatched((current) => ({
      ...current,
      [selectedLeft]: right,
    }));

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
          <div className={styles.matchGrid}>
            <div className={styles.matchColumn}>
              {lefts.map((left) => (
                <button
                  key={left}
                  type="button"
                  className={[
                    styles.matchItem,
                    selectedLeft === left ? styles.matchSelected : '',
                    matched[left] ? styles.matchDone : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => chooseLeft(left)}
                  disabled={done || Boolean(matched[left])}
                >
                  {left}
                  {matched[left] && <span> → {matched[left]}</span>}
                </button>
              ))}
            </div>

            <div className={styles.matchColumn}>
              {rights.map((right) => {
                const usedEntry = Object.entries(matched).find(
                  ([, value]) => value === right
                );
                const usedLeft = usedEntry?.[0];
                const expectedLeft = pairs.find(([, value]) => value === right)?.[0];
                const used = Boolean(usedLeft);
                const isPairCorrect = Boolean(usedLeft && expectedLeft === usedLeft);

                return (
                  <button
                    key={right}
                    type="button"
                    className={[
                      styles.matchItem,
                      used ? styles.matchDone : '',
                      isPairCorrect ? styles.matchCorrect : '',
                      used && !isPairCorrect ? styles.matchWrong : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => chooseRight(right)}
                    disabled={done || (used && usedLeft !== selectedLeft)}
                    style={
                      done && isPairCorrect
                        ? {
                            borderColor: 'var(--emerald)',
                            background: 'var(--emerald-light)',
                          }
                        : done && used && !isPairCorrect
                        ? {
                            borderColor: 'var(--rose)',
                            background: 'var(--rose-light)',
                          }
                        : undefined
                    }
                  >
                    {right}
                  </button>
                );
              })}
            </div>
          </div>

          {wrongFlash && <p className={styles.feedbackBad}>{wrongFlash}</p>}

          {!done && pairCount > 0 && (
            <button type="button" className={styles.submitBtn} onClick={reset}>
              Nochmal mischen
            </button>
          )}

          {done && (
            <p className={isCorrect ? styles.feedbackGood : styles.feedbackBad}>
              {isCorrect
                ? '✓ Alles richtig zugeordnet!'
                : '✗ Nicht ganz. Die richtigen Paare sind grün markiert.'}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function TextQuestion({ q, onAnswer }) {
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);

  function reveal() {
    setRevealed(true);
  }

  function markSelf(isCorrect) {
    if (marked) return;

    setMarked(true);
    onAnswer(isCorrect, true);
  }

  return (
    <div>
      <textarea
        className={styles.textArea}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Deine Antwort..."
        rows={3}
        disabled={revealed}
      />

      {!revealed && (
        <button
          type="button"
          className={styles.submitBtn}
          onClick={reveal}
          disabled={input.trim().length === 0}
        >
          Antwort aufdecken
        </button>
      )}

      {revealed && (
        <div className={styles.revealBox}>
          <div className={styles.revealLabel}>Musterlösung:</div>
          <div className={styles.revealAnswer}>{q.answer}</div>

          <div className={styles.selfMark}>
            <span>War deine Antwort richtig?</span>

            <button
              type="button"
              className={styles.markCorrect}
              onClick={() => markSelf(true)}
              disabled={marked}
            >
              ✓ Ja
            </button>

            <button
              type="button"
              className={styles.markWrong}
              onClick={() => markSelf(false)}
              disabled={marked}
            >
              ✗ Nein
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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

    onFinish({
      correct: correctCount,
      wrong: wrongAnswers,
      streak,
      allQuestions: questions,
    });
  }, [correctCount, wrongAnswers, streak, questions, onFinish]);

  useEffect(() => {
    if (total > 0 && currentIdx >= total) {
      doFinish();
    }
  }, [currentIdx, total, doFinish]);

  useEffect(() => {
    if (!autoAdvance) return undefined;

    const timer = window.setTimeout(() => {
      setAutoAdvance(false);
      setCurrentIdx((index) => index + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [autoAdvance]);

  const handleAnswer = useCallback(
    (correct, needsButton = false) => {
      setStreak((prev) => [...prev, correct ? 'c' : 'w']);

      if (correct) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setWrongAnswers((prev) => [...prev, q]);
      }

      if (needsButton) {
        setWaitingNext(true);
      } else {
        setAutoAdvance(true);
      }
    },
    [q]
  );

  function advance() {
    setWaitingNext(false);
    setCurrentIdx((index) => index + 1);
  }

  if (total === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.card}>
          <h2>{title}</h2>
          <p className={styles.body}>Keine Fragen vorhanden.</p>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className={styles.root}>
        <div className={styles.card}>
          <h2>{title}</h2>
          <p className={styles.body}>Quiz wird abgeschlossen...</p>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.round(((currentIdx + 1) / total) * 100));
  const category = q.category || 'Ethik';

  let renderedQuestion;

  if (q.type === 'mc' || q.type === 'multiple') {
    renderedQuestion = <MCQuestion q={q} onAnswer={handleAnswer} />;
  } else if (q.type === 'order') {
    renderedQuestion = <OrderQuestion q={q} onAnswer={handleAnswer} />;
  } else if (q.type === 'match') {
    renderedQuestion = <MatchQuestion q={q} onAnswer={handleAnswer} />;
  } else if (q.type === 'text' || q.type === 'open') {
    renderedQuestion = <TextQuestion q={q} onAnswer={handleAnswer} />;
  } else {
    renderedQuestion = (
      <p className={styles.feedbackBad}>Dieser Fragetyp wird nicht unterstützt: {q.type}</p>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <div>
          <div className={styles.eyebrow}>Quiz</div>
          <h2 className={styles.quizTitle}>{title}</h2>
        </div>

        {streak.length > 0 && (
          <div className={styles.streakPreview} aria-label="Letzte Antworten">
            {streak.slice(-12).map((item, index) => (
              <span
                key={`${index}-${item}`}
                className={item === 'c' ? styles.streakGood : styles.streakBad}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className={styles.progressWrap}
        aria-label={`Frage ${currentIdx + 1} von ${total}`}
      >
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.card}>
        <div className={styles.cardMeta}>
          <span className={styles.catTag}>{category}</span>
          <span className={styles.typeTag}>
            Frage {currentIdx + 1} von {total} · {typeLabel(q.type)}
          </span>
        </div>

        <h3 className={styles.questionText}>{q.question}</h3>

        {q.hint && <p className={styles.hint}>Hinweis: {q.hint}</p>}

        {renderedQuestion}
      </div>

      {waitingNext && (
        <button type="button" className={styles.nextBtn} onClick={advance}>
          Weiter
        </button>
      )}
    </div>
  );
}