// ======================================================
// DEUTSCH – Themen (TOPICS) + Fragen (QUESTIONS)
// ======================================================

export const DEUTSCH_TOPICS = [
  // ----- 1. Stilmittel -------------------------------------------------
  {
    id: 'de_stilmittel',
    subjectId: 'deutsch',
    category: 'A. Sprachbewusstsein',
    title: 'Stilmittel',
    subtitle: 'Wichtige rhetorische Figuren',
    icon: '🖋️',
    duration: '7 min',
    intro: 'Die wichtigsten stilistischen Mittel in der deutschen Sprache.',
    details: 'Hier findest du kurze Erklärungen und Beispiele.',
    keyConcepts: [
      { term: 'Metapher',       definition: 'Übertragene Bedeutung ohne Vergleichswort (z. B. „Das Leben ist ein Traum.“)' },
      { term: 'Vergleich',      definition: 'Direkter Vergleich mit „wie“ (z. B. „stark wie ein Löwe“)' },
      { term: 'Personifikation',definition: 'Menschliche Eigenschaften für Tiere/Dinge (z. B. „Die Sonne lacht.“)' },
      { term: 'Hyperbel',       definition: 'Übertreibung (z. B. „Ich habe das tausendmal gesagt.“)' },
      { term: 'Litotes',        definition: 'Untertreibung durch Verneinung (z. B. „nicht schlecht = sehr gut“)' },
      { term: 'Ironie',         definition: 'Das Gegenteil dessen, was gemeint ist.' },
      { term: 'Ellipse',        definition: 'Auslassung von Satzteilen (z. B. „Je mehr, desto besser.“)' },
      { term: 'Anapher',        definition: 'Wiederholung am Satzanfang (z. B. „Ich will… Ich fordere… Ich bestehe…“)' },
      { term: 'Alliteration',   definition: 'Gleicher Anlaut (z. B. „Milch macht müde Männer munter.“)' },
      { term: 'Rhetorische Frage', definition: 'Frage ohne erwartete Antwort (z. B. „Wer glaubt denn so etwas?“)' },
      { term: 'Antithese',      definition: 'Gegensatz im Parallelismus (z. B. „Arm und Reich“)' },
      { term: 'Oxymoron',       definition: 'Widerspruch in sich (z. B. „beredes Schweigen“)' },
      { term: 'Klimax',         definition: 'Steigerung vom schwächsten zum stärksten Argument.' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleStilmittel'
  },

  // ----- 2. Tempora & Modus -------------------------------------------
  {
    id: 'de_tempora_modus',
    subjectId: 'deutsch',
    category: 'B. Textverständnis',
    title: 'Tempora & Modus',
    subtitle: 'Zeitformen und ihre Verwendung',
    icon: '🕰️',
    duration: '10 min',
    intro: 'Alle sechs deutschen Zeitformen und die drei Modi.',
    details: `1. Präsens – Gegenwart / allgemeine Wahrheit  
2. Präteritum – Schriftliche Vergangenheit  
3. Perfekt – Gesprochene Vergangenheit  
4. Plusquamperfekt – Vorvergangenheit  
5. Futur I – Zukunft / Vermutung  
6. Futur II – abgeschlossene Zukunft  

Modi:  
• Indikativ – Wirklichkeitsform  
• Konjunktiv I – Indirekte Rede  
• Konjunktiv II – Irrealis / Höflichkeit`,
    keyConcepts: [
      { term: 'Präsens',       definition: 'Gegenwart oder allgemeine Gültigkeit (ich gehe).' },
      { term: 'Präteritum',    definition: 'Einfache Vergangenheit in der Schriftsprache (ich ging).' },
      { term: 'Perfekt',       definition: 'Mündliche Vergangenheit (ich bin gegangen).' },
      { term: 'Plusquamperfekt',definition: 'Vorvergangenheit (ich war gegangen).' },
      { term: 'Futur I',       definition: 'Zukunft (ich werde gehen).' },
      { term: 'Futur II',      definition: 'Abgeschlossene Zukunft (ich werde gegangen sein).' },
      { term: 'Indikativ',     definition: 'Normale Wirklichkeitsform.' },
      { term: 'Konjunktiv I',  definition: 'Indirekte Rede (er sei krank).' },
      { term: 'Konjunktiv II', definition: 'Irrealis / Höflichkeit (wenn ich Zeit hätte …).'}
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleTempora'
  },

  // ----- 3. Literaturgeschichte ----------------------------------------
  {
    id: 'de_literaturgeschichte',
    subjectId: 'deutsch',
    category: 'B. Textverständnis',
    title: 'Literaturgeschichte',
    subtitle: 'Vom Mittelalter bis zur Gegenwart',
    icon: '📚',
    duration: '15 min',
    intro: 'Überblick über die wichtigsten Epochen und ihre Hauptmerkmale.',
    details: `Mittelalter → Gotik, Minnegesang  
Renaissance → Humanismus, Sonett  
Barock → Gegenständlichkeit, Antithetik  
Aufklärung → Vernunft, Gesellschaftskritik  
Klassik → Harmonie, Humanität (Goethe, Schiller)  
Romantik → Gefühl, Natur, Individualität  
Realismus → Alltag, Objektivität  
Expressionismus → Subjektivität, Krise  
Moderne → Fragmentierung, neue Medien`,
    keyConcepts: [
      { term: 'Renaissance', definition: 'Wiederbelebung antiker Werte, Humanismus.' },
      { term: 'Barock',     definition: 'Prächtige Formen, Gegenständlichkeit.' },
      { term: 'Romantik',   definition: 'Gefühl, Natur, Individuum.' },
      { term: 'Expressionismus', definition: 'Innere Angst, Stadt, Bruch.' },
      { term: 'Postmoderne', definition: 'Intertextualität, Ironie, Medien.' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleLit'
  },

  // ----- 4. Weitere Themen (z. B. Rechtschreibung) --------------------
  {
    id: 'de_rechtschreibung',
    subjectId: 'deutsch',
    category: 'C. Grammatik',
    title: 'Rechtschreibung',
    subtitle: 'Häufige Fehler & Regeln',
    icon: '✍️',
    duration: '6 min',
    intro: 'Kurzregeln zu ß, ss, ie, ei, Groß‑/Kleinschreibung.',
    details: `• ß → nach langen Vokalen (Straße).  
• ss → nach kurzen Vokalen (Masse).  
• ie → nach kurzem, betontem Vokal (Liebe).  
• ei → nach längerem, nicht betontem Vokal (Leiter).  
• Groß‑Schreibung von Nomen, Satzanfängen, Eigennamen.`,
    keyConcepts: [
      { term: 'ß-Regel', definition: 'Nach langen Vokalen und Doppellauten.' },
      { term: 'ss‑Regel', definition: 'Nach kurzen Vokalen.' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleRechtschreibung'
  }
];

// ----------------------------------------------------------------------
// Fragen zu den deutschen Themen
// ----------------------------------------------------------------------
export const DEUTSCH_QUESTIONS = [

  // ---- Stilmittel ----------------------------------------------------
  {
    id: 'dq01',
    subjectId: 'deutsch',
    topicIds: ['de_stilmittel'],
    category: 'Stilmittel',
    type: 'mc',
    question: 'Welches Stilmittel liegt vor: „Die Sonne lacht.“?',
    options: ['Metapher', 'Personifikation', 'Hyperbel', 'Litotes'],
    correct: 1,
    explanation: 'Die Sonne bekommt menschliche Eigenschaften – Personifikation.'
  },
  {
    id: 'dq02',
    subjectId: 'deutsch',
    topicIds: ['de_stilmittel'],
    category: 'Stilmittel',
    type: 'match',
    question: 'Ordne das Stilmittel dem passenden Beispiel zu.',
    pairs: [
      ['Das Leben ist ein Traum.', 'Metapher'],
      ['Er ist stark wie ein Löwe.', 'Vergleich'],
      ['Ich habe das tausendmal gesagt.', 'Hyperbel'],
      ['nicht schlecht = sehr gut', 'Litotes']
    ]
  },
  {
    id: 'dq03',
    subjectId: 'deutsch',
    topicIds: ['de_stilmittel'],
    category: 'Stilmittel',
    type: 'order',
    question: 'Ordne die rhetorischen Figuren nach Intensität von schwach → stark.',
    items: ['Litotes', 'Metapher', 'Hyperbel', 'Oxymoron']
  },
  {
    id: 'dq04',
    subjectId: 'deutsch',
    topicIds: ['de_stilmittel'],
    category: 'Stilmittel',
    type: 'text',
    question: 'Nenne drei Beispiele für Alliteration und erkläre kurz deren Wirkung.',
    answer: 'z. B. „Milch macht müde Männer munter“, „Peter pfeift pfeifend“, „Sonne sinkt still“ – Wiederholung des Anfangslauts erhöht Klang und Merkfähigkeit.',
    keywords: ['Alliteration', 'Anfangslaut', 'Klang', 'Wiederholung']
  },

  // ---- Tempora & Modus -----------------------------------------------
  {
    id: 'dq05',
    subjectId: 'deutsch',
    topicIds: ['de_tempora_modus'],
    category: 'Tempora & Modus',
    type: 'mc',
    question: 'Welches Tempus benutzt man für Handlungen, die vor einem anderen Ereignis in der Vergangenheit stattfanden?',
    options: ['Präteritum', 'Perfekt', 'Plusquamperfekt', 'Futur I'],
    correct: 2,
    explanation: 'Plusquamperfekt = Vorvergangenheit (z. B. „Ich hatte geschrieben.“).'
  },
  {
    id: 'dq06',
    subjectId: 'deutsch',
    topicIds: ['de_tempora_modus'],
    category: 'Tempora & Modus',
    type: 'mc',
    question: 'Welcher Modus wird in indirekter Rede verwendet?',
    options: ['Indikativ', 'Konjunktiv I', 'Konjunktiv II', 'Imperativ'],
    correct: 1,
    explanation: 'Konjunktiv I ist die Standardform für die indirekte Rede.'
  },
  {
    id: 'dq07',
    subjectId: 'deutsch',
    topicIds: ['de_tempora_modus'],
    category: 'Tempora & Modus',
    type: 'order',
    question: 'Ordne die Tempora vom gegenwärtigsten zum weit entferntesten Zeitpunkt.',
    items: ['Präsens', 'Perfekt', 'Futur I', 'Plusquamperfekt', 'Futur II']
  },
  {
    id: 'dq08',
    subjectId: 'deutsch',
    topicIds: ['de_tempora_modus'],
    category: 'Tempora & Modus',
    type: 'text',
    question: 'Erkläre den Unterschied zwischen Konjunktiv I und Konjunktiv II anhand von je einem Beispiel.',
    answer: 'Konjunktiv I (indirekte Rede): „Er sagt, er sei müde.“ – Konjunktiv II (Irrealis): „Wenn ich Geld hätte, würde ich reisen.“',
    keywords: ['Konjunktiv I', 'Konjunktiv II', 'indirekte Rede', 'Irrealis']
  },

  // ---- Literaturgeschichte ---------------------------------------------
  {
    id: 'dq09',
    subjectId: 'deutsch',
    topicIds: ['de_literaturgeschichte'],
    category: 'Literaturgeschichte',
    type: 'mc',
    question: 'Welcher Autor gehört zur Epoche der Romantik?',
    options: ['Johann Wolfgang von Goethe', 'Heinrich Heine', 'Theodor Fontane', 'Friedrich Schiller'],
    correct: 1,
    explanation: 'Heinrich Heine ist ein bedeutender Romantiker.'
  },
  {
    id: 'dq10',
    subjectId: 'deutsch',
    topicIds: ['de_literaturgeschichte'],
    category: 'Literaturgeschichte',
    type: 'match',
    question: 'Ordne die Epoche dem Hauptmerkmal zu.',
    pairs: [
      ['Barock', 'Gegensatz, Antithetik'],
      ['Aufklärung', 'Vernunft, Kritik'],
      ['Expressionismus', 'Innere Krise, Fragmentierung'],
      ['Postmoderne', 'Intertextualität, Ironie']
    ]
  },
  {
    id: 'dq11',
    subjectId: 'deutsch',
    topicIds: ['de_literaturgeschichte'],
    category: 'Literaturgeschichte',
    type: 'order',
    question: 'Bringe die Epochen chronologisch von früh nach spät.',
    items: ['Romantik', 'Mittelalter', 'Aufklärung', 'Expressionismus', 'Barock']
  },
  {
    id: 'dq12',
    subjectId: 'deutsch',
    topicIds: ['de_literaturgeschichte'],
    category: 'Literaturgeschichte',
    type: 'text',
    question: 'Nenne je einen bekannten Vertreter der Klassik, Romantik und Moderne und jeweils ein typisches Werk.',
    answer: 'Klassik: Goethe – „Faust“. Romantik: Novalis – „Heinrich von Ofterdingen“. Moderne: Thomas Mann – „Buddenbrooks“.',
    keywords: ['Goethe', 'Faust', 'Novalis', 'Heinrich von Ofterdingen', 'Thomas Mann', 'Buddenbrooks']
  },

  // ---- Rechtschreibung -------------------------------------------------
  {
    id: 'dq13',
    subjectId: 'deutsch',
    topicIds: ['de_rechtschreibung'],
    category: 'Rechtschreibung',
    type: 'mc',
    question: 'Welches Wort wird mit „ß“ geschrieben?',
    options: ['Masse', 'Straße', 'Buße', 'Kluße'],
    correct: 1,
    explanation: 'Nach langem Vokal „Straße“ → ß.'
  },
  {
    id: 'dq14',
    subjectId: 'deutsch',
    topicIds: ['de_rechtschreibung'],
    category: 'Rechtschreibung',
    type: 'text',
    question: 'Erkläre kurz den Unterschied zwischen „dass“ und „das“ im Deutschen.',
    answer: '„dass“ ist eine Konjunktion (Einleitung Nebensatz). „das“ ist ein Artikel, Pronomen oder Relativpronomen.',
    keywords: ['dass', 'Konjunktion', 'das', 'Artikel', 'Pronomen']
  },
  {
    id: 'dq15',
    subjectId: 'deutsch',
    topicIds: ['de_rechtschreibung'],
    category: 'Rechtschreibung',
    type: 'mc',
    question: 'Welches Wort enthält die „ie‑Regel“?',
    options: ['Biene', 'Mitte', 'Liebe', 'Sieben'],
    correct: 2,
    explanation: 'Nach kurzem betonten Vokal folgt „ie“ – „Liebe“.'
  },
  {
    id: 'dq16',
    subjectId: 'deutsch',
    topicIds: ['de_rechtschreibung'],
    category: 'Rechtschreibung',
    type: 'order',
    question: 'Ordne die folgenden Wörter nach ihrer richtigen Schreibweise (falsch → richtig).',
    items: ['Strasse → Straße', 'Masse → Masse', 'Buße → Buße', 'Kluß → Kluß']
  },

  // ----- ggf. weitere Themen (z. B. Textanalyse) -----------------------
  // Hier kannst du beliebig weitere Themen ergänzen, das Muster ist identisch.
];