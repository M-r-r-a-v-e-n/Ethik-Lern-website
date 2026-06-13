// ======================================================
// ENGLISH – Topics + Questions
// ======================================================

export const ENGLISH_TOPICS = [
  // ----- 1. Tenses ----------------------------------------------------
  {
    id: 'en_tenses',
    subjectId: 'english',
    category: 'Tenses',
    title: 'Verb Tenses',
    subtitle: 'Past Simple, Present Perfect, etc.',
    icon: '⏳',
    duration: '8 min',
    intro: 'Übersicht über die wichtigsten englischen Zeitformen.',
    details: `Past Simple – abgeschlossene Handlung mit Zeitpunkt.  
Present Perfect – Erfahrung/Handlung mit Bezug zur Gegenwart.  
Future – “will” / “going to”.`,
    keyConcepts: [
      { term: 'Past Simple', definition: 'used for finished actions with a specific past time marker.' },
      { term: 'Present Perfect', definition: 'used for experiences, recent events, or states that connect past to present.' },
      { term: 'Future Simple', definition: 'will + infinitive for predictions, decisions.' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleTenses'
  },

  // ----- 2. Modal Verbs ------------------------------------------------
  {
    id: 'en_modal',
    subjectId: 'english',
    category: 'Modal Verbs',
    title: 'Modal Verbs',
    subtitle: 'Can, Should, Must, Might …',
    icon: '🛠️',
    duration: '6 min',
    intro: 'Bedeutungen und Gebrauch von Modalverben.',
    details: `must – strong obligation / deduction  
should – advice  
might – possibility  
can – ability / permission`,
    keyConcepts: [
      { term: 'must', definition: 'strong obligation or logical deduction.' },
      { term: 'should', definition: 'advice, recommendation.' },
      { term: 'might', definition: 'possibility.' },
      { term: 'can', definition: 'ability or permission.' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleModal'
  },

  // ----- 3. Conditional Sentences --------------------------------------
  {
    id: 'en_conditionals',
    subjectId: 'english',
    category: 'Conditionals',
    title: 'Conditional Sentences',
    subtitle: 'Zero, First, Second, Third, Mixed',
    icon: '⚡',
    duration: '10 min',
    intro: 'Wie man reale und irreale Bedingungen formuliert.',
    details: `Zero – If + present, present (general truths).  
First – If + present, will + infinitive (real future).  
Second – If + past simple, would + infinitive (unreal present).  
Third – If + past perfect, would have + past participle (unreal past).  
Mixed – Kombinationen, z. B. past perfect + would + infinitive.`,
    keyConcepts: [
      { term: 'Zero Conditional', definition: 'If + present, present – general truth.' },
      { term: 'First Conditional', definition: 'If + present, will + infinitive – real future.' },
      { term: 'Second Conditional', definition: 'If + past simple, would + infinitive – unreal present.' },
      { term: 'Third Conditional', definition: 'If + past perfect, would have + past participle – unreal past.' },
      { term: 'Mixed Conditional', definition: 'Kombiniert Zeitformen verschiedener Bedingungen.' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=exampleCond'
  }
];

// ----------------------------------------------------------------------
// Fragen zu den englischen Themen
// ----------------------------------------------------------------------
export const ENGLISH_QUESTIONS = [

  // ----- Tenses --------------------------------------------------------
  {
    id: 'eq01',
    subjectId: 'english',
    topicIds: ['en_tenses'],
    category: 'Tenses',
    type: 'text',
    question: 'Explain the difference between Past Simple and Present Perfect. Give two examples each.',
    answer: 'Past Simple: used for finished actions with a specific time reference (I went to Paris last year. She called me yesterday.). Present Perfect: used for experiences, recent events, or states that connect past to present (I have been to Paris. She has called – we can still hear the phone).',
    keywords: ['past simple', 'time reference', 'present perfect', 'experience', 'finished']
  },
  {
    id: 'eq02',
    subjectId: 'english',
    topicIds: ['en_tenses'],
    category: 'Tenses',
    type: 'mc',
    question: 'Fill in: "By the time he arrived, she _______ already left."',
    options: ['had', 'has', 'was', 'will have'],
    correct: 0,
    explanation: '"Had" + Past Participle bildet Past Perfect, das in dieser Zeitstruktur nötig ist.'
  },
  {
    id: 'eq03',
    subjectId: 'english',
    topicIds: ['en_tenses'],
    category: 'Tenses',
    type: 'order',
    question: 'Arrange the sentences in chronological order (earliest → latest).',
    items: [
      'I have lived in Berlin for three years.',
      'I moved to Berlin last year.',
      'I will move to Berlin next month.'
    ]
  },
  {
    id: 'eq04',
    subjectId: 'english',
    topicIds: ['en_tenses'],
    category: 'Tenses',
    type: 'text',
    question: 'Report these time expressions: today, yesterday, tomorrow, now, here.',
    answer: 'today → that day. yesterday → the day before / the previous day. tomorrow → the next day / the following day. now → then. here → there.',
    keywords: ['that day', 'day before', 'next day', 'then', 'there']
  },

  // ----- Modal Verbs ----------------------------------------------------
  {
    id: 'eq05',
    subjectId: 'english',
    topicIds: ['en_modal'],
    category: 'Modal Verbs',
    type: 'mc',
    question: 'Which sentence expresses obligation/necessity?',
    options: [
      'You might come.',
      'You should come.',
      'You must come.',
      'You would come.'
    ],
    correct: 2,
    explanation: '"must" expresses strong obligation or logical deduction. "should" is advice. "might" is possibility. "would" is conditional.'
  },
  {
    id: 'eq06',
    subjectId: 'english',
    topicIds: ['en_modal'],
    category: 'Modal Verbs',
    type: 'match',
    question: 'Match modal verbs to their function.',
    pairs: [
      ['must', 'obligation / strong deduction'],
      ['should', 'advice / recommendation'],
      ['might', 'possibility'],
      ['can', 'ability / permission']
    ]
  },
  {
    id: 'eq07',
    subjectId: 'english',
    topicIds: ['en_modal'],
    category: 'Modal Verbs',
    type: 'text',
    question: 'Create a sentence using “should” to give advice about studying.',
    answer: 'You should review your notes every evening.',
    keywords: ['should', 'advice', 'study']
  },
  {
    id: 'eq08',
    subjectId: 'english',
    topicIds: ['en_modal'],
    category: 'Modal Verbs',
    type: 'order',
    question: 'Arrange the modal verbs from strongest obligation to weakest possibility.',
    items: ['must', 'should', 'can', 'might']
  },

  // ----- Conditionals ----------------------------------------------------
  {
    id: 'eq09',
    subjectId: 'english',
    topicIds: ['en_conditionals'],
    category: 'Conditionals',
    type: 'mc',
    question: 'Which conditional is used for unreal situations in the present?',
    options: [
      'Zero Conditional',
      'First Conditional',
      'Second Conditional',
      'Third Conditional'
    ],
    correct: 2,
    explanation: 'Second Conditional = unreal present/future (If I had money, I would travel).'
  },
  {
    id: 'eq10',
    subjectId: 'english',
    topicIds: ['en_conditionals'],
    category: 'Conditionals',
    type: 'match',
    question: 'Match the example sentence to the correct conditional type.',
    pairs: [
      ['If you heat water to 100°C, it boils.', 'Zero Conditional'],
      ['If it rains, I will take an umbrella.', 'First Conditional'],
      ['If I had a million euros, I would travel the world.', 'Second Conditional'],
      ['If she had studied harder, she would have passed.', 'Third Conditional']
    ]
  },
  {
    id: 'eq11',
    subjectId: 'english',
    topicIds: ['en_conditionals'],
    category: 'Conditionals',
    type: 'order',
    question: 'Arrange the conditionals from most likely to least likely.',
    items: ['Zero Conditional', 'First Conditional', 'Second Conditional', 'Third Conditional']
  },
  {
    id: 'eq12',
    subjectId: 'english',
    topicIds: ['en_conditionals'],
    category: 'Conditionals',
    type: 'text',
    question: 'Write a mixed conditional sentence that combines a past condition with a present result.',
    answer: 'If I had taken that course, I would speak German fluently now.',
    keywords: ['mixed', 'past condition', 'present result']
  }
];
// ── Additional Grammar Topics ────────────────────────

const ENGLISH_EXTRA_TOPICS = [
  {
    id: 'en_passive',
    subjectId: 'english',
    category: 'Grammar',
    title: 'Passive Voice',
    subtitle: 'Active vs. Passive – wann und wie',
    icon: '🔄',
    duration: '7 min',
    intro: 'Das Passiv verschiebt den Fokus von der handelnden Person auf die Handlung oder das Objekt.',
    details: `**Bildung:**
Active: Subject + verb + object
→ "The chef **cooked** the meal."
Passive: Object + to be + past participle (+ by + agent)
→ "The meal **was cooked** (by the chef)."

**Passive in verschiedenen Zeitformen:**
| Zeitform | Bildung | Beispiel |
|---|---|---|
| Present Simple | am/is/are + pp | "It is made in Germany." |
| Past Simple | was/were + pp | "It was built in 1900." |
| Present Perfect | has/have been + pp | "It has been repaired." |
| Future | will be + pp | "It will be fixed tomorrow." |
| Modal | can/must/should be + pp | "It should be done now." |

**Wann Passiv?**
- Wenn die handelnde Person unwichtig oder unbekannt ist
- In wissenschaftlichen/formellen Texten
- Um Objektivität zu betonen

**Wichtige Signalwörter:**
was/were built, is known, has been found, will be announced`,
    keyConcepts: [
      { term: 'Passive Voice', definition: 'Form where the subject receives the action: "The book was written."' },
      { term: 'Past Participle', definition: 'Form of verb used in passive: written, broken, made, given.' },
      { term: 'Agent', definition: 'The doer of the action in a passive sentence, introduced by "by".' },
      { term: 'Active Voice', definition: 'Normal form where the subject does the action: "She wrote the book."' },
    ],
  },
  {
    id: 'en_reported_speech',
    subjectId: 'english',
    category: 'Grammar',
    title: 'Reported Speech',
    subtitle: 'Indirekte Rede auf Englisch',
    icon: '💬',
    duration: '8 min',
    intro: 'Reported Speech = indirekte Rede. Man berichtet was jemand gesagt hat, ohne direkt zu zitieren.',
    details: `**Grundregel: Backshift (Zeitverschiebung)**
Wenn das Berichtsverb in der Vergangenheit steht, verschiebt sich die Zeitform um eine Stufe zurück.

| Direct Speech | Reported Speech |
|---|---|
| "I **am** tired." | He said he **was** tired. |
| "I **like** it." | She said she **liked** it. |
| "I **have seen** it." | He said he **had seen** it. |
| "I **will come**." | She said she **would come**. |
| "I **can** help." | He said he **could** help. |

**Änderung von Pronomen und Ortsangaben:**
- I → he/she
- we → they  
- here → there
- now → then
- today → that day
- tomorrow → the next day
- yesterday → the day before

**Beispiele:**
Direct: "I will meet you here tomorrow."
Reported: She said she would meet me there the next day.

**Reporting Verbs (nicht nur "said"):**
told, asked, explained, promised, warned, suggested, denied, admitted`,
    keyConcepts: [
      { term: 'Reported Speech', definition: 'Reporting what someone said without quoting them directly.' },
      { term: 'Backshift', definition: 'Tense moves back one step in reported speech (present → past).' },
      { term: 'Reporting Verb', definition: 'The verb used to introduce reported speech: said, told, asked, etc.' },
    ],
  },
  {
    id: 'en_relative_clauses',
    subjectId: 'english',
    category: 'Grammar',
    title: 'Relative Clauses',
    subtitle: 'Defining & Non-defining',
    icon: '🔗',
    duration: '7 min',
    intro: 'Relativsätze geben zusätzliche Informationen über ein Nomen.',
    details: `**Relative Pronouns:**
- **who** – for people: "The man **who** called you…"
- **which** – for things: "The book **which** I read…"
- **that** – for people or things (only in defining): "The car **that** broke down…"
- **whose** – for possession: "The student **whose** bag was stolen…"
- **where** – for places: "The city **where** I grew up…"
- **when** – for time: "The day **when** it happened…"

**Defining (bestimmend):**
Identifies which person/thing is meant. No commas.
→ "The student **who studies hard** will pass." (which student? the one who studies hard)

**Non-defining (nicht bestimmend):**
Adds extra info that could be left out. Uses commas.
→ "My brother, **who lives in Munich**, is a doctor."
(We already know which brother – there's only one)

⚠️ **"That" is NOT used in non-defining clauses!**
❌ "My car, that is red, was stolen."
✓ "My car, which is red, was stolen."`,
    keyConcepts: [
      { term: 'Defining Relative Clause', definition: 'Identifies which noun is meant. No commas. Can use that/who/which.' },
      { term: 'Non-defining Relative Clause', definition: 'Adds extra information. Uses commas. "That" not allowed.' },
      { term: 'Relative Pronoun', definition: 'who, which, that, whose, where, when – introduce relative clauses.' },
    ],
  },
  {
    id: 'en_articles',
    subjectId: 'english',
    category: 'Grammar',
    title: 'Articles: a, an, the',
    subtitle: 'Bestimmter und unbestimmter Artikel',
    icon: '📝',
    duration: '6 min',
    intro: 'Artikel sind im Englischen eine der häufigsten Fehlerquellen für Deutsche.',
    details: `**a / an (unbestimmt) – wenn:**
- das Nomen zum ersten Mal erwähnt wird: "I saw **a** dog."
- bei Berufsbezeichnungen: "She is **a** doctor."
- mit Singular Zählnomen ohne spezifischen Bezug
- **a** vor Konsonanten: a cat, a book, a university (u = /juː/)
- **an** vor Vokallauten: an apple, an hour (h ist stumm!), an umbrella

**the (bestimmt) – wenn:**
- das Nomen schon bekannt/erwähnt ist: "I saw a dog. **The** dog was big."
- es nur eine Sache gibt: **the** sun, **the** moon, **the** internet
- mit Superlativ: "**the** best film"
- mit Ordinalzahlen: "**the** first time"
- bei Flüssen, Gebirgen (Plural): **the** Rhine, **the** Alps

**Kein Artikel – wenn:**
- Allgemeine Aussagen über Plural/Uncountable: "**Dogs** are friendly." / "**Water** is important."
- Namen: "**Germany** is…", "**London** is…"
- Mahlzeiten: "**Breakfast** is ready."
- Sprachen: "She speaks **German**."`,
    keyConcepts: [
      { term: 'Indefinite Article (a/an)', definition: 'Used for first mention or non-specific nouns. a before consonants, an before vowel sounds.' },
      { term: 'Definite Article (the)', definition: 'Used for known, specific, or unique nouns.' },
      { term: 'Zero Article', definition: 'No article with plural generalisations, names, languages, meals.' },
    ],
  },
  {
    id: 'en_writing_essays',
    subjectId: 'english',
    category: 'Writing Skills',
    title: 'Essay Writing',
    subtitle: 'Aufbau, Phrasen, Argumentation',
    icon: '✍️',
    duration: '10 min',
    intro: 'Ein guter englischer Aufsatz hat klare Struktur, starke Argumente und passende akademische Sprache.',
    details: `**Essay-Aufbau (5-Paragraph-Struktur):**

**1. Introduction**
- Hook (Aufmerksamkeit wecken)
- Background information
- Thesis statement (deine Hauptthese – klar und präzise)

**2.-4. Body Paragraphs (je 1 Hauptidee)**
- Topic sentence (Hauptpunkt des Absatzes)
- Evidence / example
- Analysis (Warum ist das wichtig?)
- Linking sentence (zum nächsten Absatz)

**5. Conclusion**
- Restate thesis (anders formuliert)
- Summary of main points
- Final thought / call to action

**Nützliche Phrasen:**

*Introduction:*
"In today's society, …"
"It is often argued that …"
"This essay will examine …"

*Arguments:*
"First and foremost, …"
"Furthermore, it should be noted that …"
"On the other hand, …"
"Despite this, …"

*Conclusion:*
"In conclusion, …"
"To sum up, …"
"All things considered, …"

**Typische Connectives:**
however, moreover, therefore, consequently, in addition, nevertheless, in contrast, as a result`,
    keyConcepts: [
      { term: 'Thesis Statement', definition: 'One clear sentence that states the main argument of the essay.' },
      { term: 'Topic Sentence', definition: 'The first sentence of a paragraph stating its main point.' },
      { term: 'Connectives', definition: 'Linking words that connect ideas: however, therefore, furthermore.' },
      { term: 'Hook', definition: 'Opening sentence designed to catch the reader\'s attention.' },
    ],
  },
];

// ── Questions for extra topics ─────────────────────────

const ENGLISH_EXTRA_QUESTIONS = [
  {
    id: 'enx_01',
    subjectId: 'english',
    topicIds: ['en_passive'],
    category: 'Grammar',
    type: 'mc',
    question: 'Which sentence is in the passive voice?',
    options: [
      'She wrote the letter.',
      'The letter was written by her.',
      'She has written the letter.',
      'She writes the letter.',
    ],
    correct: 1,
    explanation: 'Passive: object + was/were + past participle. "The letter was written" = passive.',
  },
  {
    id: 'enx_02',
    subjectId: 'english',
    topicIds: ['en_passive'],
    category: 'Grammar',
    type: 'text',
    question: 'Rewrite in passive: "The teacher corrects the test every week."',
    answer: 'The test is corrected by the teacher every week.',
    keywords: ['test', 'corrected', 'teacher', 'every week'],
    explanation: 'Present Simple Passive: subject + am/is/are + past participle.',
  },
  {
    id: 'enx_03',
    subjectId: 'english',
    topicIds: ['en_passive'],
    category: 'Grammar',
    type: 'mc',
    question: 'Which passive form is correct for future tense?',
    options: ['will corrected', 'will be corrected', 'is corrected', 'has been corrected'],
    correct: 1,
    explanation: 'Future passive: will + be + past participle → "will be corrected".',
  },
  {
    id: 'enx_04',
    subjectId: 'english',
    topicIds: ['en_reported_speech'],
    category: 'Grammar',
    type: 'mc',
    question: 'Direct: "I am happy." → Reported: She said she ___.',
    options: ['is happy', 'was happy', 'were happy', 'has been happy'],
    correct: 1,
    explanation: 'Backshift: present simple → past simple. "am" becomes "was".',
  },
  {
    id: 'enx_05',
    subjectId: 'english',
    topicIds: ['en_reported_speech'],
    category: 'Grammar',
    type: 'mc',
    question: 'Direct: "I will come tomorrow." → Reported: He said he ___ come ___ next day.',
    options: ['will / the', 'would / the', 'will / a', 'would / a'],
    correct: 1,
    explanation: 'Backshift: "will" → "would". "tomorrow" → "the next day".',
  },
  {
    id: 'enx_06',
    subjectId: 'english',
    topicIds: ['en_reported_speech'],
    category: 'Grammar',
    type: 'text',
    question: 'Report this sentence: Tom said: "I have finished my homework."',
    answer: 'Tom said he had finished his homework.',
    keywords: ['said', 'had finished', 'homework'],
    explanation: 'Backshift: present perfect → past perfect. "have finished" → "had finished". "I" → "he".',
  },
  {
    id: 'enx_07',
    subjectId: 'english',
    topicIds: ['en_relative_clauses'],
    category: 'Grammar',
    type: 'mc',
    question: 'Choose the correct relative pronoun: "The woman ___ called was my teacher."',
    options: ['which', 'who', 'whose', 'where'],
    correct: 1,
    explanation: '"who" for people. "The woman who called" = defining relative clause.',
  },
  {
    id: 'enx_08',
    subjectId: 'english',
    topicIds: ['en_relative_clauses'],
    category: 'Grammar',
    type: 'mc',
    question: 'Which sentence uses a non-defining relative clause correctly?',
    options: [
      'The car that is red was stolen.',
      'My sister, who lives in Berlin, is a nurse.',
      'The book which I read was great.',
      'That is the house that I grew up in.',
    ],
    correct: 1,
    explanation: 'Non-defining: commas around the clause, extra info. "My sister, who lives in Berlin…" – we already know which sister.',
  },
  {
    id: 'enx_09',
    subjectId: 'english',
    topicIds: ['en_articles'],
    category: 'Grammar',
    type: 'mc',
    question: 'Fill in the article: "She is ___ engineer."',
    options: ['the', 'a', 'an', 'no article'],
    correct: 2,
    explanation: '"an" before vowel sounds. "engineer" starts with the vowel sound /ɛ/, so "an engineer".',
  },
  {
    id: 'enx_10',
    subjectId: 'english',
    topicIds: ['en_articles'],
    category: 'Grammar',
    type: 'mc',
    question: 'Fill in: "___ sun rises in the east."',
    options: ['A', 'An', 'The', 'no article'],
    correct: 2,
    explanation: '"The" because there is only one sun – unique things take "the".',
  },
  {
    id: 'enx_11',
    subjectId: 'english',
    topicIds: ['en_articles'],
    category: 'Grammar',
    type: 'mc',
    question: 'Which sentence uses articles correctly?',
    options: [
      'She speaks the German.',
      'A water is important.',
      'I had a breakfast this morning.',
      'I saw a dog. The dog was friendly.',
    ],
    correct: 3,
    explanation: 'First mention: "a dog" (unspecific). Second mention: "the dog" (now known). Languages, water (uncountable), meals take no article.',
  },
  {
    id: 'enx_12',
    subjectId: 'english',
    topicIds: ['en_writing_essays'],
    category: 'Writing Skills',
    type: 'mc',
    question: 'What is a "thesis statement" in an essay?',
    options: [
      'The last sentence of the essay',
      'A sentence that introduces a new paragraph',
      'One clear sentence in the introduction stating the main argument',
      'A list of evidence and examples',
    ],
    correct: 2,
    explanation: 'The thesis statement = the main claim of the essay, placed at the end of the introduction.',
  },
  {
    id: 'enx_13',
    subjectId: 'english',
    topicIds: ['en_writing_essays'],
    category: 'Writing Skills',
    type: 'text',
    question: 'What are the five parts of a typical essay structure?',
    answer: 'Introduction, Body Paragraph 1, Body Paragraph 2, Body Paragraph 3, Conclusion. The introduction contains the thesis, the body paragraphs each develop one idea, and the conclusion summarises and restates the thesis.',
    keywords: ['introduction', 'body', 'conclusion', 'thesis', 'paragraph'],
    explanation: 'Introduction → 3 Body Paragraphs (each one idea) → Conclusion.',
  },
  {
    id: 'enx_14',
    subjectId: 'english',
    topicIds: ['en_writing_essays'],
    category: 'Writing Skills',
    type: 'mc',
    question: 'Which connective is used to introduce a contrasting point?',
    options: ['furthermore', 'therefore', 'however', 'in addition'],
    correct: 2,
    explanation: '"However" = contrast. "Furthermore/In addition" = adding. "Therefore" = consequence.',
  },
];

// Append to exports
ENGLISH_TOPICS.push(...ENGLISH_EXTRA_TOPICS);
ENGLISH_QUESTIONS.push(...ENGLISH_EXTRA_QUESTIONS);
