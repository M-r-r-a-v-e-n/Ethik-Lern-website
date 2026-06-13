// ======================================================
// ETHIK SPRACHE – Wortschatz, Lernaktivitäten,
//                 Multikulturell, Literatur & Film
// Ziel: Sprache DER Ethik auf Deutsch und Englisch
// ======================================================

export const ETHIK_SPRACHE_TOPICS = [

  // ── Wortschatz Ethik Deutsch ────────────────────────
  {
    id: 'es_wortschatz_de',
    subjectId: 'ethik',
    category: 'Sprache der Ethik',
    title: 'Ethik-Wortschatz Deutsch',
    subtitle: 'Fachbegriffe und ihre Bedeutung',
    icon: '📖',
    duration: '8 min',
    intro: 'Die Sprache der Ethik hat eigene Fachbegriffe – wer sie kennt, kann präzise argumentieren.',
    details: `**Wichtige Fachbegriffe**

**Menschenwürde**
Der unveräußerliche Wert jedes Menschen, unabhängig von Leistung oder Herkunft.
→ Grundgesetz Art. 1: „Die Würde des Menschen ist unantastbar."

**Moral / moralisch sein**
Werte und Regeln, die das Zusammenleben in einer Gesellschaft regeln.
Eine moralische Handlung entspricht diesen gesellschaftlich anerkannten Regeln.

**Ethik bewegen / ethisch handeln**
Sein Verhalten an ethischen Grundsätzen ausrichten – z. B. Ehrlichkeit, Gerechtigkeit, Fürsorge.

**Konsequenz / Konsequenzrecht**
Das Prinzip, dass Handlungen Folgen haben. Konsequenzrecht = Recht auf Konsequenzen aus eigenem Handeln.

**Verantwortung**
Die Pflicht, für die Folgen eigener Handlungen einzustehen.

**Gerechtigkeit**
Zustand, in dem jeder das bekommt, was ihm zusteht. Unterschied:
- Austauschgerechtigkeit (gleichwertige Leistungen)
- Verteilungsgerechtigkeit (nach Bedarf)
- Verfahrensgerechtigkeit (faire Regeln)

**Gewissen**
Die innere Stimme, die moralisch urteilt – sagt, was richtig und was falsch ist.

**Solidarität**
Zusammenhalt und gegenseitige Unterstützung, besonders für Schwächere.

**Ausdrücke verstehen:**
„Recht auf Leben" (Deutsch) = grundlegendes Menschenrecht auf körperliche Unversehrtheit.
„Life does the work" (Englisch, Popkultur) = das Leben regelt sich selbst, nicht passend für ethische Diskussionen.`,
    keyConcepts: [
      { term: 'Menschenwürde', definition: 'Unveräußerlicher Wert jedes Menschen – Grundlage aller Menschenrechte (GG Art. 1).' },
      { term: 'Moral', definition: 'Konkrete Werte und Verhaltensregeln einer Gesellschaft.' },
      { term: 'Verantwortung', definition: 'Pflicht, für die Folgen eigener Handlungen einzustehen.' },
      { term: 'Gerechtigkeit', definition: 'Zustand, in dem jeder das bekommt, was ihm zusteht.' },
      { term: 'Gewissen', definition: 'Innere moralische Urteilsinstanz des Menschen.' },
      { term: 'Solidarität', definition: 'Gegenseitiger Beistand und Zusammenhalt, besonders für Schwächere.' },
      { term: 'Konsequenz', definition: 'Folge einer Handlung – ethisch: Verantwortung für diese Folgen.' },
    ],
  },

  // ── Wortschatz Ethik English ────────────────────────
  {
    id: 'es_wortschatz_en',
    subjectId: 'ethik',
    category: 'Sprache der Ethik',
    title: 'Ethics Vocabulary English',
    subtitle: 'Key terms in English ethics',
    icon: '📗',
    duration: '8 min',
    intro: 'English has its own vocabulary for ethics – knowing these terms helps in reading and writing about moral issues.',
    details: `**Core Vocabulary**

**Moral** (adjective/noun)
Relating to principles of right and wrong. "It is immoral to lie."
→ Moral relativism: morals depend on culture (vs. moral absolutism: some acts are always wrong).

**Ethics** (noun)
The study of morality. Also: a system of moral principles ("business ethics", "medical ethics").

**Duty** (noun)
An obligation to act in a certain way. Kant's ethics is based on duty.
→ "We have a duty to help others."

**Rights** (noun, plural)
Entitlements a person has by law or morality. Human rights, civil rights.
→ "Everyone has the right to education."

**Justice** (noun)
Fairness in treatment. Social justice = equal opportunities for all.

**Virtue** (noun)
A positive moral character trait: honesty, courage, compassion.

**Conscience** (noun)
The inner sense of what is right or wrong.

**Accountability** (noun)
Being responsible for one's actions and their consequences.

**"The Social Contract" (Rousseau)**
People give up some freedoms in exchange for protection by society/government.
→ Core idea: legitimate authority comes from the consent of the governed.

**Common phrases in English ethics essays:**
- "From a moral standpoint…"
- "It is ethically questionable whether…"
- "One could argue that…"
- "The ethical implications are…"`,
    keyConcepts: [
      { term: 'Duty', definition: 'An obligation to act in a certain way, regardless of consequences.' },
      { term: 'Rights', definition: 'Entitlements a person has – e.g. right to life, education, freedom.' },
      { term: 'Justice', definition: 'Fairness; giving each person what they are owed.' },
      { term: 'Virtue', definition: 'A positive moral character trait such as honesty or courage.' },
      { term: 'Conscience', definition: 'Inner moral sense of right and wrong.' },
      { term: 'Social Contract', definition: "Rousseau's idea: people give up freedoms for society's protection." },
      { term: 'Accountability', definition: 'Being responsible and answerable for one\'s actions.' },
    ],
  },

  // ── Lernaktivitäten / Rollenspiele ──────────────────
  {
    id: 'es_rollenspiele',
    subjectId: 'ethik',
    category: 'Lernaktivitäten',
    title: 'Rollenspiele & Perspektiven',
    subtitle: 'Ethikprobleme aus verschiedenen Sichten',
    icon: '🎭',
    duration: '10 min',
    intro: 'Gute ethische Argumente erkennen verschiedene Perspektiven – Rollenspiele helfen dabei.',
    details: `**Warum Rollenspiele in Ethik?**
Ethische Fragen betreffen immer mehrere Gruppen. Wer verschiedene Rollen einnimmt, versteht die Komplexität besser.

**Beispiel-Szenario: Schulbuch-Debatte**
Frage: „Sollte ein Schulbuch verboten werden, das schwierige historische Inhalte enthält?"

**Verschiedene Perspektiven:**
- **Schüler/in:** „Ich fühle mich durch die Inhalte unwohl, aber ich möchte die Geschichte verstehen."
- **Eltern:** „Ich möchte mein Kind schützen, aber auch gut informiert aufwachsen sehen."
- **Lehrer/in:** „Ich möchte kritisches Denken fördern – schwierige Inhalte gehören dazu."
- **Bildungspolitiker/in:** „Lehrpläne müssen Bildung ermöglichen und Schüler schützen."
- **Historiker/in:** „Verfälschen wir Geschichte, wenn wir sie weglassen?"

**Perspektivwechsel-Methode:**
1. Position der anderen Person genau beschreiben (keine Karikatur!)
2. Die stärksten Argumente dieser Position nennen
3. Erst dann die eigene Position dagegenstellen
4. Gemeinsamkeiten finden

**Weitere Rollenspiel-Themen:**
- „Service mit oder ohne Zahlung?" (Ehrenamt vs. Lohnarbeit)
- „Darf KI in der Schule genutzt werden?" (Schüler, Lehrer, Eltern, Entwickler)
- „Wem gehört der Wald?" (Förster, Naturschützer, Tourismusbüro, Gemeinde)`,
    keyConcepts: [
      { term: 'Perspektivwechsel', definition: 'Eine Situation aus dem Blickwinkel einer anderen betroffenen Person betrachten.' },
      { term: 'Rollenspiel', definition: 'Methode, bei der man bewusst eine fremde Rolle einnimmt um Empathie zu entwickeln.' },
      { term: 'Argumentation', definition: 'Begründete Meinungsäußerung mit These, Argument und Beispiel.' },
      { term: 'Empathie', definition: 'Die Fähigkeit, sich in die Gefühle und Gedanken anderer hineinzuversetzen.' },
    ],
  },

  // ── Fallstudien ──────────────────────────────────────
  {
    id: 'es_fallstudien',
    subjectId: 'ethik',
    category: 'Lernaktivitäten',
    title: 'Fallstudien & Medienanalyse',
    subtitle: 'Echte Beispiele ethisch analysieren',
    icon: '🔍',
    duration: '10 min',
    intro: 'Ethik wird lebendig, wenn man echte Situationen aus Medien und Alltag analysiert.',
    details: `**Was ist eine Fallstudie?**
Eine Fallstudie untersucht eine konkrete, reale (oder realistische) Situation und analysiert sie mit ethischen Methoden.

**Schritte einer Fallanalyse:**
1. **Beschreiben:** Was ist passiert? Wer ist beteiligt?
2. **Analysieren:** Welche Werte und Interessen kollidieren?
3. **Bewerten:** Wie würde ein Konsequentialist / Deontologe / Tugendethiker entscheiden?
4. **Urteilen:** Was ist meiner Meinung nach richtig – und warum?

**Fallstudie: „Der Wald ist unser Recht"**
Ein Naturschutzgebiet soll zum Gewerbegebiet werden. 
- Wirtschaft: 200 Arbeitsplätze entstehen
- Umwelt: seltene Tierarten verlieren Lebensraum
- Gemeinde: Steuereinnahmen steigen
**Ethische Frage:** Darf wirtschaftlicher Nutzen Umweltzerstörung rechtfertigen?

**Medienanalyse:**
Wenn du einen Zeitungsartikel oder eine Nachricht analysierst, frag dich:
- Wer berichtet, und wessen Interessen vertritt diese Quelle?
- Welche Wertungen stecken (bewusst oder unbewusst) im Text?
- Gibt es emotionale Sprache, die Meinungen lenkt?
- Was fehlt – welche Perspektive wird nicht gehört?

**Beispiel Klima-Debatte in Medien:**
Ein Artikel, der Klimaaktivisten als „Extremisten" bezeichnet, setzt eine andere Wertung als einer, der von „engagierten Jugendlichen" spricht.`,
    keyConcepts: [
      { term: 'Fallanalyse', definition: 'Systematische Untersuchung einer konkreten Situation mit ethischen Methoden.' },
      { term: 'Medienanalyse', definition: 'Kritische Untersuchung von Medieninhalten auf Wertungen und Interessen.' },
      { term: 'Interessenkonflikt', definition: 'Wenn verschiedene Parteien unterschiedliche, unvereinbare Ziele verfolgen.' },
      { term: 'Partikularinteresse', definition: 'Das Interesse einer einzelnen Gruppe im Gegensatz zum Gemeinwohl.' },
    ],
  },

  // ── Multikulturell Bayern ───────────────────────────
  {
    id: 'es_multikulturell_bay',
    subjectId: 'ethik',
    category: 'Multikulturelle Perspektiven',
    title: 'Bayern & Ethik im Vergleich',
    subtitle: 'Tradition, Handwerk und andere Kulturen',
    icon: '🌍',
    duration: '8 min',
    intro: 'Bayerische Werte im Vergleich zu anderen Kulturen – was unterscheidet uns, was verbindet uns?',
    details: `**Ethik in Bayern**
In Bayern sind traditionelle Werte oft stärker verankert als anderswo in Deutschland:
- Familie und Gemeinschaft als zentrale Werte
- Handwerk und Berufsehre ("G'scheiter Handwerker")
- Heimatbindung und Regionalidentität
- Religiöse Tradition (v.a. Katholizismus)

**Vergleich: England / USA**
- Stärker individualistisch geprägt ("Individual before community")
- Weniger Betonung von Tradition, mehr auf Innovation
- Pragmatische Ethik: Was funktioniert?

**Vergleich: Asiatische Kulturen (z.B. Japan)**
- Kollektiv vor Individuum
- Harmonie als höchster Wert
- Scham-Kultur vs. Schuld-Kultur (Westeuropa)

**Sprachlicher Aspekt**
Deutsche Ethik-Texte betonen oft **Pflichten und Verbote** (deontologisch geprägt).
Englische Texte betonen eher **Rechte und Freiheiten** (liberal geprägt).

**Gemeinsamkeiten aller Kulturen:**
- Verbot der willkürlichen Tötung
- Fürsorgepflicht gegenüber Kindern
- Gegenseitigkeitsprinzip ("Tue nicht, was du nicht willst, dass man dir tue")

**Kritische Frage:**
Wenn alle Kulturen trotz Unterschieden diese Grundwerte teilen – spricht das für universelle Menschenrechte?`,
    keyConcepts: [
      { term: 'Individualismus', definition: 'Gesellschaftliche Werthaltung, die das Individuum über die Gemeinschaft stellt.' },
      { term: 'Kollektivismus', definition: 'Werthaltung, die die Gemeinschaft oder Gruppe höher stellt als das Individuum.' },
      { term: 'Scham-Kultur', definition: 'Moral wird durch soziale Scham reguliert (Außenwirkung zählt).' },
      { term: 'Schuld-Kultur', definition: 'Moral wird durch innere Schuldgefühle reguliert (Gewissen zählt).' },
      { term: 'Reziprozität', definition: 'Gegenseitigkeitsprinzip: Behandle andere so, wie du behandelt werden möchtest.' },
    ],
  },

  // ── Literatur & Film ethisch analysieren ────────────
  {
    id: 'es_literatur_film',
    subjectId: 'ethik',
    category: 'Lernaktivitäten',
    title: 'Literatur & Film ethisch lesen',
    subtitle: 'Helden, Werte, moralische Konflikte in Texten',
    icon: '🎬',
    duration: '10 min',
    intro: 'Romane, Filme und Texte sind voller ethischer Konflikte – man muss sie nur erkennen.',
    details: `**Ethisches Lesen**
Jede gute Geschichte hat einen moralischen Konflikt. Die Figuren müssen Entscheidungen treffen, die Werte verletzen oder verteidigen.

**Was analysiert man ethisch in einem Text/Film?**
1. **Heldenbild:** Welche Werte verkörpert der Held? Was opfert er?
2. **Antagonist:** Welche Werte/Interessen hat der „Böse"? Sind sie verständlich?
3. **Moralischer Konflikt:** Zwischen welchen Werten muss die Figur wählen?
4. **Botschaft:** Welches Werturteil vermittelt der Autor/Regisseur?

**Beispiel: Klassischer Märchenkonflikt**
"Schneewittchen" – Die böse Königin: Neid und Eitelkeit versus Güte und Schönheit.
Ethisch: Rechtfertigt Neid Gewalt? Welche Werte werden belohnt?

**Beispiel: Moderne Literatur (z.B. "Die Welle")**
Ein Lehrer führt ein Experiment über Autoritarismus durch.
Ethische Fragen: Wie leicht verfällt eine Gruppe Manipulation? Was ist unsere Verantwortung?

**Analyse-Schema für Texte:**
- **Situation:** Was passiert?
- **Betroffene:** Wer ist involviert, welche Interessen haben sie?
- **Wert-Konflikt:** Welche Werte stehen gegeneinander?
- **Entscheidung:** Wie handelt die Figur – und warum?
- **Beurteilung:** War die Entscheidung ethisch richtig?

**In English – Analyzing Literature Ethically:**
- What moral dilemma does the protagonist face?
- Which values does the text promote (implicitly or explicitly)?
- Does the author take sides? How?`,
    keyConcepts: [
      { term: 'Moralischer Konflikt', definition: 'Situation, in der eine Figur zwischen zwei moralisch wertvollen, aber unvereinbaren Optionen wählen muss.' },
      { term: 'Werturteil', definition: 'Aussage, die eine Bewertung enthält ("X ist gut/schlecht").' },
      { term: 'Antagonist', definition: 'Gegenspieler des Helden – oft verkörpert er gegensätzliche Werte.' },
      { term: 'Empathische Analyse', definition: 'Verstehen, warum eine Figur so handelt, auch wenn man nicht zustimmt.' },
    ],
  },

  // ── Argumentieren in Ethik ───────────────────────────
  {
    id: 'es_argumentieren',
    subjectId: 'ethik',
    category: 'Sprache der Ethik',
    title: 'Ethisch Argumentieren',
    subtitle: 'Pro/Contra, These, Begründung, Beispiel',
    icon: '🗣️',
    duration: '8 min',
    intro: 'Ein starkes ethisches Argument hat immer drei Teile: These, Begründung und Beispiel.',
    details: `**Das Argumentationsschema (T-B-B)**

**T – These**
Deine klare Aussage / Meinung.
→ „Ich bin der Meinung, dass soziale Medien ab 16 Jahren erlaubt sein sollten."

**B – Begründung**
Warum? Mit welchem ethischen Prinzip?
→ „Denn Jugendliche unter 16 können die Risiken für ihre Privatsphäre noch nicht vollständig einschätzen."

**B – Beispiel / Beleg**
Konkreter Fall, Statistik, Studie.
→ „Laut WHO nutzen 73% der 12-Jährigen soziale Medien, obwohl die AGB ein Mindestalter vorschreiben."

**Pro-Contra-Aufbau:**
Immer die schwächeren Gegenargumente zuerst nennen, dann widerlegen, eigene Argumente zum Schluss – damit bleibt das stärkste Argument im Kopf.

**Typische Formulierungen:**
- „Einerseits … andererseits …"
- „Zwar … jedoch …"
- „Dieser Einwand ist berechtigt, dennoch …"
- „Aus einer konsequentialistischen Sicht …"
- „Kant würde argumentieren, dass …"

**In English:**
- "On the one hand… on the other hand…"
- "While it is true that…, one must also consider…"
- "From a utilitarian perspective…"
- "Critics argue that… however…"`,
    keyConcepts: [
      { term: 'These', definition: 'Eine klare, behauptende Aussage, die man begründen und belegen will.' },
      { term: 'Argument', definition: 'These + Begründung + Beispiel / Beleg.' },
      { term: 'Gegenargument', definition: 'Ein Argument, das gegen die eigene These spricht – muss widerlegt werden.' },
      { term: 'Abwägung', definition: 'Vergleich von Pro- und Contra-Argumenten um eine begründete Position zu entwickeln.' },
      { term: 'Belegen', definition: 'Eine These mit Fakten, Statistiken oder Beispielen untermauern.' },
    ],
  },
];

