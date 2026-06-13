// ======================================================
// ETHIK NEU – Erweiterte Themen (Deutsch & Englisch)
// ======================================================

export const ETHIK_NEU_TOPICS = [

  // ── KATEGORIE: Gesellschaft & Gerechtigkeit ──────────
  {
    id: 'en_gleichheit',
    subjectId: 'ethik',
    category: 'Gesellschaft & Gerechtigkeit',
    title: 'Recht auf Gleichheit',
    subtitle: 'Fairness, Chancengleichheit, Diskriminierung',
    icon: '⚖️',
    duration: '10 min',
    intro: 'Gleichheit bedeutet nicht Gleichmacherei – sondern dass alle Menschen die gleichen Chancen verdienen.',
    details: `**Was ist Chancengleichheit?**
Jeder Mensch soll unabhängig von Herkunft, Geschlecht oder sozialem Status die gleichen Möglichkeiten haben.

**Unterschied: Gleichheit vs. Gerechtigkeit**
- Gleichheit = alle bekommen dasselbe
- Gerechtigkeit = jeder bekommt was er braucht (z. B. Barrierefreiheit für Rollstuhlfahrer)

**Diskriminierung**
Benachteiligung aufgrund von Eigenschaften wie Hautfarbe, Geschlecht, Religion oder Behinderung.

**Beispiele aus Bayern**
- Mindestlohn in Deutschland (12,41 €/h) – soll gleiche Würde im Arbeitsleben sichern
- Inklusionsschulen: Kinder mit und ohne Behinderung lernen gemeinsam

**Englische Perspektive**
In den USA gibt es seit dem Civil Rights Act (1964) gesetzlichen Schutz vor Diskriminierung. Dennoch bestehen strukturelle Ungleichheiten (z. B. Bildungsunterschiede zwischen arm und reich).`,
    keyConcepts: [
      { term: 'Chancengleichheit', definition: 'Alle Menschen haben unabhängig von Herkunft gleiche Ausgangsbedingungen.' },
      { term: 'Diskriminierung', definition: 'Benachteiligung aufgrund von Merkmalen wie Rasse, Geschlecht oder Religion.' },
      { term: 'Gleichbehandlung', definition: 'Alle Personen werden nach denselben Regeln behandelt.' },
      { term: 'Positive Diskriminierung', definition: 'Bevorzugung benachteiligter Gruppen um Ausgleich zu schaffen (Quotenregelung).' },
      { term: 'Menschenwürde', definition: 'Unveräußerlicher Wert jedes Menschen – Grundlage des Grundgesetzes (Art. 1 GG).' },
    ],
  },

  {
    id: 'en_umweltethik',
    subjectId: 'ethik',
    category: 'Gesellschaft & Gerechtigkeit',
    title: 'Umweltethik',
    subtitle: 'Verantwortung für Natur und Klima',
    icon: '🌿',
    duration: '10 min',
    intro: 'Haben wir eine moralische Pflicht, die Natur zu schützen – auch für zukünftige Generationen?',
    details: `**Was ist Umweltethik?**
Die Umweltethik fragt, welche moralische Verantwortung Menschen gegenüber der Natur haben.

**Drei Positionen:**
1. **Anthropozentrismus** – Natur hat Wert, weil sie dem Menschen nützt
2. **Biozentrismus** – Alle Lebewesen haben einen eigenen Wert
3. **Ökozentrismus** – Das gesamte Ökosystem (auch Flüsse, Berge) hat Rechte

**Konkrete Probleme:**
- Klimawandel: CO₂-Ausstoß erhöht die Erdtemperatur
- Artensterben: Täglich sterben ca. 150 Tierarten aus
- Ressourcenverbrauch: Bayerische Wälder leiden unter Dürre und Borkenkäfer

**Generationengerechtigkeit**
Wir haben die Pflicht, die Erde so zu hinterlassen, dass auch zukünftige Generationen gut darauf leben können.

**Beispiel Bayern**
Volksbegehren „Rettet die Bienen" (2019): 1,7 Millionen Unterschriften für mehr Artenschutz.`,
    keyConcepts: [
      { term: 'Anthropozentrismus', definition: 'Natur hat nur Wert als Mittel für den Menschen.' },
      { term: 'Biozentrismus', definition: 'Alle Lebewesen haben einen eigenen moralischen Wert.' },
      { term: 'Generationengerechtigkeit', definition: 'Verantwortung gegenüber zukünftigen Generationen.' },
      { term: 'Nachhaltigkeit', definition: 'Ressourcen nur so nutzen, dass sie sich regenerieren können.' },
      { term: 'Klimagerechtigkeit', definition: 'Die ärmsten Länder leiden am stärksten unter einem Klimawandel, den sie kaum verursachen.' },
    ],
  },

  {
    id: 'en_technologieethik',
    subjectId: 'ethik',
    category: 'Gesellschaft & Gerechtigkeit',
    title: 'Technologie & Privatsphäre',
    subtitle: 'Soziale Medien, KI und Datenschutz',
    icon: '📱',
    duration: '8 min',
    intro: 'Darf man für Komfort und Vernetzung auf Privatsphäre verzichten?',
    details: `**Das Dilemma der sozialen Medien**
Plattformen wie Instagram, TikTok oder WhatsApp bieten Vernetzung, sammeln aber massenhaft persönliche Daten.

**Ist das ethisch problematisch?**
- Daten werden für Werbung genutzt → Manipulation
- Algorithmen zeigen nur, was uns gefällt → Filterblasen
- Minderjährige werden nicht ausreichend geschützt

**Datenschutz in Deutschland**
Die DSGVO (Datenschutzgrundverordnung) gibt jedem das Recht zu wissen, welche Daten gespeichert werden, und das Recht auf Löschung.

**Künstliche Intelligenz**
KI kann Krankheiten erkennen, hilft bei Bewerbungen – aber wer entscheidet, wenn der Algorithmus diskriminiert?

**Ethische Fragen:**
- Darf ein Konzern deine Gedanken vorhersagen?
- Ist Überwachung für Sicherheit gerechtfertigt?
- Was passiert mit deinen Daten nach deinem Tod?`,
    keyConcepts: [
      { term: 'Datenschutz', definition: 'Schutz persönlicher Informationen vor unbefugtem Zugriff.' },
      { term: 'Filterblase', definition: 'Algorithmen zeigen nur Inhalte, die der Meinung des Nutzers entsprechen.' },
      { term: 'Digitale Mündigkeit', definition: 'Bewusstes, kritisches Umgehen mit Technologie und digitalen Medien.' },
      { term: 'Überwachungskapitalismus', definition: 'Geschäftsmodell, das auf dem Sammeln und Verkauf von Nutzerdaten basiert.' },
      { term: 'DSGVO', definition: 'EU-Gesetz zum Schutz personenbezogener Daten seit 2018.' },
    ],
  },

  // ── KATEGORIE: Ethische Grundfragen ──────────────────
  {
    id: 'en_ethik_grundfragen',
    subjectId: 'ethik',
    category: 'Ethische Grundfragen',
    title: 'Was ist Ethik?',
    subtitle: 'Moral, Werte, ethische Theorien',
    icon: '🤔',
    duration: '12 min',
    intro: 'Ethik ist die Wissenschaft vom richtigen Handeln – aber was ist „richtig"?',
    details: `**Definition**
Ethik (griech. ἦθος = Gewohnheit, Sitte) ist die philosophische Disziplin, die sich mit moralischem Handeln beschäftigt.

**Unterschied Moral und Ethik**
- **Moral** = die konkreten Regeln und Werte einer Gesellschaft ("Du sollst nicht lügen")
- **Ethik** = die wissenschaftliche Reflexion über Moral (Warum soll man nicht lügen?)

**Die drei großen ethischen Theorien:**

1. **Konsequentialismus** (Folgenethik)
   Eine Handlung ist gut, wenn sie gute Folgen hat. Beispiel: Utilitarismus – das größte Glück für die größte Zahl.

2. **Deontologie** (Pflichtenethik – Kant)
   Eine Handlung ist gut, wenn sie einer Pflicht entspricht. Kants Kategorischer Imperativ:
   *„Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde."*

3. **Tugendethik** (Aristoteles)
   Nicht die Handlung, sondern der Charakter zählt. Ein tugendhafter Mensch handelt automatisch richtig.

**In English:**
- Moral = the rules of conduct of a society
- Ethics = philosophical reflection on those rules
- Key terms: duty, rights, consequences, virtue, justice`,
    keyConcepts: [
      { term: 'Moral', definition: 'Konkrete Werte und Regeln einer Gesellschaft.' },
      { term: 'Ethik', definition: 'Wissenschaftliche Reflexion über Moral und richtiges Handeln.' },
      { term: 'Kategorischer Imperativ', definition: 'Kants Grundprinzip: Handle so, wie du möchtest, dass alle handeln.' },
      { term: 'Utilitarismus', definition: 'Das Handeln ist richtig, das den größten Nutzen für die meisten bringt.' },
      { term: 'Tugendethik', definition: 'Nicht die Tat, sondern der Charakter des Handelnden ist entscheidend.' },
      { term: 'Gewissen', definition: 'Innere moralische Stimme, die zwischen Gut und Böse unterscheidet.' },
    ],
  },

  {
    id: 'en_menschenrechte',
    subjectId: 'ethik',
    category: 'Ethische Grundfragen',
    title: 'Menschenrechte',
    subtitle: 'Universelle Rechte und ihre Geschichte',
    icon: '🕊️',
    duration: '10 min',
    intro: 'Menschenrechte gelten für alle Menschen überall auf der Welt – unabhängig von Nationalität oder Kultur.',
    details: `**Was sind Menschenrechte?**
Menschenrechte sind unveräußerliche Rechte, die jedem Menschen allein aufgrund seines Menschseins zustehen.

**Geschichte**
- 1776: Amerikanische Unabhängigkeitserklärung ("All men are created equal")
- 1789: Erklärung der Menschen- und Bürgerrechte (Französische Revolution)
- 1948: Allgemeine Erklärung der Menschenrechte (UN)
- 1949: Grundgesetz Deutschland (Art. 1: "Die Würde des Menschen ist unantastbar")

**Die drei Generationen der Menschenrechte:**
1. **Bürgerliche & politische Rechte** – Freiheit, Gleichheit, Wahlrecht
2. **Wirtschaftliche & soziale Rechte** – Bildung, Arbeit, Gesundheit
3. **Kollektive Rechte** – Frieden, saubere Umwelt, Entwicklung

**Sind Menschenrechte universell?**
Kritiker: Menschenrechte sind eine westliche Idee
Verteidiger: Grundwerte wie Würde und Freiheit sind universal

**In English:**
Human rights are universal, indivisible, inalienable. Key documents: Universal Declaration of Human Rights (UDHR), European Convention on Human Rights (ECHR).`,
    keyConcepts: [
      { term: 'Menschenwürde', definition: 'Unveräußerlicher Wert jedes Menschen – Kern aller Menschenrechte.' },
      { term: 'Universalität', definition: 'Menschenrechte gelten für alle Menschen weltweit.' },
      { term: 'Unveräußerlichkeit', definition: 'Menschenrechte können nicht weggenommen oder abgegeben werden.' },
      { term: 'UN-Menschenrechtserklärung', definition: 'Internationales Dokument von 1948 mit 30 grundlegenden Menschenrechten.' },
      { term: 'Grundgesetz Art. 1', definition: '"Die Würde des Menschen ist unantastbar." – Grundlage des deutschen Rechtsstaats.' },
    ],
  },

  {
    id: 'en_rollenspiele_dilemmata',
    subjectId: 'ethik',
    category: 'Ethische Grundfragen',
    title: 'Ethische Dilemmata',
    subtitle: 'Trolley-Problem, Fallstudien, Perspektiven',
    icon: '🚦',
    duration: '12 min',
    intro: 'Ethische Dilemmata sind Situationen, in denen es keine perfekte Lösung gibt – nur Abwägungen.',
    details: `**Was ist ein Dilemma?**
Eine Entscheidungssituation, in der jede Option moralische Nachteile hat.

**Das Trolley-Problem**
Eine außer Kontrolle geratene Straßenbahn rast auf 5 Menschen zu. Du kannst eine Weiche stellen – dann stirbt 1 Person.
- Konsequentialist: Weiche stellen → 1 Tod statt 5 (geringeres Übel)
- Deontologe: Du darfst nie aktiv töten, also nicht eingreifen
- Tugendethiker: Was würde ein guter Mensch tun?

**Fallstudie: Sollte ein Schulbuch verboten werden?**
Wenn ein Buch Schüler emotional belastet, aber wichtige historische Fakten enthält – Meinungsfreiheit vs. Schutz?

**Perspektivwechsel** – Die gleiche Situation aus verschiedenen Blickwinkeln:
- Schüler/in: Ich fühle mich verletzt
- Lehrer/in: Ich will Kritisches Denken fördern
- Eltern: Ich will mein Kind schützen
- Gesellschaft: Wir brauchen Bildung über schwierige Themen

**In English:**
Dilemmas force us to weigh competing values: freedom vs. safety, individual vs. collective good, short-term vs. long-term consequences.`,
    keyConcepts: [
      { term: 'Dilemma', definition: 'Entscheidung zwischen zwei Optionen, bei der beide Nachteile haben.' },
      { term: 'Abwägung', definition: 'Überlegen, welche Werte wichtiger sind in einem Konflikt.' },
      { term: 'Trolley-Problem', definition: 'Gedankenexperiment über aktives vs. passives Handeln bei unvermeidbarem Schaden.' },
      { term: 'Perspektivwechsel', definition: 'Eine Situation aus dem Blickwinkel anderer Betroffener betrachten.' },
      { term: 'Güterabwägung', definition: 'Vergleich verschiedener Werte um zu entscheiden, welcher in einer Situation Vorrang hat.' },
    ],
  },

  // ── KATEGORIE: Multikulturelle Perspektiven ───────────
  {
    id: 'en_multikulturell',
    subjectId: 'ethik',
    category: 'Multikulturelle Perspektiven',
    title: 'Kulturrelativismus vs. Universalismus',
    subtitle: 'Sind Werte kulturabhängig?',
    icon: '🌍',
    duration: '10 min',
    intro: 'Gibt es universelle moralische Werte – oder ist alles Ansichtssache?',
    details: `**Kulturrelativismus**
Moral ist immer kulturabhängig. Was in einer Gesellschaft richtig ist, kann in einer anderen falsch sein.
→ Keine Kultur darf die Werte einer anderen beurteilen.

**Universalismus**
Es gibt grundlegende Werte, die für alle Menschen gelten:
- Verbot von Folter und Tötung Unschuldiger
- Recht auf Würde und Freiheit

**Das Problem des Kulturrelativismus**
Wenn Moral nur kulturabhängig ist: Darf man dann keine Kritik an Kinderheirat, Sklaverei oder Unterdrückung üben?
→ Grenzen: Kulturrelativismus kann nicht alles rechtfertigen.

**Bayern vs. andere Kulturen – Beispiel**
In Bayern sind traditionelle Werte (Familie, Handwerk, Heimat) stark. In anderen Kulturen dominieren andere Werte (Kollektiv vor Individuum).

**In English:**
Cultural relativism: no culture is superior.
Universalism: some moral truths apply to all humans (e.g. torture is always wrong).
Key question: Can we judge other cultures? When yes, when no?`,
    keyConcepts: [
      { term: 'Kulturrelativismus', definition: 'Moralische Werte sind immer abhängig von der jeweiligen Kultur.' },
      { term: 'Universalismus', definition: 'Es gibt moralische Grundsätze, die für alle Menschen gelten.' },
      { term: 'Ethnozentrismus', definition: 'Die eigene Kultur als Maßstab für alle anderen setzen.' },
      { term: 'Toleranz', definition: 'Akzeptanz anderer Überzeugungen – nicht gleichbedeutend mit Gleichgültigkeit.' },
      { term: 'Dialog der Kulturen', definition: 'Gegenseitiges Verstehen und Lernen zwischen verschiedenen Kulturen.' },
    ],
  },

  {
    id: 'en_medienethik',
    subjectId: 'ethik',
    category: 'Multikulturelle Perspektiven',
    title: 'Medienethik & Fake News',
    subtitle: 'Wahrheit, Verantwortung, Pressefreiheit',
    icon: '📰',
    duration: '8 min',
    intro: 'Welche ethische Verantwortung haben Medien – und welche haben wir als Konsumenten?',
    details: `**Was ist Medienethik?**
Die Frage, welche moralischen Pflichten Journalisten, Redakteure und Plattformen haben.

**Journalistische Grundsätze:**
- Wahrheit und Faktentreue
- Trennung von Meinung und Nachricht
- Quellenschutz
- Schutz der Persönlichkeitsrechte

**Fake News**
Bewusst falsche Informationen, die verbreitet werden um zu täuschen.
→ Gefahr für die Demokratie: Wenn Bürger nicht mehr wissen was wahr ist, können sie nicht mehr gut entscheiden.

**Medienanalyse-Beispiel**
Ein Zeitungsartikel über den Klimawandel: Kommt er aus einer unabhängigen Redaktion oder aus einem Konzernmedium? Wer profitiert von welcher Botschaft?

**Deine Pflicht als Medienkonsument:**
- Quellen prüfen
- Mehrere Medien lesen
- Bei Social Media: Wer postet das und warum?

**In English:**
Media ethics = truth-telling, accountability, minimizing harm, acting independently. Fake news threatens democracy. Media literacy is essential.`,
    keyConcepts: [
      { term: 'Medienethik', definition: 'Moralische Verantwortung von Medien gegenüber Wahrheit und Gesellschaft.' },
      { term: 'Fake News', definition: 'Bewusst falsche Informationen, die als Nachrichten verbreitet werden.' },
      { term: 'Pressefreiheit', definition: 'Recht der Medien, ohne staatliche Zensur zu berichten.' },
      { term: 'Medienkompetenz', definition: 'Fähigkeit, Medieninhalte kritisch zu beurteilen und zu nutzen.' },
      { term: 'Meinungsfreiheit', definition: 'Recht, eigene Meinungen frei zu äußern – auch in Medien.' },
    ],
  },
];

