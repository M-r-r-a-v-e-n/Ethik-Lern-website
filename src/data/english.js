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