// ── Fragen zu Sprache der Ethik ────────────────────────────

export const ETHIK_SPRACHE_QUESTIONS = [

  // ── Wortschatz Deutsch ──
  {
    id: 'esq_01',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_de'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'Was bedeutet „Menschenwürde" im deutschen Grundgesetz (Art. 1)?',
    options: [
      'Menschen müssen sich Würde erst verdienen',
      'Jeder Mensch hat einen unveräußerlichen Wert, unabhängig von Leistung oder Herkunft',
      'Würde gilt nur für deutsche Staatsbürger',
      'Würde kann durch Gesetze eingeschränkt werden',
    ],
    correct: 1,
    explanation: 'Art. 1 GG: „Die Würde des Menschen ist unantastbar." Sie gilt für jeden Menschen bedingungslos.',
  },
  {
    id: 'esq_02',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_de'],
    category: 'Sprache der Ethik',
    type: 'text',
    question: 'Erkläre den Begriff "Verantwortung" in der Ethik.',
    answer: 'Verantwortung bedeutet, dass man für die Folgen eigener Handlungen einsteht. Wer verantwortlich handelt, bedenkt vorher, welche Auswirkungen seine Entscheidungen auf andere haben.',
    keywords: ['folgen', 'handlungen', 'einsteht', 'auswirkungen', 'entscheidungen'],
    explanation: 'Verantwortung ist zentral in der Ethik: Ohne Verantwortungsbereitschaft kein moralisches Handeln.',
  },
  {
    id: 'esq_03',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_de'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'Was ist Solidarität?',
    options: [
      'Das Recht, keine Steuern zu zahlen',
      'Gegenseitiger Beistand und Zusammenhalt, besonders für Schwächere',
      'Eine politische Partei in Deutschland',
      'Die Pflicht, immer der Mehrheitsmeinung zu folgen',
    ],
    correct: 1,
    explanation: 'Solidarität = Zusammenhalten und füreinander einstehen, besonders für Menschen in schwierigen Lagen.',
  },
  {
    id: 'esq_04',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_de'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'Was bedeutet "Gerechtigkeit" in der Ethik?',
    options: [
      'Alle bekommen exakt dasselbe',
      'Jeder bekommt das, was ihm zusteht',
      'Der Stärkste gewinnt immer',
      'Nur Gesetze bestimmen was gerecht ist',
    ],
    correct: 1,
    explanation: 'Gerechtigkeit heißt: jedem das Seine geben – nicht Gleichmacherei, sondern faire Verteilung.',
  },
  {
    id: 'esq_05',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_de'],
    category: 'Sprache der Ethik',
    type: 'order',
    question: 'Bringe diese ethischen Begriffe in die Reihenfolge von "persönlich/innerlich" bis "gesellschaftlich/äußerlich":',
    items: ['Gewissen', 'Moral', 'Recht', 'Politik'],
    explanation: 'Gewissen (innen) → Moral (soziale Normen) → Recht (formalisiert) → Politik (institutionell).',
  },

  // ── Wortschatz English ──
  {
    id: 'esq_06',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_en'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'What is the main idea of Rousseau\'s "Social Contract"?',
    options: [
      'People should live alone without government',
      'People give up some freedoms in exchange for protection by society',
      'Only kings have the right to make laws',
      'Contracts are only valid if written down',
    ],
    correct: 1,
    explanation: 'Rousseau: legitimate authority comes from the consent of the governed. We trade some freedom for social order.',
  },
  {
    id: 'esq_07',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_en'],
    category: 'Sprache der Ethik',
    type: 'text',
    question: 'Explain the difference between "duty" and "rights" in English ethics.',
    answer: 'Duties are obligations we must fulfil (e.g. telling the truth). Rights are entitlements we have (e.g. right to life, freedom). Duties and rights often correspond: if you have a right to be treated fairly, others have a duty to treat you fairly.',
    keywords: ['duty', 'obligation', 'rights', 'entitlement', 'correspond'],
    explanation: 'Duty = obligation to act. Rights = entitlement to receive. They are two sides of the same moral coin.',
  },
  {
    id: 'esq_08',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_en'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'What is "justice" in English ethics?',
    options: [
      'Revenge for wrongs done',
      'Fairness – giving each person what they are owed',
      'The legal system of a country',
      'Agreeing with the majority',
    ],
    correct: 1,
    explanation: 'Justice = fairness in treatment and distribution. Social justice adds: equal opportunities for all.',
  },
  {
    id: 'esq_09',
    subjectId: 'ethik',
    topicIds: ['es_wortschatz_en'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'Which phrase correctly starts an ethical argument in English?',
    options: [
      '"From a moral standpoint, one could argue that…"',
      '"In my feels, I think…"',
      '"Everyone knows that…"',
      '"Obviously this is wrong because…"',
    ],
    correct: 0,
    explanation: '"From a moral standpoint" is a clear, academic signal that an ethical argument follows.',
  },

  // ── Rollenspiele ──
  {
    id: 'esq_10',
    subjectId: 'ethik',
    topicIds: ['es_rollenspiele'],
    category: 'Lernaktivitäten',
    type: 'text',
    question: 'Du nimmst die Rolle eines Umweltschützers ein. Gib ein Argument gegen den Bau eines Einkaufszentrums auf einem Naturschutzgebiet.',
    answer: 'Als Umweltschützer würde ich argumentieren: Der Bau zerstört unwiederbringlich das Ökosystem und den Lebensraum seltener Tierarten. Wirtschaftliche Vorteile sind kurzfristig, der ökologische Schaden ist dauerhaft.',
    keywords: ['ökosystem', 'lebensraum', 'tierarten', 'dauerhaft', 'zerstört'],
    explanation: 'Ein gutes Rollenspiel-Argument nennt konkrete Werte (Natur, Nachhaltigkeit) und benennt den Interessenkonflikt klar.',
  },
  {
    id: 'esq_11',
    subjectId: 'ethik',
    topicIds: ['es_rollenspiele'],
    category: 'Lernaktivitäten',
    type: 'mc',
    question: 'Was ist der erste Schritt beim ethischen Perspektivwechsel?',
    options: [
      'Die andere Position sofort widerlegen',
      'Die Position der anderen Person genau und fair beschreiben',
      'Die eigene Meinung nochmals wiederholen',
      'Keine Argumente der anderen Seite nennen',
    ],
    correct: 1,
    explanation: 'Echter Perspektivwechsel: Zuerst die andere Position stark und fair darstellen, nicht als Strohmann verzerren.',
  },

  // ── Fallstudien ──
  {
    id: 'esq_12',
    subjectId: 'ethik',
    topicIds: ['es_fallstudien'],
    category: 'Lernaktivitäten',
    type: 'text',
    question: 'Erkläre die vier Schritte einer ethischen Fallanalyse.',
    answer: 'Schritt 1: Beschreiben – Was ist passiert, wer ist beteiligt? Schritt 2: Analysieren – welche Werte und Interessen kollidieren? Schritt 3: Bewerten – wie würden verschiedene Ethiktheorien entscheiden? Schritt 4: Urteilen – eigene begründete Position entwickeln.',
    keywords: ['beschreiben', 'analysieren', 'bewerten', 'urteilen', 'werte', 'interessen'],
    explanation: 'Die vier Schritte: Beschreiben → Analysieren → Bewerten → Urteilen. Erst beschreiben, dann erst urteilen!',
  },
  {
    id: 'esq_13',
    subjectId: 'ethik',
    topicIds: ['es_fallstudien'],
    category: 'Lernaktivitäten',
    type: 'mc',
    question: 'Was prüft man bei einer Medienanalyse zuerst?',
    options: [
      'Ob der Text spannend geschrieben ist',
      'Wer berichtet und welche Interessen die Quelle verfolgt',
      'Wie lang der Artikel ist',
      'Ob bekannte Personen zitiert werden',
    ],
    correct: 1,
    explanation: 'Medienkritik beginnt immer mit der Frage: Wer hat diesen Text verfasst – und welches Interesse steckt dahinter?',
  },

  // ── Multikulturell ──
  {
    id: 'esq_14',
    subjectId: 'ethik',
    topicIds: ['es_multikulturell_bay'],
    category: 'Multikulturelle Perspektiven',
    type: 'text',
    question: 'Was ist der Unterschied zwischen einer Schuld-Kultur und einer Scham-Kultur?',
    answer: 'In einer Schuld-Kultur wird Moral durch innere Schuldgefühle reguliert – das Gewissen entscheidet. In einer Scham-Kultur wird Moral durch soziale Scham reguliert – die Außenwirkung und das Urteil der Gruppe zählen.',
    keywords: ['schuld', 'scham', 'gewissen', 'sozial', 'außenwirkung', 'gruppe'],
    explanation: 'Westeuropa: Schuld-Kultur (Gewissen). Teile Ostasiens: Scham-Kultur (soziales Urteil).',
  },
  {
    id: 'esq_15',
    subjectId: 'ethik',
    topicIds: ['es_multikulturell_bay'],
    category: 'Multikulturelle Perspektiven',
    type: 'mc',
    question: 'Welcher Wert ist in bayerischer / deutscher Ethik-Tradition besonders stark verankert?',
    options: [
      'Radikaler Individualismus',
      'Familie, Handwerk und Heimatbindung',
      'Ablehnung aller religiösen Werte',
      'Weltoffenheit ohne Traditionen',
    ],
    correct: 1,
    explanation: 'Bayerische Ethik ist traditionell geprägt durch Familie, Handwerk, Heimatbindung und religiöse Werte.',
  },

  // ── Literatur ──
  {
    id: 'esq_16',
    subjectId: 'ethik',
    topicIds: ['es_literatur_film'],
    category: 'Lernaktivitäten',
    type: 'mc',
    question: 'Was analysiert man bei einer ethischen Literaturanalyse zuerst?',
    options: [
      'Die Schreibweise und den Stil des Autors',
      'Den moralischen Konflikt, mit dem die Hauptfigur konfrontiert ist',
      'Die Seitenzahl und das Erscheinungsjahr',
      'Die Biografie des Autors',
    ],
    correct: 1,
    explanation: 'Der moralische Konflikt ist das Herzstück: Welche Werte stehen im Widerspruch? Wie entscheidet die Figur?',
  },
  {
    id: 'esq_17',
    subjectId: 'ethik',
    topicIds: ['es_literatur_film'],
    category: 'Lernaktivitäten',
    type: 'text',
    question: 'Wende das ethische Analyse-Schema auf "Die Welle" an: Was ist die zentrale ethische Frage des Films?',
    answer: 'Die zentrale ethische Frage ist: Wie leicht verfallen Menschen Manipulation und Autoritarismus, wenn Gemeinschaft und Identität versprochen werden? Der Film zeigt, dass individuelle Verantwortung und kritisches Denken notwendig sind, um Gruppendenken zu widerstehen.',
    keywords: ['manipulation', 'autoritarismus', 'verantwortung', 'kritisch', 'gruppendenken'],
    explanation: '"Die Welle" zeigt: Ohne kritisches Denken und Verantwortungsbewusstsein kann jede Gruppe manipuliert werden.',
  },

  // ── Argumentieren ──
  {
    id: 'esq_18',
    subjectId: 'ethik',
    topicIds: ['es_argumentieren'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'Was sind die drei Teile eines vollständigen ethischen Arguments (T-B-B)?',
    options: [
      'Titel, Bild, Beispiel',
      'These, Begründung, Beleg/Beispiel',
      'Text, Beweis, Beurteilung',
      'Theorie, Beweis, Beschreibung',
    ],
    correct: 1,
    explanation: 'T = These (Behauptung), B = Begründung (Warum?), B = Beispiel/Beleg (konkreter Nachweis).',
  },
  {
    id: 'esq_19',
    subjectId: 'ethik',
    topicIds: ['es_argumentieren'],
    category: 'Sprache der Ethik',
    type: 'text',
    question: 'Schreibe ein kurzes Argument (T-B-B) für die These: "Schüler sollten Ethik als Pflichtfach haben."',
    answer: 'These: Ethik sollte Pflichtfach sein. Begründung: Ethik lehrt kritisches Denken, Empathie und Verantwortungsbewusstsein – Fähigkeiten, die in einer demokratischen Gesellschaft unverzichtbar sind. Beispiel: Studien zeigen, dass Schüler mit Ethikunterricht respektvoller mit Andersdenkenden umgehen.',
    keywords: ['these', 'begründung', 'beispiel', 'pflichtfach', 'demokratisch', 'empathie'],
    explanation: 'Ein T-B-B-Argument: These klar, Begründung mit ethischem Prinzip, Beispiel konkret und passend.',
  },
  {
    id: 'esq_20',
    subjectId: 'ethik',
    topicIds: ['es_argumentieren'],
    category: 'Sprache der Ethik',
    type: 'mc',
    question: 'Warum nennt man beim Pro-Contra-Aufsatz die eigenen stärksten Argumente zuletzt?',
    options: [
      'Weil man dann mehr Platz hat',
      'Damit das stärkste Argument im Gedächtnis der Lesenden bleibt',
      'Weil es einfacher ist so anzufangen',
      'Damit der Leser Zeit hat, Gegenargumente zu vergessen',
    ],
    correct: 1,
    explanation: 'Psychologisches Prinzip: Das Zuletzt-Gehörte/Gelesene bleibt am besten hängen (Recency Effect).',
  },
];
