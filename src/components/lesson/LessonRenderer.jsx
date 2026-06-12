import React, { useState } from 'react';
import styles from './LessonRenderer.module.css';

/**
 * LessonRenderer – zeigt eine Micro-Lesson mit:
 *  - Einleitung (immer sichtbar)
 *  - Infografik / Diagramm (SVG oder Bild)
 *  - Optionales Video (eingebettet, ≤3 min)
 *  - Mehr-Details-Button für optionale Vertiefung
 *  - Schlüsselbegriffe (keyConcepts[])
 *  - Accessibility: ARIA-Labels, TTS-Button
 */
export function LessonRenderer({ lesson, onDone }) {
  const [expanded, setExpanded] = useState(false);
  const [ttsActive, setTtsActive] = useState(false);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  if (!lesson) return null;

  const {
    title = '',
    intro = '',
    details = '',
    infographic = null,   // { type: 'svg'|'img', src: string, alt: string }
    videoUrl = null,      // YouTube embed URL or null
    keyConcepts = [],     // [{ term, definition }]
    duration = '5 min',
    category = '',
    icon = '📖',
  } = lesson;

  function speakText() {
    if (!synth) return;
    if (ttsActive) { synth.cancel(); setTtsActive(false); return; }
    const text = `${title}. ${intro}. ${expanded ? details : ''}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;
    utterance.onend = () => setTtsActive(false);
    synth.speak(utterance);
    setTtsActive(true);
  }

  // Convert YouTube watch URL to embed URL
  function toEmbedUrl(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    return url; // assume already embed URL
  }

  const embedUrl = toEmbedUrl(videoUrl);

  return (
    <article className={styles.root} aria-label={`Lektion: ${title}`}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className={styles.catTag} aria-label={`Kategorie: ${category}`}>{category}</span>
          <span className={styles.duration} aria-label={`Dauer: ${duration}`}>⏱ {duration}</span>
        </div>
        <div className={styles.headerTitle}>
          <span className={styles.icon} aria-hidden="true">{icon}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        {synth && (
          <button
            type="button"
            className={`${styles.ttsBtn} ${ttsActive ? styles.ttsBtnActive : ''}`}
            onClick={speakText}
            aria-label={ttsActive ? 'Vorlesen stoppen' : 'Text vorlesen lassen'}
            title={ttsActive ? 'Stopp' : 'Vorlesen (TTS)'}
          >
            {ttsActive ? '⏹ Stopp' : '🔊 Vorlesen'}
          </button>
        )}
      </header>

      {/* Intro – always visible */}
      <section className={styles.introSection} aria-label="Einführung">
        <p className={styles.introText}>{intro}</p>
      </section>

      {/* Infographic */}
      {infographic && (
        <figure className={styles.infographic} aria-label={infographic.alt ?? 'Infografik'}>
          {infographic.type === 'svg' ? (
            <div
              className={styles.svgWrap}
              dangerouslySetInnerHTML={{ __html: infographic.src }}
              role="img"
              aria-label={infographic.alt}
            />
          ) : (
            <img
              src={infographic.src}
              alt={infographic.alt ?? 'Infografik zur Lektion'}
              className={styles.infographicImg}
              loading="lazy"
            />
          )}
          {infographic.caption && (
            <figcaption className={styles.caption}>{infographic.caption}</figcaption>
          )}
        </figure>
      )}

      {/* Video (optional) */}
      {embedUrl && (
        <section className={styles.videoSection} aria-label="Erklärvideo">
          <div className={styles.videoLabel}>🎥 Erklärvideo (≤3 min)</div>
          <div className={styles.videoWrap}>
            <iframe
              src={embedUrl}
              title={`Video: ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoFrame}
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Key Concepts */}
      {keyConcepts.length > 0 && (
        <section className={styles.conceptsSection} aria-label="Schlüsselbegriffe">
          <h3 className={styles.conceptsTitle}>🔑 Schlüsselbegriffe</h3>
          <dl className={styles.conceptsList}>
            {keyConcepts.map((c, i) => (
              <div key={i} className={styles.conceptItem}>
                <dt className={styles.conceptTerm}>{c.term}</dt>
                <dd className={styles.conceptDef}>{c.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Mehr Details Toggle */}
      {details && (
        <section className={styles.detailsSection}>
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="lesson-details"
          >
            {expanded ? '▲ Weniger anzeigen' : '▼ Mehr Details'}
          </button>
          {expanded && (
            <div
              id="lesson-details"
              className={styles.detailsContent}
              role="region"
              aria-label="Vertiefende Details"
            >
              {details.split('\n\n').map((para, i) => (
                <p key={i} className={styles.detailPara}>{para}</p>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Done button */}
      {typeof onDone === 'function' && (
        <div className={styles.doneRow}>
          <button type="button" className={styles.doneBtn} onClick={onDone} aria-label="Lektion abschließen">
            ✓ Lektion abgeschlossen → Quiz starten
          </button>
        </div>
      )}
    </article>
  );
}

/**
 * Build a lesson object from a topic (content.js compatible)
 */
export function topicToLesson(topic) {
  return {
    title: topic.title ?? '',
    intro: topic.intro ?? topic.summary ?? '',
    details: topic.details ?? '',
    infographic: topic.infographic ?? null,
    videoUrl: topic.videoUrl ?? null,
    keyConcepts: topic.keyConcepts ?? [],
    duration: topic.duration ?? '5 min',
    category: topic.category ?? '',
    icon: topic.icon ?? '📖',
  };
}
