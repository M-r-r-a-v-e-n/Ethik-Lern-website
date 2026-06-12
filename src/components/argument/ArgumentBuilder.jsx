import React, { useState } from 'react';
import styles from './ArgumentBuilder.module.css';

const BLOCKS = [
  { id: 'these', label: 'These', desc: 'Deine Hauptbehauptung', color: 'indigo', emoji: '💬' },
  { id: 'begruendung', label: 'Begründung', desc: 'Warum ist das wahr?', color: 'emerald', emoji: '📖' },
  { id: 'beispiel', label: 'Beispiel', desc: 'Konkretes Beispiel', color: 'amber', emoji: '📌' },
  { id: 'gegenargument', label: 'Gegenargument', desc: 'Was sagen Kritiker?', color: 'rose', emoji: '⚔️' },
  { id: 'widerlegung', label: 'Widerlegung', desc: 'Warum ist das Gegenarg. falsch?', color: 'indigo', emoji: '🛡️' },
  { id: 'fazit', label: 'Fazit', desc: 'Abschließende Schlussfolgerung', color: 'emerald', emoji: '✅' },
];

const RUBRIC = {
  these:        { weight: 2, hints: ['Klare Aussage?', 'Nicht zu breit formuliert?'] },
  begruendung:  { weight: 2, hints: ['Logisch nachvollziehbar?', 'Bezieht sich auf die These?'] },
  beispiel:     { weight: 1, hints: ['Konkret und nachvollziehbar?', 'Wirklich relevant?'] },
  gegenargument:{ weight: 1, hints: ['Stärksten Einwand gewählt?', 'Ehrlich dargestellt?'] },
  widerlegung:  { weight: 2, hints: ['Überzeugend widerlegt?', 'Nicht ignoriert?'] },
  fazit:        { weight: 2, hints: ['Klar und prägnant?', 'Bezieht sich auf die These?'] },
};

const OPTIMAL_ORDER = ['these', 'begruendung', 'beispiel', 'gegenargument', 'widerlegung', 'fazit'];

function scoreArgument(slots) {
  let total = 0, max = 0;
  for (const blockId of OPTIMAL_ORDER) {
    const rubric = RUBRIC[blockId];
    max += rubric.weight;
    const idx = slots.findIndex((s) => s?.id === blockId);
    if (idx !== -1) {
      const text = slots[idx]?.text ?? '';
      if (text.length >= 15) total += rubric.weight;
      else if (text.length >= 5) total += rubric.weight * 0.5;
    }
  }
  return { score: total, max, pct: max > 0 ? Math.round((total / max) * 100) : 0 };
}

export function ArgumentBuilder({ topic = 'Ein aktuelles ethisches Thema deiner Wahl', onSave }) {
  const [slots, setSlots] = useState(
    OPTIMAL_ORDER.map((id) => ({ id, text: '' }))
  );
  const [dragFromIdx, setDragFromIdx] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  function updateText(idx, text) {
    setSlots((prev) => prev.map((s, i) => i === idx ? { ...s, text } : s));
  }

  function dragStart(idx) { setDragFromIdx(idx); }
  function dragOver(e, idx) {
    e.preventDefault();
    if (dragFromIdx === null || dragFromIdx === idx) return;
    setSlots((prev) => {
      const next = [...prev];
      [next[dragFromIdx], next[idx]] = [next[idx], next[dragFromIdx]];
      return next;
    });
    setDragFromIdx(idx);
  }
  function dragEnd() { setDragFromIdx(null); }

  function submit() {
    if (submitted) return;
    setSubmitted(true);
  }

  function handleSave() {
    if (typeof onSave === 'function') {
      onSave({ topic, slots, score: scoreArgument(slots), ts: Date.now() });
    }
    setSaved(true);
  }

  function reset() {
    setSlots(OPTIMAL_ORDER.map((id) => ({ id, text: '' })));
    setSubmitted(false);
    setSaved(false);
  }

  const scoreResult = scoreArgument(slots);
  const orderCorrect = slots.every((s, i) => s.id === OPTIMAL_ORDER[i]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>🏗️ Argument-Builder</h2>
        <p className={styles.sub}>Thema: <strong>{topic}</strong></p>
        <p className={styles.hint}>Fülle jeden Baustein aus und bringe sie dann per Drag &amp; Drop in die richtige Reihenfolge.</p>
      </div>

      {/* Blocks */}
      <div className={styles.blockList}>
        {slots.map((slot, idx) => {
          const block = BLOCKS.find((b) => b.id === slot.id);
          if (!block) return null;
          const rubric = RUBRIC[slot.id];
          const isCorrectPos = slot.id === OPTIMAL_ORDER[idx];
          return (
            <div
              key={slot.id}
              className={`${styles.block} ${styles[`block_${block.color}`]} ${submitted ? (isCorrectPos ? styles.blockCorrect : styles.blockWrong) : ''}`}
              draggable={!submitted}
              onDragStart={() => dragStart(idx)}
              onDragOver={(e) => dragOver(e, idx)}
              onDragEnd={dragEnd}
              aria-label={`Baustein ${idx + 1}: ${block.label}`}
            >
              <div className={styles.blockHeader}>
                <span className={styles.dragHandle} aria-hidden="true">⠿</span>
                <span className={styles.blockEmoji}>{block.emoji}</span>
                <span className={styles.blockLabel}>{block.label}</span>
                <span className={styles.blockDesc}>{block.desc}</span>
                {submitted && (
                  <span className={styles.posIcon}>{isCorrectPos ? '✓' : '✗'}</span>
                )}
              </div>
              <textarea
                className={styles.blockInput}
                value={slot.text}
                onChange={(e) => updateText(idx, e.target.value)}
                placeholder={`${block.label} eingeben…`}
                rows={2}
                disabled={submitted}
                aria-label={`Text für ${block.label}`}
              />
              {submitted && rubric.hints && slot.text.length < 15 && (
                <div className={styles.rubricHints}>
                  {rubric.hints.map((h, i) => <span key={i} className={styles.rubricHint}>💡 {h}</span>)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      {!submitted && (
        <button type="button" className={styles.submitBtn} onClick={submit}>
          Argument prüfen
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div className={styles.feedback}>
          <div className={styles.scoreRow}>
            <div className={`${styles.scorePct} ${scoreResult.pct >= 75 ? styles.scoreGood : scoreResult.pct >= 50 ? styles.scoreOk : styles.scoreBad}`}>
              {scoreResult.pct}%
            </div>
            <div>
              <div className={styles.scoreLabel}>Gesamt-Bewertung</div>
              <div className={styles.scoreDetail}>{scoreResult.score} / {scoreResult.max} Punkte</div>
            </div>
          </div>

          {orderCorrect
            ? <p className={styles.feedbackGood}>✓ Richtige Reihenfolge – perfekter Argumentationsaufbau!</p>
            : <p className={styles.feedbackBad}>✗ Reihenfolge nicht korrekt. Die optimale Reihenfolge: These → Begründung → Beispiel → Gegenargument → Widerlegung → Fazit</p>
          }

          <div className={styles.feedbackActions}>
            <button type="button" className={styles.resetBtn} onClick={reset}>↺ Neu versuchen</button>
            {!saved && (
              <button type="button" className={styles.saveBtn} onClick={handleSave}>✓ Speichern</button>
            )}
            {saved && <span className={styles.savedLabel}>✓ Gespeichert</span>}
          </div>
        </div>
      )}
    </div>
  );
}
