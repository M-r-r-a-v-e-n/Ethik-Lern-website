export const ETHIK_EXTENDED_TOPICS = [

  {
    id: 'eth_grundbegriffe',
    subjectId: 'ethik',
    category: 'A. Grundlagen',
    title: 'Grundbegriffe der Ethik',
    subtitle: 'Moral, Werte, Normen, Prinzipien',
    icon: '🔑',
    duration: '7 min',
    intro: 'Bevor wir über Ethik diskutieren können, müssen wir die grundlegenden Begriffe kennen: Was ist Moral? Was ist der Unterschied zwischen Werten und Normen?',
    keyConcepts: [
      { term: 'Werte', definition: 'Ideale, die als erstrebenswert gelten: Freiheit, Gerechtigkeit, Würde.' },
      { term: 'Normen', definition: 'Aus Werten abgeleitete konkrete Verhaltensregeln.' }
    ]
  },

];


export const ETHIK_EXTENDED_QUESTIONS = [
  {
    id: 'etq1',
    subjectId: 'ethik',
    topicIds: ['eth_grundbegriffe'],
    category: 'Grundlagen',
    type: 'mc',
    question: 'Was ist der Unterschied zwischen Ethik und Moral?',
    options: [
      'Kein Unterschied – beide Begriffe bedeuten das Gleiche.',
      'Moral: konkrete gesellschaftliche Regeln; Ethik: wissenschaftliche Reflexion darüber.',
      'Ethik gilt nur in der Schule, Moral im Alltag.',
      'Moral ist wissenschaftlich, Ethik ist gefühlsmäßig.'
    ],
    correct: 1,
    explanation: 'Moral = gelebte Verhaltensregeln. Ethik = Philosophie, die über Moral nachdenkt und begründet, was richtig oder falsch ist.'
  },
  {
    id: 'etq2',
    subjectId: 'ethik',
    topicIds: ['eth_grundbegriffe'],
    category: 'Grundlagen',
    type: 'text',
    question: 'Erkläre den Unterschied zwischen Werten und Normen mit je einem Beispiel.',
    answer:
      'Werte sind abstrakte Ideale, die als wichtig erachtet werden (Ehrlichkeit, Freiheit, Gerechtigkeit). Normen sind konkrete Verhaltensregeln, die aus Werten abgeleitet werden (Lüge nicht = Norm, abgeleitet vom Wert Ehrlichkeit; Diskriminiere niemanden = Norm, abgeleitet vom Wert Gleichheit).',
    keywords: ['Werte', 'Normen', 'Beispiel']
  },

  {
    id: 'etq03',
    subjectId: 'ethik',
    topicIds: ['eth_datenschutz'],
    category: 'Datenschutz',
    type: 'match',
    question: 'Ordne das Recht der passenden Erklärung zu.',
    pairs: [
      [
        'Recht auf Auskunft',
        'Betroffene können wissen, welche Daten verarbeitet werden.'
      ],
      [
        'Recht auf Löschung',
        'Daten dürfen auf Wunsch gelöscht werden („Right to be forgotten“).'
      ],
      [
        'Recht auf Daten‑Portabilität',
        'Daten können in ein anderes System übertragen werden.'
      ]
    ]
  },
  {
    id: 'etq04',
    subjectId: 'ethik',
    topicIds: ['eth_datenschutz'],
    category: 'Datenschutz',
    type: 'order',
    question:
      'Stelle die Schritte eines sinnvollen Datenschutz‑Management‑Systems in die richtige Reihenfolge.',
    items: [
      'Risikoanalyse',
      'Datenschutz‑by‑Design implementieren',
      'Mitarbeiter schulen',
      'Verstoß melden',
      'Regelmäßige Audits durchführen'
    ]
  },

  // -------------------------------------------------
  // 2️⃣ Cyber‑Mobbing
  // -------------------------------------------------
  {
    id: 'etq05',
    subjectId: 'ethik',
    topicIds: ['eth_cybermobbing'],
    category: 'Cyber‑Mobbing',
    type: 'mc',
    question:
      'Welches Beispiel ist KEIN typisches Merkmal von Cyber‑Mobbing?',
    options: [
      'Ständige Beleidigungen via Chat',
      'Einmaliges kritisches Feedback in einer Klassenarbeit',
      'Veröffentlichung peinlicher Bilder ohne Erlaubnis',
      'Aufstellung einer Hasskampagne in sozialen Medien'
    ],
    correct: 1,
    explanation:
      'Kritisches Feedback ist Teil der Leistungsbewertung, nicht von Mobbing.'
  },
  {
    id: 'etq06',
    subjectId: 'ethik',
    topicIds: ['eth_cybermobbing'],
    category: 'Cyber‑Mobbing',
    type: 'text',
    question:
      'Nenne drei mögliche Hilfsangebote für Opfer von Cyber‑Mobbing.',
    answer:
      'klicksafe.de, schulische Vertrauenslehrer·in, Beratungsstellen wie die Nummer 0800‑111‑0 111.',
    keywords: ['klicksafe', 'Vertrauenslehrer', 'Beratungsstelle']
  },
  {
    id: 'etq07',
    subjectId: 'ethik',
    topicIds: ['eth_cybermobbing'],
    category: 'Cyber‑Mobbing',
    type: 'match',
    question:
      'Ordne die Rechtsgrundlage dem jeweiligen Delikt zu.',
    pairs: [
      ['§ 185 StGB', 'Beleidigung'],
      ['§ 186 StGB', 'Üble Nachrede / Verleumdung']
    ]
  },
  {
    id: 'etq08',
    subjectId: 'ethik',
    topicIds: ['eth_cybermobbing'],
    category: 'Cyber‑Mobbing',
    type: 'order',
    question:
      'Welcher Schritt kommt zuerst, wenn du von Cyber‑Mobbing betroffen bist?',
    items: [
      'Beweise (Screenshots) sichern',
      'Lehrer·in oder Vertrauensperson informieren',
      'Polizei/Strafverfolgung einschalten',
      'Selbstschutz: Account‑Einstellungen ändern',
      'Psychologische Unterstützung suchen'
    ]
  },

  // -------------------------------------------------
  // 3️⃣ KI‑Ethik
  // -------------------------------------------------
  {
    id: 'etq09',
    subjectId: 'ethik',
    topicIds: ['eth_ki_ethik'],
    category: 'KI‑Ethik',
    type: 'mc',
    question: 'Was versteht man unter „Algorithmus‑Bias“?',
    options: [
      'Fehlerhafte Berechnungen aufgrund von Rechenfehlern',
      'Diskriminierung, weil Trainingsdaten Vorurteile enthalten',
      'Bewusste Manipulation von Nutzern durch Werbung',
      'Ein Problem, das nur bei sehr kleinen Datensätzen auftritt'
    ],
    correct: 1,
    explanation:
      'Bias entsteht, wenn die Daten bereits diskriminierende Muster enthalten.'
  },
  {
    id: 'etq10',
    subjectId: 'ethik',
    topicIds: ['eth_ki_ethik'],
    category: 'KI‑Ethik',
    type: 'text',
    question:
      'Welche drei Fragen sollten bei einem KI‑Entscheidungsprozess gestellt werden?',
    answer:
      '1) Wer ist von der Entscheidung betroffen? 2) Welche Daten werden verwendet und sind sie fehlerfrei? 3) Wie kann die Entscheidung nachvollzogen bzw. angefochten werden?',
    keywords: ['Betroffene', 'Datenqualität', 'Transparenz']
  },
  {
    id: 'etq11',
    subjectId: 'ethik',
    topicIds: ['eth_ki_ethik'],
    category: 'KI‑Ethik',
    type: 'match',
    question:
      'Ordne die Verantwortungsebene dem genannten Problem zu.',
    pairs: [
      ['Programmfehler', 'Entwickler*innen'],
      ['Fehlinterpretation von Ergebnissen', 'Anwender*innen'],
      ['Unfaire Entscheidung', 'Datenlieferant*innen']
    ]
  },
  {
    id: 'etq12',
    subjectId: 'ethik',
    topicIds: ['eth_ki_ethik'],
    category: 'KI‑Ethik',
    type: 'order',
    question:
      'Reihenfolge der Schritte zur Sicherstellung von KI‑Transparenz.',
    items: [
      'Dokumentation der Datenquellen',
      'Erklärung des Algorithmus‑Aufbaus',
      'Bereitstellung einer Nutzungs‑ und Erklärungsplattform',
      'Einrichtung einer Beschwerdestelle'
    ]
  },

  // -------------------------------------------------
  // 4️⃣ Medienkompetenz
  // -------------------------------------------------
  {
    id: 'etq13',
    subjectId: 'ethik',
    topicIds: ['eth_medienkompetenz'],
    category: 'Medienkompetenz',
    type: 'mc',
    question:
      'Welcher Hinweis ist ein Anzeichen für eine mögliche Filterblase?',
    options: [
      'Verschiedene Sichtweisen werden gleichwertig präsentiert.',
      'Nur Artikel, die die eigene Meinung bestätigen, erscheinen häufig.',
      'Die Seite zeigt Fact‑Checking‑Links zu allen Aussagen.',
      'Kommentare mit Gegenargumenten sind sichtbar.'
    ],
    correct: 1,
    explanation:
      'Eine Filterblase liefert überwiegend gleichgesinnte Inhalte.'
  },
  {
    id: 'etq14',
    subjectId: 'ethik',
    topicIds: ['eth_medienkompetenz'],
    category: 'Medienkompetenz',
    type: 'text',
    question:
      'Nenne drei Kriterien, die bei der Quellenkritik zu prüfen sind.',
    answer:
      'Autor·in, Veröffentlichungsdatum, Quellenlage/Referenzen, Zielgruppe und mögliche Interessenkonflikte.',
    keywords: ['Autor', 'Datum', 'Referenzen', 'Interessenkonflikt']
  },
  {
    id: 'etq15',
    subjectId: 'ethik',
    topicIds: ['eth_medienkompetenz'],
    category: 'Medienkompetenz',
    type: 'match',
    question:
      'Ordne die Maßnahme dem jeweiligen Risiko zu.',
    pairs: [
      [
        'Urheberrecht beachten',
        'Rechtliche Konsequenzen bei illegalen Downloads'
      ],
      ['Quellen prüfen', 'Fehlinformationen und Fake‑News']
    ]
  },
  {
    id: 'etq16',
    subjectId: 'ethik',
    topicIds: ['eth_medienkompetenz'],
    category: 'Medienkompetenz',
    type: 'order',
    question:
      'Reihenfolge, um einen verdächtigen Social‑Media‑Post zu überprüfen.',
    items: [
      'Autor und Quelle nachschlagen',
      'Datum und Kontext prüfen',
      'Fact‑Checking‑Websites konsultieren',
      'Kommentare und Gegenmeinungen lesen',
      'Eigene Meinung bilden'
    ]
  },

  // -------------------------------------------------
  // 5️⃣ Deontologie (Kant)
  // -------------------------------------------------
  {
    id: 'etq17',
    subjectId: 'ethik',
    topicIds: ['eth_deontologie'],
    category: 'Deontologie',
    type: 'mc',
    question:
      'Welcher Grundsatz gehört zur kantischen Deontologie?',
    options: [
      'Der größte Nutzen für die meisten Menschen',
      'Handle stets nach der Maxime, die du zum allgemeinen Gesetz machen könntest',
      'Handle nach deinen persönlichen Vorlieben',
      'Der Zweck rechtfertigt das Mittel'
    ],
    correct: 1,
    explanation: 'Das ist der Kategorische Imperativ.'
  },
  {
    id: 'etq18',
    subjectId: 'ethik',
    topicIds: ['eth_deontologie'],
    category: 'Deontologie',
    type: 'text',
    question:
      'Erkläre mit eigenen Worten, was „Menschen als Zweck, nicht bloßes Mittel“ bedeutet.',
    answer:
      'Jeder Mensch hat einen eigenen, unveräußerlichen Wert; man darf ihn nicht nur für eigene Ziele ausnutzen.',
    keywords: ['Wert', 'Ausnutzen', 'Zweck']
  },
  {
    id: 'etq19',
    subjectId: 'ethik',
    topicIds: ['eth_deontologie'],
    category: 'Deontologie',
    type: 'match',
    question:
      'Ordne das Beispiel dem passenden Prinzip zu.',
    pairs: [
      [
        'Lügen, um jemanden zu schützen',
        'Verstoß gegen den kategorischen Imperativ'
      ],
      [
        'Helfen, weil man den Menschen als Zweck sieht',
        'Erfüllung des Prinzip „Menschen als Zweck“'
      ]
    ]
  },
  {
    id: 'etq20',
    subjectId: 'ethik',
    topicIds: ['eth_deontologie'],
    category: 'Deontologie',
    type: 'order',
    question:
      'Reihenfolge der Überprüfung einer Handlung nach Kant.',
    items: [
      'Maxime formulieren',
      'Prüfen, ob sie als allgemeines Gesetz gelten kann',
      'Prüfen, ob die Handlung Menschen nur als Mittel nutzt',
      'Handlung ausführen, wenn beide Kriterien erfüllt sind'
    ]
  },

  // -------------------------------------------------
  // 6️⃣ Utilitarismus
  // -------------------------------------------------
  {
    id: 'etq21',
    subjectId: 'ethik',
    topicIds: ['eth_utilitarismus'],
    category: 'Utilitarismus',
    type: 'mc',
    question:
      'Welches Ziel verfolgt der klassische Utilitarismus?',
    options: [
      'Die Einhaltung von Pflichten',
      'Die Maximierung des Gesamtnutzens (Glück) für die Mehrheit',
      'Die Bewahrung von Traditionen',
      'Die Achtung individueller Rechte über das Gemeinwohl'
    ],
    correct: 1,
    explanation:
      'Utilitarismus misst moralische Richtigkeit am Gesamtnutzen.'
  },
  {
    id: 'etq22',
    subjectId: 'ethik',
    topicIds: ['eth_utilitarismus'],
    category: 'Utilitarismus',
    type: 'text',
    question:
      'Nenne ein typisches Problem des Utilitarismus (z. B. Gerechtigkeitskonflikt).',
    answer:
      'Er kann Minderheiten benachteiligen, wenn deren Leiden dem größeren Glück der Mehrheit geopfert werden.',
    keywords: ['Minderheit', 'Gerechtigkeit', 'Opfer']
  },
  {
    id: 'etq23',
    subjectId: 'ethik',
    topicIds: ['eth_utilitarismus'],
    category: 'Utilitarismus',
    type: 'match',
    question:
      'Ordne die Vertreter den jeweiligen Werken zu.',
    pairs: [
      ['Jeremy Bentham', 'Principles of Legislation'],
      ['John Stuart Mill', 'Utilitarianism']
    ]
  },
  {
    id: 'etq24',
    subjectId: 'ethik',
    topicIds: ['eth_utilitarismus'],
    category: 'Utilitarismus',
    type: 'order',
    question:
      'Welche Schritte gehören zur Nutzen‑Abschätzung einer Handlung?',
    items: [
      'Betroffene Gruppen bestimmen',
      'Positive und negative Konsequenzen auflisten',
      'Wahrscheinlichkeit jedes Ereignisses bewerten',
      'Gesamtnutzen (Summe) berechnen',
      'Entscheidung treffen, wenn Nutzen > Schaden'
    ]
  },

  // -------------------------------------------------
  // 7️⃣ Tugendethik (Aristoteles)
  // -------------------------------------------------
  {
    id: 'etq25',
    subjectId: 'ethik',
    topicIds: ['eth_tugendethik'],
    category: 'Tugendethik',
    type: 'mc',
    question:
      'Was ist das zentrale Ziel der aristotelischen Tugendethik?',
    options: [
      'Regeln befolgen, egal was sie kosten',
      'Das größtmögliche Glück für die Mehrheit zu erzeugen',
      'Eudaimonia – das erfüllte, glückliche Leben durch Tugend',
      'Den eigenen Willen immer durchsetzen'
    ],
    correct: 2,
    explanation:
      'Aristoteles strebt nach dem guten Leben (Eudaimonia) durch tugendhaftes Handeln.'
  },
  {
    id: 'etq26',
    subjectId: 'ethik',
    topicIds: ['eth_tugendethik'],
    category: 'Tugendethik',
    type: 'text',
    question:
      'Nenne zwei Beispiele für aristotelische Tugenden und beschreibe kurz, warum sie wichtig sind.',
    answer:
      'Tapferkeit (mutig handeln trotz Gefahr) und Gerechtigkeit (fair mit anderen umgehen). Beide fördern das gesellschaftliche Zusammenleben und das persönliche Glück.',
    keywords: ['Tapferkeit', 'Gerechtigkeit', 'fair']
  },
  {
    id: 'etq27',
    subjectId: 'ethik',
    topicIds: ['eth_tugendethik'],
    category: 'Tugendethik',
    type: 'match',
    question:
      'Ordne die Tugend ihrer Definition zu.',
    pairs: [
      [
        'Besonnenheit',
        'Richtige Mitte zwischen Übermaß und Mangel'
      ],
      ['Weisheit', 'Fähigkeit, richtig zu urteilen und zu handeln']
    ]
  },
  {
    id: 'etq28',
    subjectId: 'ethik',
    topicIds: ['eth_tugendethik'],
    category: 'Tugendethik',
    type: 'order',
    question:
      'Reihenfolge, wie man laut Aristoteles eine Tugend entwickelt.',
    items: [
      'Praxis (Übung) beginnen',
      'Reflexion und Feedback erhalten',
      'Gewohnheit stabilisieren',
      'Tugend wird zur inneren Haltung'
    ]
  },

  // -------------------------------------------------
  // 8️⃣ Vertragstheorie
  // -------------------------------------------------
  {
    id: 'etq29',
    subjectId: 'ethik',
    topicIds: ['eth_vertragstheorie'],
    category: 'Vertragstheorie',
    type: 'mc',
    question:
      'Was beschreibt Rawls’ „Schleier des Unwissens“?',
    options: [
      'Eine Methode, um persönliche Vorteile zu maximieren',
      'Ein Gedankenspiel, bei dem man Gesellschaftsregeln ohne Kenntnis der eigenen Position wählt',
      'Ein Konzept, das besagt, dass jede Person immer ihr eigenes Interesse verfolgt',
      'Eine Technik, um juristische Verträge zu verschleiern'
    ],
    correct: 1,
    explanation:
      'Der Schleier des Unwissens verhindert Eigennutz bei der Gerechtigkeitswahl.'
  },
  {
    id: 'etq30',
    subjectId: 'ethik',
    topicIds: ['eth_vertragstheorie'],
    category: 'Vertragstheorie',
    type: 'text',
    question:
      'Nenne einen Unterschied zwischen Rousseaus und Rawls’ Vertragstheorie.',
    answer:
      'Rousseau betont den Gesellschaftsvertrag als Ursprung legitimer politischer Autorität, Rawls fokussiert auf Gerechtigkeitsprinzipien, die hinter einem hypothetischen „Urzustand“ gewählt werden.',
    keywords: ['Rousseau', 'Rawls', 'Gesellschaftsvertrag', 'Gerechtigkeit']
  },
  {
    id: 'etq31',
    subjectId: 'ethik',
    topicIds: ['eth_vertragstheorie'],
    category: 'Vertragstheorie',
    type: 'match',
    question:
      'Ordne die Theorie ihrem Begründer zu.',
    pairs: [
      ['Gesellschaftsvertrag', 'Rousseau'],
      ['Schleier des Unwissens', 'Rawls']
    ]
  },
  {
    id: 'etq32',
    subjectId: 'ethik',
    topicIds: ['eth_vertragstheorie'],
    category: 'Vertragstheorie',
    type: 'order',
    question:
      'Ablauf der Rawls’schen Gerechtigkeitswahl (vereinfacht).',
    items: [
      'Urzustand vorstellen',
      'Schleier des Unwissens anlegen',
      'Prinzipien des Gleichheits- und Differenzprinzips wählen',
      'Gesetzliche Grundsätze ableiten'
    ]
  },

  // -------------------------------------------------
  // 9️⃣ Organspende
  // -------------------------------------------------
  {
    id: 'etq33',
    subjectId: 'ethik',
    topicIds: ['eth_organspende'],
    category: 'Organspende',
    type: 'mc',
    question:
      'Welche Aussage zur Organspende in Deutschland ist korrekt?',
    options: [
      'Alle Menschen gelten automatisch als Organspender.',
      'Die erweiterte Zustimmungslösung gilt seit 2020.',
      'Organspenden sind in Deutschland verboten.',
      'Nur Verwandte dürfen Organe spenden.'
    ],
    correct: 1,
    explanation:
      'Seit 2020 gilt die erweiterte Zustimmungslösung – vorherige Zustimmung ist nötig, danach kann angenommen werden, dass die Person einverstanden wäre.'
  },
  {
    id: 'etq34',
    subjectId: 'ethik',
    topicIds: ['eth_organspende'],
    category: 'Organspende',
    type: 'text',
    question:
      'Erkläre die ethische Spannung zwischen „Leben retten“ und „Würde des Körpers“.',
    answer:
      'Das Retten von Leben wird als wichtige Pflicht gesehen, während die körperliche Unversehrtheit und Selbstbestimmung des Spenders respektiert werden muss.',
    keywords: ['Leben retten', 'Würde', 'Selbstbestimmung']
  },
  {
    id: 'etq35',
    subjectId: 'ethik',
    topicIds: ['eth_organspende'],
    category: 'Organspende',
    type: 'match',
    question:
      'Ordne Pro‑Argumente den jeweiligen ethischen Prinzipien zu.',
    pairs: [
      ['Solidarität', 'Rettung von Menschenleben'],
      ['Respekt vor Autonomie', 'Zustimmung des Spenders']
    ]
  },
  {
    id: 'etq36',
    subjectId: 'ethik',
    topicIds: ['eth_organspende'],
    category: 'Organspende',
    type: 'order',
    question:
      'Reihenfolge, wie eine Organspende in Deutschland abläuft.',
    items: [
      'Entscheidung des Spenders im Voraus festhalten',
      'Diagnose des Hirn‑ oder Herzstillstands',
      'Einverständnis bestätigen (nach Zustimmungslösung)',
      'Organentnahme durch Ärzt*innen',
      'Transplantation beim Empfänger'
    ]
  },

  // -------------------------------------------------
  // 🔟 Gentechnik / CRISPR
  // -------------------------------------------------
  {
    id: 'etq37',
    subjectId: 'ethik',
    topicIds: ['eth_gentechnik'],
    category: 'Gentechnik',
    type: 'mc',
    question:
      'Welcher Aspekt ist KEIN typisches ethisches Problem der Gentechnik?',
    options: [
      'Designer‑Babys',
      'Erhöhte Biodiversität durch neue Arten',
      'Ungleiche Zugänge zu Therapien',
      'Unbekannte Langzeitfolgen'
    ],
    correct: 1,
    explanation:
      'Erhöhte Biodiversität kann positiv sein; die anderen Punkte sind klassische ethische Bedenken.'
  },
  {
    id: 'etq38',
    subjectId: 'ethik',
    topicIds: ['eth_gentechnik'],
    category: 'Gentechnik',
    type: 'text',
    question:
      'Beschreibe kurz den Unterschied zwischen therapeutischer und enhancement‑Gentechnik.',
    answer:
      'Therapeutisch korrigiert krankheitsbedingte Gene; Enhancement verändert Gene, um körperliche oder geistige Fähigkeiten über das Normal‑/Gesundheitsniveau hinaus zu steigern.',
    keywords: ['therapeutisch', 'enhancement', 'Korrektur', 'Steigerung']
  },
  {
    id: 'etq39',
    subjectId: 'ethik',
    topicIds: ['eth_gentechnik'],
    category: 'Gentechnik',
    type: 'match',
    question:
      'Ordne die Begriffe der jeweiligen Kategorie zu.',
    pairs: [
      ['CRISPR', 'Methode zur gezielten Genom‑Editierung'],
      ['Designer‑Baby', 'Beispiel für gene‑basiertes Enhancement']
    ]
  },
  {
    id: 'etq40',
    subjectId: 'ethik',
    topicIds: ['eth_gentechnik'],
    category: 'Gentechnik',
    type: 'order',
    question:
      'Schritte einer verantwortungsvollen CRISPR‑Entwicklung.',
    items: [
      'Zieldefinition (Therapie vs. Enhancement)',
      'Risiko‑ und Nutzen‑Analyse',
      'Ethik‑Board‑Prüfung',
      'Klinische Studien',
      'Regulatorische Zulassung'
    ]
  },

  // -------------------------------------------------
  // 1️⃣1️⃣ Künstliche Befruchtung
  // -------------------------------------------------
  {
    id: 'etq41',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'mc',
    question:
      'Welches Problem ist besonders ethisch umstritten?',
    options: [
      'Kosten der Behandlung',
      'Lagerung überschüssiger Embryonen',
      'Erfolgsquote der Befruchtung',
      'Zugangsberechtigung für Paare'
    ],
    correct: 1,
    explanation:
      'Der Umgang mit nicht genutzten Embryonen wirft Fragen nach deren moralischem Status auf.'
  },
  {
    id: 'etq42',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'text',
    question:
      'Nenne ein Argument für und ein Argument gegen die künstliche Befruchtung.',
    answer:
      'Pro: ermöglicht Elternschaft für unfruchtbare Paare. Contra: mögliche Kommerzialisierung und Risiken für Embryonen.',
    keywords: ['Pro', 'Contra', 'Elternschaft', 'Kommerzialisierung']
  },
  {
    id: 'etq43',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'match',
    question:
      'Ordne die Aspekte den ethischen Dimensionen zu.',
    pairs: [
      ['Recht auf Selbstbestimmung', 'Autonomie'],
      ['Schutz des Embryos', 'Würde']
    ]
  },
  {
    id: 'etq44',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'order',
    question: 'Ablauf einer IVF‑Behandlung (vereinfacht).',
    items: [
      'Stimulation der Eierstöcke',
      'Entnahme der Eizellen',
      'Befruchtung im Labor',
      'Kultivierung der Embryonen',
      'Auswahl des Embryos für den Transfer',
      'Embryotransfer in die Gebärmutter',
      'Nachsorge und Schwangerschaftstest'
    ]
  },

  // -------------------------------------------------
  // 1️⃣2️⃣ Weiterführende Fragen zur Künstlichen Befruchtung
  // -------------------------------------------------
  {
    id: 'etq45',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'mc',
    question:
      'Welcher Grundsatz wird am häufigsten als Gegenargument zur „Lagerung überschüssiger Embryonen“ genannt?',
    options: [
      'Prinzip der Nicht‑Kommerzialisierung',
      'Prinzip der Autonomie',
      'Prinzip der Gerechtigkeit',
      'Prinzip des Utilitarismus'
    ],
    correct: 0,
    explanation:
      'Die Nicht‑Kommerzialisierung wird häufig zitiert, weil Embryonen nicht als Ware behandelt werden sollen.'
  },
  {
    id: 'etq46',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'text',
    question:
      'Diskutiere die Frage: „Sollte das Gesetz die Anzahl der im Labor erzeugten Embryonen limitieren?“',
    answer:
      'Pro: Begrenzung verhindert mögliche Ausbeutung und moralische Grauzonen. Contra: Einschränkung kann die Erfolgsrate reduzieren und Paare benachteiligen, die mehrere Versuche benötigen.',
    keywords: ['Begrenzung', 'Ausbeutung', 'Erfolgsrate', 'Paare']
  },
  {
    id: 'etq47',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'match',
    question:
      'Ordne die Fachbegriffe den passenden Definitionen zu.',
    pairs: [
      [
        'IVF',
        'In‑vitro‑Fertilisation – Befruchtung außerhalb des Körpers'
      ],
      [
        'Embryotransfer',
        'Einsetzen des ausgewählten Embryos in die Gebärmutter'
      ],
      [
        'Eizellenspende',
        'Spende von Eizellen einer Dritte‑Person'
      ]
    ]
  },
  {
    id: 'etq48',
    subjectId: 'ethik',
    topicIds: ['eth_kunstliche_befruchtung'],
    category: 'Künstliche Befruchtung',
    type: 'order',
    question:
      'Stelle die Schritte einer ethischen Bewertung einer IVF‑Behandlung in die richtige Reihenfolge.',
    items: [
      'Identifikation der betroffenen Akteur:innen',
      'Analyse möglicher Nutzen (z. B. Kinderwunsch erfüllen)',
      'Analyse möglicher Risiken (z. B. Embryonenschutz)',
      'Abwägung von Autonomie vs. Würde‑Fragen',
      'Entscheidung im Rahmen gesetzlicher Vorgaben',
      'Kommunikation der Entscheidung an alle Beteiligten'
    ]
  }
];