// ── Fragen zu den neuen Ethik-Themen ──────────────────────

export const ETHIK_NEU_QUESTIONS = [

  // ── Gleichheit ──
  {
    id: 'en_q01',
    subjectId: 'ethik',
    topicIds: ['en_gleichheit'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'text',
    question: 'Erkläre den Unterschied zwischen "Gleichheit" und "Gerechtigkeit" mit einem Beispiel.',
    answer: 'Gleichheit bedeutet, alle bekommen dasselbe. Gerechtigkeit bedeutet, jeder bekommt was er braucht. Beispiel: Alle Schüler bekommen dieselbe Zeit für einen Test (Gleichheit). Schüler mit Leseschwäche bekommen mehr Zeit (Gerechtigkeit).',
    keywords: ['gleichheit', 'gerechtigkeit', 'beispiel', 'bekommt', 'braucht'],
    explanation: 'Gleichheit = gleiche Behandlung. Gerechtigkeit = faire Berücksichtigung der unterschiedlichen Ausgangslage.',
  },
  {
    id: 'en_q02',
    subjectId: 'ethik',
    topicIds: ['en_gleichheit'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'mc',
    question: 'Was versteht man unter "Chancengleichheit"?',
    options: [
      'Alle Menschen haben exakt die gleichen Ergebnisse',
      'Alle Menschen haben unabhängig von Herkunft gleiche Ausgangsbedingungen',
      'Reiche Menschen haben mehr Chancen als arme',
      'Nur Männer haben Anspruch auf gleiche Chancen',
    ],
    correct: 1,
    explanation: 'Chancengleichheit bedeutet nicht gleiche Ergebnisse, sondern faire Startbedingungen für alle Menschen.',
  },
  {
    id: 'en_q03',
    subjectId: 'ethik',
    topicIds: ['en_gleichheit'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'mc',
    question: 'Was ist Diskriminierung?',
    options: [
      'Die Bevorzugung von besonders talentierten Menschen',
      'Die Benachteiligung aufgrund von Merkmalen wie Herkunft oder Geschlecht',
      'Ein Vergleich zwischen zwei Gruppen',
      'Eine gerechte Behandlung aller Beteiligten',
    ],
    correct: 1,
    explanation: 'Diskriminierung ist eine unzulässige Benachteiligung aufgrund von persönlichen Merkmalen.',
  },

  // ── Umweltethik ──
  {
    id: 'en_q04',
    subjectId: 'ethik',
    topicIds: ['en_umweltethik'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'text',
    question: 'Was bedeutet "Generationengerechtigkeit" im Zusammenhang mit Umweltschutz?',
    answer: 'Generationengerechtigkeit bedeutet, dass wir die Erde so hinterlassen müssen, dass auch zukünftige Generationen gut auf ihr leben können. Wir dürfen Ressourcen nicht so verbrauchen, dass spätere Generationen darunter leiden.',
    keywords: ['generationen', 'zukunft', 'ressourcen', 'hinterlassen', 'nachhaltig'],
    explanation: 'Wir haben eine moralische Pflicht gegenüber Menschen, die noch nicht geboren sind.',
  },
  {
    id: 'en_q05',
    subjectId: 'ethik',
    topicIds: ['en_umweltethik'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'mc',
    question: 'Was besagt der Anthropozentrismus in der Umweltethik?',
    options: [
      'Die Natur hat einen eigenen Wert unabhängig vom Menschen',
      'Natur hat nur Wert, weil sie dem Menschen nützt',
      'Tiere sind wichtiger als Menschen',
      'Pflanzen haben mehr Rechte als Tiere',
    ],
    correct: 1,
    explanation: 'Anthropozentrismus (= menschenzentriert) sieht Natur als Mittel zum Zweck des Menschen.',
  },
  {
    id: 'en_q06',
    subjectId: 'ethik',
    topicIds: ['en_umweltethik'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'mc',
    question: 'Was unterscheidet Biozentrismus von Anthropozentrismus?',
    options: [
      'Beim Biozentrismus haben alle Lebewesen einen eigenen moralischen Wert',
      'Beim Biozentrismus zählt nur der Nutzen für den Menschen',
      'Biozentrismus ist eine moderne Wirtschaftstheorie',
      'Es gibt keinen Unterschied zwischen beiden Begriffen',
    ],
    correct: 0,
    explanation: 'Biozentrismus: Alle Lebewesen haben Eigenwert. Anthropozentrismus: Natur ist nur Mittel für Menschen.',
  },

  // ── Technologieethik ──
  {
    id: 'en_q07',
    subjectId: 'ethik',
    topicIds: ['en_technologieethik'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'text',
    question: 'Was ist eine "Filterblase" und warum ist sie ethisch problematisch?',
    answer: 'Eine Filterblase entsteht, wenn Algorithmen einem Nutzer nur Inhalte zeigen, die seiner Meinung entsprechen. Das ist ethisch problematisch, weil Menschen keine gegensätzlichen Meinungen mehr sehen, was zu Radikalisierung und eingeschränktem Denken führt.',
    keywords: ['algorithmus', 'meinung', 'inhalte', 'radikalisierung', 'einseitig'],
    explanation: 'Filterblasen schränken den Zugang zu verschiedenen Perspektiven ein und gefährden den demokratischen Diskurs.',
  },
  {
    id: 'en_q08',
    subjectId: 'ethik',
    topicIds: ['en_technologieethik'],
    category: 'Gesellschaft & Gerechtigkeit',
    type: 'mc',
    question: 'Was schützt die DSGVO?',
    options: [
      'Das Recht auf kostenlose Internetnutzung',
      'Personenbezogene Daten europäischer Bürger',
      'Urheberrechte von Musikern und Filmemachern',
      'Den Schutz von Staatsgrenzen',
    ],
    correct: 1,
    explanation: 'Die DSGVO (Datenschutz-Grundverordnung) schützt seit 2018 personenbezogene Daten von EU-Bürgern.',
  },

  // ── Ethik Grundfragen ──
  {
    id: 'en_q09',
    subjectId: 'ethik',
    topicIds: ['en_ethik_grundfragen'],
    category: 'Ethische Grundfragen',
    type: 'text',
    question: 'Was ist der Unterschied zwischen Moral und Ethik?',
    answer: 'Moral bezeichnet die konkreten Werte und Regeln einer Gesellschaft (z. B. "Lügen ist falsch"). Ethik ist die wissenschaftliche Reflexion über diese Moral – sie fragt, warum bestimmte Dinge als gut oder schlecht gelten.',
    keywords: ['moral', 'ethik', 'regeln', 'werte', 'reflexion', 'gesellschaft'],
    explanation: 'Moral = die Regeln. Ethik = die Wissenschaft, die diese Regeln untersucht.',
  },
  {
    id: 'en_q10',
    subjectId: 'ethik',
    topicIds: ['en_ethik_grundfragen'],
    category: 'Ethische Grundfragen',
    type: 'mc',
    question: 'Was sagt Kants Kategorischer Imperativ?',
    options: [
      'Handle so, dass du den größten Nutzen für dich selbst erzielst',
      'Handle nur nach einer Maxime, die als allgemeines Gesetz gelten könnte',
      'Entscheide nach den Folgen deiner Handlung',
      'Tue das, was die Gesellschaft von dir erwartet',
    ],
    correct: 1,
    explanation: 'Kant: Handle so, wie du möchtest, dass alle anderen auch handeln. Universalisierbarkeit ist das Kriterium.',
  },
  {
    id: 'en_q11',
    subjectId: 'ethik',
    topicIds: ['en_ethik_grundfragen'],
    category: 'Ethische Grundfragen',
    type: 'mc',
    question: 'Was ist der Utilitarismus?',
    options: [
      'Eine Theorie, die Pflicht über alles stellt',
      'Das Handeln ist richtig, das den größten Nutzen für die meisten bringt',
      'Nur tugendhafter Charakter bestimmt gutes Handeln',
      'Religion bestimmt, was moralisch richtig ist',
    ],
    correct: 1,
    explanation: 'Utilitarismus: Das Wohlbefinden der Mehrheit ist das höchste Ziel. Vertreter: Bentham, Mill.',
  },
  {
    id: 'en_q12',
    subjectId: 'ethik',
    topicIds: ['en_ethik_grundfragen'],
    category: 'Ethische Grundfragen',
    type: 'order',
    question: 'Bringe die drei ethischen Haupttheorien in die richtige Zuordnung (chronologisch nach Entstehung):',
    items: ['Tugendethik (Aristoteles, 4. Jh. v. Chr.)', 'Pflichtenethik (Kant, 18. Jh.)', 'Utilitarismus (Bentham/Mill, 19. Jh.)'],
    explanation: 'Aristoteles → Kant → Bentham/Mill: Die Tugendethik ist die älteste, der Utilitarismus die jüngste der drei großen Theorien.',
  },

  // ── Menschenrechte ──
  {
    id: 'en_q13',
    subjectId: 'ethik',
    topicIds: ['en_menschenrechte'],
    category: 'Ethische Grundfragen',
    type: 'text',
    question: 'Was bedeutet "Universalität" der Menschenrechte?',
    answer: 'Universalität bedeutet, dass Menschenrechte für alle Menschen weltweit gelten, unabhängig von Nationalität, Kultur, Religion oder sozialem Status. Sie sind nicht auf bestimmte Länder oder Gruppen beschränkt.',
    keywords: ['universell', 'weltweit', 'alle', 'menschen', 'kultur', 'unabhängig'],
    explanation: 'Universal = überall gültig. Menschenrechte sind keine westliche Erfindung, sondern für alle Menschen.',
  },
  {
    id: 'en_q14',
    subjectId: 'ethik',
    topicIds: ['en_menschenrechte'],
    category: 'Ethische Grundfragen',
    type: 'mc',
    question: 'Wann wurde die Allgemeine Erklärung der Menschenrechte verabschiedet?',
    options: ['1789', '1918', '1948', '1989'],
    correct: 2,
    explanation: 'Die UN verabschiedete die Allgemeine Erklärung der Menschenrechte am 10. Dezember 1948.',
  },

  // ── Dilemmata ──
  {
    id: 'en_q15',
    subjectId: 'ethik',
    topicIds: ['en_rollenspiele_dilemmata'],
    category: 'Ethische Grundfragen',
    type: 'text',
    question: 'Erkläre das Trolley-Problem und nenne zwei verschiedene ethische Antworten darauf.',
    answer: 'Das Trolley-Problem: Eine unkontrollierte Bahn rast auf 5 Menschen zu. Man kann eine Weiche stellen, dann stirbt 1 Person. Ein Konsequentialist würde die Weiche stellen (1 < 5). Ein Deontologe würde nicht eingreifen, da man nie aktiv töten darf.',
    keywords: ['trolley', 'weiche', 'konsequentialist', 'deontologe', 'handlung', 'eingreifen'],
    explanation: 'Konsequentialismus: Folgen entscheiden (1 statt 5). Deontologie: Man darf nie aktiv töten, unabhängig von den Folgen.',
  },
  {
    id: 'en_q16',
    subjectId: 'ethik',
    topicIds: ['en_rollenspiele_dilemmata'],
    category: 'Ethische Grundfragen',
    type: 'mc',
    question: 'Was versteht man unter einer ethischen "Güterabwägung"?',
    options: [
      'Den Vergleich von Warenpreisen im Supermarkt',
      'Das Überlegen, welche Werte in einem Konflikt wichtiger sind',
      'Die Berechnung des Nutzens einer Handlung in Euro',
      'Eine Bewertung von Produkten nach ethischen Kriterien',
    ],
    correct: 1,
    explanation: 'Güterabwägung = Abwägen konkurrierender moralischer Werte um zu entscheiden, welchem Vorrang zu geben ist.',
  },

  // ── Kulturrelativismus ──
  {
    id: 'en_q17',
    subjectId: 'ethik',
    topicIds: ['en_multikulturell'],
    category: 'Multikulturelle Perspektiven',
    type: 'text',
    question: 'Was ist der Hauptunterschied zwischen Kulturrelativismus und Universalismus?',
    answer: 'Kulturrelativismus: Moralische Werte sind immer kulturabhängig, es gibt keine überkulturellen Normen. Universalismus: Es gibt grundlegende moralische Werte, die für alle Menschen gelten, z. B. das Verbot von Folter.',
    keywords: ['kulturrelativismus', 'universalismus', 'kulturabhängig', 'grundlegende', 'normen'],
    explanation: 'Relativismus: Moral ist relativ zur Kultur. Universalismus: Einige Normen gelten überall.',
  },
  {
    id: 'en_q18',
    subjectId: 'ethik',
    topicIds: ['en_multikulturell'],
    category: 'Multikulturelle Perspektiven',
    type: 'mc',
    question: 'Was ist Ethnozentrismus?',
    options: [
      'Die Gleichwertigkeit aller Kulturen',
      'Die eigene Kultur als Maßstab für alle anderen setzen',
      'Das Studium verschiedener Kulturen',
      'Ein Musikstil aus Ostafrika',
    ],
    correct: 1,
    explanation: 'Ethnozentrismus = die eigene Kultur als überlegen betrachten und andere daran messen.',
  },

  // ── Medienethik ──
  {
    id: 'en_q19',
    subjectId: 'ethik',
    topicIds: ['en_medienethik'],
    category: 'Multikulturelle Perspektiven',
    type: 'text',
    question: 'Was sind Fake News und welche Gefahr stellen sie für die Demokratie dar?',
    answer: 'Fake News sind bewusst falsche Informationen, die als echte Nachrichten verbreitet werden. Sie gefährden die Demokratie, weil Bürger falsche Entscheidungen treffen, wenn sie nicht zwischen Wahrheit und Lüge unterscheiden können.',
    keywords: ['falsch', 'information', 'demokratie', 'entscheidung', 'bürger', 'wahrheit'],
    explanation: 'Demokratie braucht informierte Bürger. Fake News untergraben diese Grundlage.',
  },
  {
    id: 'en_q20',
    subjectId: 'ethik',
    topicIds: ['en_medienethik'],
    category: 'Multikulturelle Perspektiven',
    type: 'mc',
    question: 'Was bedeutet "Medienkompetenz"?',
    options: [
      'Die Fähigkeit, Videos zu schneiden und hochzuladen',
      'Kritisches Beurteilen und verantwortungsvolles Nutzen von Medieninhalten',
      'Sehr viele Follower auf Social Media zu haben',
      'Schnell tippen zu können',
    ],
    correct: 1,
    explanation: 'Medienkompetenz = Medien verstehen, kritisch einordnen und verantwortungsvoll damit umgehen.',
  },
];
