import React from 'react';
import styles from './TopicContent.module.css';

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

export function TopicContent({ topic }) {
  if (!topic || !Array.isArray(topic.sections)) {
    return null;
  }

  const colorClass = topic.color ? styles[`color_${topic.color}`] : '';

  return (
    <div className={styles.root}>
      {topic.sections.map((section, sectionIndex) => (
        <section
          key={section.heading || sectionIndex}
          className={styles.section}
        >
          {section.heading && (
            <h3 className={styles.heading}>{section.heading}</h3>
          )}

          {section.body && (
            <p className={styles.body}>{section.body}</p>
          )}

          {hasItems(section.steps) && (
            <div className={styles.stepsGrid}>
              {section.steps.map((step, stepIndex) => (
                <article
                  key={step.title || step.num || stepIndex}
                  className={`${styles.stepCard} ${colorClass}`.trim()}
                >
                  <div className={styles.stepNum}>{step.num}</div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepDesc}>{step.desc}</div>
                </article>
              ))}
            </div>
          )}

          {section.table &&
            hasItems(section.table.headers) &&
            Array.isArray(section.table.rows) &&
            section.table.rows.length > 0 && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {section.table.headers.map((header, headerIndex) => (
                        <th key={headerIndex}>{header}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {section.table.rows
                      .filter(Array.isArray)
                      .map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

          {hasItems(section.numberedList) && (
            <ol className={styles.numberedList}>
              {section.numberedList.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}

          {hasItems(section.list) && (
            <ul className={styles.list}>
              {section.list.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}

          {section.listNote && (
            <p className={styles.listNote}>{section.listNote}</p>
          )}
        </section>
      ))}
    </div>
  );
}