import React, { useState } from 'react';
import styles from './ScenarioSimulator.module.css';

const CONSEQUENCE_META = {
  positiv:  { label: 'Positive Konsequenz',  color: 'var(--emerald)', emoji: '✅' },
  negativ:  { label: 'Negative Konsequenz',  color: 'var(--rose)',    emoji: '❌' },
  gemischt: { label: 'Gemischte Konsequenz', color: 'var(--amber)',   emoji: '⚖️' },
};

export function ScenarioSimulator({ scenarios, onSaveResult }) {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [history, setHistory] = useState([]); // [{ nodeId, choiceLabel }]
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [done, setDone] = useState(false);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  function startScenario(scenario) {
    setSelectedScenario(scenario);
    setCurrentNodeId(scenario.startNodeId);
    setHistory([]);
    setDone(false);
    setReflection('');
    setSaved(false);
  }

  function chooseOption(choice) {
    const nextNode = selectedScenario.nodes[choice.nextId];
    if (!nextNode) return;
    setHistory((prev) => [...prev, { nodeId: currentNodeId, choiceLabel: choice.label, nextId: choice.nextId }]);
    setCurrentNodeId(choice.nextId);
    if (nextNode.type === 'outcome') setDone(true);
  }

  function restart() {
    setCurrentNodeId(selectedScenario.startNodeId);
    setHistory([]);
    setDone(false);
    setReflection('');
    setSaved(false);
  }

  function saveResult() {
    if (typeof onSaveResult === 'function') {
      onSaveResult({
        scenarioId: selectedScenario.id,
        history,
        outcomeNodeId: currentNodeId,
        reflection,
        consequence: currentNode?.consequence,
        ts: Date.now(),
      });
    }
    setSaved(true);
  }

  const currentNode = selectedScenario?.nodes[currentNodeId];
  const consMeta = CONSEQUENCE_META[currentNode?.consequence] ?? null;

  // ── Scenario list ──────────────────────────────────────
  if (!selectedScenario) {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <h2 className={styles.title}>🧭 Szenario-Simulator</h2>
          <p className={styles.sub}>Triff Entscheidungen in ethischen Dilemmas und entdecke ihre Konsequenzen.</p>
        </div>
        <div className={styles.scenarioList}>
          {(scenarios ?? []).map((s) => (
            <button key={s.id} type="button" className={styles.scenarioCard} onClick={() => startScenario(s)}>
              <span className={styles.scenarioCat}>{s.category}</span>
              <div className={styles.scenarioName}>{s.title}</div>
              <div className={styles.scenarioDesc}>{s.description}</div>
              <span className={styles.startArrow}>▶ Starten</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Active scenario ────────────────────────────────────
  return (
    <div className={styles.root} role="main" aria-label={`Szenario: ${selectedScenario.title}`}>
      {/* Back + title */}
      <div className={styles.simHeader}>
        <button type="button" className={styles.backBtn} onClick={() => setSelectedScenario(null)}>← Szenarien</button>
        <div className={styles.simTitle}>{selectedScenario.title}</div>
      </div>

      {/* Path breadcrumb */}
      {history.length > 0 && (
        <div className={styles.pathWrap} aria-label="Entscheidungspfad">
          <div className={styles.pathLabel}>Dein Weg:</div>
          <div className={styles.path}>
            {history.map((h, i) => (
              <React.Fragment key={i}>
                <span className={styles.pathStep}>{h.choiceLabel}</span>
                {i < history.length - 1 && <span className={styles.pathArrow} aria-hidden="true">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Current node */}
      <div className={`${styles.nodeCard} ${done && consMeta ? styles[`node_${currentNode?.consequence}`] : ''}`}>
        {currentNode?.ethicalNote && (
          <div className={styles.ethicalNote}>
            💡 <strong>Ethische Perspektive:</strong> {currentNode.ethicalNote}
          </div>
        )}
        <p className={styles.nodeText}>{currentNode?.text}</p>

        {/* Decision choices */}
        {!done && currentNode?.type === 'decision' && (
          <div className={styles.choices} role="group" aria-label="Deine Optionen">
            {(currentNode.choices ?? []).map((choice, i) => (
              <button
                key={i}
                type="button"
                className={styles.choiceBtn}
                onClick={() => chooseOption(choice)}
                aria-label={`Option ${i + 1}: ${choice.label}`}
              >
                <span className={styles.choiceNum}>{i + 1}</span>
                <span className={styles.choiceText}>{choice.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Outcome */}
        {done && currentNode?.type === 'outcome' && (
          <div className={styles.outcome}>
            {consMeta && (
              <div className={styles.consequenceTag} style={{ color: consMeta.color, borderColor: consMeta.color }}>
                {consMeta.emoji} {consMeta.label}
              </div>
            )}
            <div className={styles.summaryBox}>
              <div className={styles.summaryLabel}>Zusammenfassung:</div>
              <p className={styles.summaryText}>{currentNode.summary}</p>
            </div>
            {currentNode.reflection && (
              <div className={styles.reflectionPrompt}>
                <div className={styles.reflectionLabel}>🤔 Reflexionsfrage:</div>
                <p className={styles.reflectionQ}>{currentNode.reflection}</p>
                <textarea
                  className={styles.reflectionInput}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Schreibe deine Gedanken..."
                  rows={3}
                  aria-label="Deine Antwort auf die Reflexionsfrage"
                />
              </div>
            )}
            <div className={styles.outcomeActions}>
              <button type="button" className={styles.restartBtn} onClick={restart}>↺ Nochmal versuchen</button>
              {!saved && (
                <button type="button" className={styles.saveBtn} onClick={saveResult}>
                  ✓ Ergebnis speichern
                </button>
              )}
              {saved && <span className={styles.savedLabel}>✓ Gespeichert</span>}
              <button type="button" className={styles.backToListBtn} onClick={() => setSelectedScenario(null)}>
                Andere Szenarien
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Consequence diagram (path visualization) */}
      {history.length >= 2 && (
        <div className={styles.diagram} aria-label="Entscheidungsdiagramm">
          <div className={styles.diagramLabel}>Dein Entscheidungspfad:</div>
          <div className={styles.diagramPath}>
            <div className={styles.diagramStart}>Start</div>
            {history.map((h, i) => (
              <React.Fragment key={i}>
                <div className={styles.diagramArrow} aria-hidden="true">↓</div>
                <div className={styles.diagramNode}>{h.choiceLabel.slice(0, 40)}{h.choiceLabel.length > 40 ? '…' : ''}</div>
              </React.Fragment>
            ))}
            {done && (
              <>
                <div className={styles.diagramArrow} aria-hidden="true">↓</div>
                <div
                  className={styles.diagramOutcome}
                  style={{ borderColor: consMeta?.color, color: consMeta?.color }}
                >
                  {consMeta?.emoji} {consMeta?.label}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
