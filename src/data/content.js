// ============================================================
// TOPICS — Lerninhalt
// ============================================================

export const TOPICS = [
  {
    id: 'gordon',
    category: 'Friedensethik',
    title: 'Gordons Konfliktlösung',
    subtitle: 'Die 6 Schritte der niederlagenlosen Konfliktlösung',
    icon: '🤝',
    color: 'indigo',
    sections: [
      {
        heading: 'Niederlagelose Konfliktlösung nach Thomas Gordon (1918–2002)',
        body: 'Der amerikanische Psychologe Thomas Gordon entwickelte eine Methode zur friedlichen Konfliktlösung, bei der keine Seite „verliert". Alle Beteiligten sind am Ende einverstanden.',
      },
      {
        heading: 'Die 6 Schritte',
        steps: [
          { num: '1', title: 'Definition des Problems', desc: 'Möglichst genaue Definition – noch nicht die Lösung suchen.' },
          { num: '2', title: 'Sammlung möglicher Lösungen', desc: 'Noch keine Wertung – nur sammeln. Schriftlich festhalten.' },
          { num: '3', title: 'Wertung der Lösungsvorschläge', desc: 'Lösungen mit begründeter negativer Wertung werden gestrichen.' },
          { num: '4', title: 'Entscheidung', desc: 'Schriftliche Entscheidung für einen Vorschlag, mit dem ALLE einverstanden sind.' },
          { num: '5', title: 'Realisierung der Entscheidung', desc: 'Wer? Was? Wann? Wo? Wie? – Bedingungen regeln.' },
          { num: '6', title: 'Beurteilung in der Praxis', desc: 'Nach einiger Zeit Feedback einholen. Bei Unzufriedenheit: Zurück zu Schritt 1.' },
        ],
      },
    ],
  },
  {
    id: 'gewalt',
    category: 'Friedensethik',
    title: 'Arten von Gewalt',
    subtitle: 'Psychisch, physisch, strukturell – Definitionen & Beispiele',
    icon: '⚖️',
    color: 'rose',
    sections: [
      {
        heading: 'Die drei Gewaltformen',
        table: {
          headers: ['Form', 'Definition', 'Beispiel'],
          rows: [
            ['Psychische Gewalt', 'Seelische Verletzung', 'Mobbing, Beleidigung, Bedrohung'],
            ['Physische Gewalt', 'Körperliche Verletzung', 'Schlägerei, Schlagen'],
            ['Strukturelle Gewalt', 'Versteckte Benachteiligung bestimmter gesellschaftlicher Gruppen', 'Kein barrierefreier Zugang, Diskriminierung'],
          ],
        },
      },
      {
        heading: 'Maßnahmen gegen strukturelle Gewalt',
        list: ['✓ Politisches Engagement', '✓ Bildung', '✓ Nächstenliebe und Empathie', '✗ Körperliche Gewalt gegen Bevorzugte', '✗ Psychische Gewalt gegen Benachteiligte'],
        listNote: '✓ = sinnvoll, ✗ = nicht sinnvoll',
      },
    ],
  },
  {
    id: 'flucht',
    category: 'Friedensethik',
    title: 'Krieg, Flucht & Frieden',
    subtitle: 'Fluchtursachen, Herausforderungen, Hilfsorganisationen',
    icon: '🕊️',
    color: 'amber',
    sections: [
      {
        heading: 'Computerspiel vs. Wirklichkeit',
        table: {
          headers: ['Computerspiel', 'Wirklichkeit'],
          rows: [
            ['Unendlich viele Leben', 'Nur ein Leben'],
            ['Kein Leid / kein Schmerz', 'Leid und Schmerz sind Teil des Kriegs'],
            ['Keine seelischen Verletzungen', 'Trauer und Traumata'],
          ],
        },
      },
      {
        heading: 'Fluchtursachen',
        list: ['Krieg und Gewalt', 'Armut', 'Klimawandel / Naturkatastrophen', 'Politische oder religiöse Verfolgung'],
      },
      {
        heading: 'Herausforderungen für Geflüchtete (Beispiel Yasmin, 15, aus Syrien)',
        list: ['Fremdenfeindlichkeit', 'Sprachprobleme', 'Kulturelle Unterschiede', 'Behördengänge', 'Verlust der Heimat und Familie'],
      },
      {
        heading: 'Wichtige Hilfsorganisationen',
        table: {
          headers: ['Organisation', 'Aufgabe'],
          rows: [
            ['UNICEF', 'Kinderhilfe und Kinderrechte weltweit'],
            ['Amnesty International', 'Menschenrechte'],
            ['UNHCR', 'Flüchtlingsschutz (UN)'],
            ['Rotes Kreuz', 'Humanitäre Hilfe, medizinische Versorgung'],
          ],
        },
      },
    ],
  },
  {
    id: 'sterben',
    category: 'Sinnsuche',
    title: 'Sterbephasen (Kübler-Ross)',
    subtitle: 'Die 5 Phasen des Sterbens vollständig erklärt',
    icon: '🌿',
    color: 'emerald',
    sections: [
      {
        heading: '5 Sterbephasen nach Elisabeth Kübler-Ross',
        body: 'Die Psychiaterin Elisabeth Kübler-Ross beschrieb 5 Phasen, die viele Menschen beim Umgang mit dem eigenen Sterben (oder schwerer Diagnose) durchlaufen.',
        steps: [
          { num: '1', title: 'Nichtwahrhabenwollen (Leugnen)', desc: 'Anzweifeln von Diagnosen, irrationale Zukunftspläne – „Das kann nicht sein."' },
          { num: '2', title: 'Zorn (Wut / Auflehnung)', desc: 'Aggressivität, Unzufriedenheit, ungerechtfertigte Vorwürfe – „Warum ich?"' },
          { num: '3', title: 'Verhandeln', desc: 'Wunsch nach „Fristverlängerung", Kirchenbesuche, Wundermittel – „Wenn ich nur noch..."' },
          { num: '4', title: 'Depression (Trauer)', desc: 'Bewusstwerdung, tiefe Trauer, Wunsch nach Regelung aufgeschobener Dinge.' },
          { num: '5', title: 'Zustimmung (Akzeptanz)', desc: 'Bereit zu sterben, Sterben als Erlösung – innere Ruhe.' },
        ],
      },
      {
        heading: 'Sterbebegleitung',
        body: 'Hospize begleiten Sterbende würdevoll in ihren letzten Lebenswochen. Aktive Sterbehilfe (aktives Herbeiführen des Todes) ist in Deutschland verboten. Passive Sterbehilfe (Verzicht auf lebenserhaltende Maßnahmen) ist unter bestimmten Umständen erlaubt.',
      },
    ],
  },
  {
    id: 'sinn',
    category: 'Sinnsuche',
    title: 'Sinnsuche & Sinnangebote',
    subtitle: 'Echter Sinn, Sekten, Drogen, Engagement',
    icon: '🔍',
    color: 'indigo',
    sections: [
      {
        heading: 'Was kann im Leben Halt geben?',
        list: ['Familie und Freundschaft', 'Religion / Glaube', 'Ehrenamtliches Engagement', 'Arbeit und Berufung', 'Kunst, Musik, Sport'],
      },
      {
        heading: 'Verfehlte Sinnangebote',
        table: {
          headers: ['Angebot', 'Risiken'],
          rows: [
            ['Alkohol', 'Aggressivität, Depression, Geldprobleme – Probleme werden nicht gelöst'],
            ['Drogen / Zigaretten', 'Starke körperliche Abhängigkeit, Einschränkungen bei der Arbeit, Beschaffungskriminalität'],
            ['Kartenlegen / Esoterik', 'Entfremdung, Abhängigkeit, Manipulierbarkeit'],
          ],
        },
      },
      {
        heading: 'Gefährliche Sekten erkennen',
        list: [
          '⚠ Strenge Rangordnung in der Gruppe',
          '⚠ Du wirst zu etwas gezwungen',
          '⚠ Du darfst nichts über die Gruppe erzählen',
          '⚠ Du musst Geld abgeben',
          '⚠ Du sollst andere ausspionieren',
          '⚠ Die Gruppe grenzt sich von der Außenwelt ab',
          '✓ Freier Austritt jederzeit möglich = kein Sektenmerkmal',
        ],
      },
    ],
  },
  {
    id: 'religionen',
    category: 'Weltreligionen',
    title: 'Die 5 Weltreligionen',
    subtitle: 'Heilige Schriften, Gotteshäuser, Gemeinsamkeiten',
    icon: '🌍',
    color: 'amber',
    sections: [
      {
        heading: 'Überblick',
        table: {
          headers: ['Religion', 'Heilige Schrift', 'Gotteshaus'],
          rows: [
            ['Christentum', 'Bibel', 'Kirche'],
            ['Judentum', 'Tanach / Tora', 'Synagoge'],
            ['Islam', 'Koran', 'Moschee'],
            ['Hinduismus', 'Veden', 'Tempel'],
            ['Buddhismus', 'Pali-Kanon', 'Tempel oder Kloster'],
          ],
        },
      },
      {
        heading: 'Gemeinsamkeiten von Christentum, Judentum und Islam',
        list: [
          'Monotheismus (Glaube an einen Gott)',
          'Abraham gilt als Stammvater',
          'Glaube an ein Leben nach dem Tod',
          'Jesus spielt in allen drei eine Rolle (unterschiedlich)',
          'Gemeinsame ethische Werte (Weltethos)',
        ],
      },
      {
        heading: 'Wichtige Begriffe',
        table: {
          headers: ['Begriff', 'Bedeutung'],
          rows: [
            ['Monotheismus', 'Glaube an einen einzigen Gott (Christentum, Judentum, Islam)'],
            ['Polytheismus', 'Glaube an viele Götter (z.B. Hinduismus)'],
            ['Weltethos', 'Gemeinsame ethische Grundwerte aller Weltreligionen'],
            ['Religiöse Norm', 'Gilt für Gläubige (z.B. Gebot). Staatliches Gesetz gilt für alle Bürger.'],
          ],
        },
      },
    ],
  },
  {
    id: 'gebote',
    category: 'Weltreligionen',
    title: '10 Gebote & 5 Säulen',
    subtitle: 'Christentum und Islam – zentrale Glaubenspfeiler',
    icon: '📜',
    color: 'indigo',
    sections: [
      {
        heading: 'Die 10 Gebote (Christentum / Judentum)',
        numberedList: [
          'Du sollst keine anderen Götter haben neben mir.',
          'Du sollst den Namen Gottes nicht missbrauchen.',
          'Du sollst den Feiertag heiligen (Sabbat / Sonntag).',
          'Du sollst Vater und Mutter ehren.',
          'Du sollst nicht töten.',
          'Du sollst nicht ehebrechen.',
          'Du sollst nicht stehlen.',
          'Du sollst nicht lügen / falsches Zeugnis geben.',
          'Du sollst nicht begehren deines Nächsten Frau.',
          'Du sollst nicht begehren deines Nächsten Gut.',
        ],
      },
      {
        heading: 'Die 5 Säulen des Islam',
        numberedList: [
          'Schahada – Glaubensbekenntnis: „Es gibt keinen Gott außer Allah, und Mohammed ist sein Prophet."',
          'Salat – 5 tägliche Gebete (in Richtung Mekka)',
          'Zakat – Wohltätigkeit / Almosensteuer (ca. 2,5 % des Vermögens)',
          'Saum – Fasten im Monat Ramadan',
          'Haddsch – Pilgerfahrt nach Mekka (mindestens einmal im Leben)',
        ],
      },
    ],
  },
  {
    id: 'karma',
    category: 'Weltreligionen',
    title: 'Karma, Reinkarnation & Achtfacher Pfad',
    subtitle: 'Buddhismus & Hinduismus – zentrale Begriffe',
    icon: '☯️',
    color: 'emerald',
    sections: [
      {
        heading: 'Karma & Reinkarnation',
        table: {
          headers: ['Begriff', 'Bedeutung'],
          rows: [
            ['Karma', 'Jede Tat hat Folgen. Gute Taten → positive Konsequenzen; schlechte Taten → negative Konsequenzen (auch im nächsten Leben).'],
            ['Reinkarnation', 'Glaube, dass die Seele nach dem Tod in einem neuen Körper wiedergeboren wird. Das Karma bestimmt die Wiedergeburt.'],
            ['Nirvana', 'Ziel im Buddhismus: Zustand der vollständigen Befreiung vom Leid und vom Kreislauf der Wiedergeburten.'],
          ],
        },
      },
      {
        heading: 'Der Achtfache Pfad (Buddhismus)',
        body: 'Der Achtfache Pfad ist der Weg zur Erleuchtung (Nirvana):',
        numberedList: [
          'Rechte Ansicht – Die vier edlen Wahrheiten verstehen',
          'Rechte Absicht – Gedanken der Güte und des Nicht-Schadens',
          'Rechte Rede – Wahrhaftig, freundlich und hilfreich sprechen',
          'Rechtes Handeln – Nicht töten, nicht stehlen',
          'Rechter Lebenserwerb – Beruf, der anderen nicht schadet',
          'Rechte Anstrengung – Böses meiden, Gutes fördern',
          'Rechte Achtsamkeit – Bewusstes Wahrnehmen von Körper, Gefühlen, Gedanken',
          'Rechte Sammlung / Meditation – Tiefe Konzentration',
        ],
      },
    ],
  },
];

// ============================================================
// QUIZ QUESTIONS
// ============================================================

export const ALL_QUESTIONS = [

// --- FRIEDENSETHIK ---
{ id:'q1', category:'Friedensethik', topicIds:['flucht'], type:'mc',
  question:'Was ist ein wesentlicher Unterschied zwischen Krieg im Computerspiel und echtem Krieg?',
  options:['Im Spiel gibt es unendlich viele Leben – in der Realität nur eines','Im Spiel ist man schlechter bewaffnet','In der Realität gibt es keine Waffen','Im Spiel ist alles realistischer'],
  correct:0 },

{ id:'q2', category:'Friedensethik', topicIds:['gewalt'], type:'mc',
  question:'Welche Form der Gewalt ist Mobbing?',
  options:['Physische Gewalt','Psychische Gewalt','Strukturelle Gewalt','Keine Gewalt'],
  correct:1 },

{ id:'q3', category:'Friedensethik', topicIds:['gewalt'], type:'mc',
  question:'Was versteht man unter struktureller Gewalt?',
  options:['Körperliche Gewalt auf der Straße','Seelische Verletzung durch Worte','Versteckte Benachteiligung bestimmter Gruppen durch gesellschaftliche Strukturen','Gewalt in Computerspielen'],
  correct:2 },

{ id:'q4', category:'Friedensethik', topicIds:['gordon'], type:'mc',
  question:'Welcher Schritt kommt bei Thomas Gordons Konfliktlösung ZUERST?',
  options:['Entscheidung treffen','Wertung der Lösungsvorschläge','Definition des Problems','Sammlung möglicher Lösungen'],
  correct:2 },

{ id:'q5', category:'Friedensethik', topicIds:['gordon'], type:'order',
  question:'Bringe die 6 Schritte von Gordons Konfliktlösung in die richtige Reihenfolge:',
  items:['Definition des Problems','Sammlung möglicher Lösungen','Wertung der Lösungsvorschläge','Entscheidung','Realisierung der Entscheidung','Beurteilung in der Praxis'] },

{ id:'q6', category:'Friedensethik', topicIds:['gordon'], type:'mc',
  question:'Was bedeutet „niederlagelose Konfliktlösung" nach Gordon?',
  options:['Einer muss immer gewinnen','Alle Beteiligten sind mit der Lösung einverstanden','Der Stärkere setzt sich durch','Es gibt keine Lösung'],
  correct:1 },

{ id:'q7', category:'Friedensethik', topicIds:['gewalt'], type:'multi',
  question:'Welche Maßnahmen sind sinnvoll gegen strukturelle Gewalt? (Mehrere richtig)',
  options:['Politisches Engagement','Körperliche Gewalt gegen Bevorzugte','Bildung','Psychische Gewalt gegen Benachteiligte','Nächstenliebe und Empathie'],
  correct:[0,2,4] },

{ id:'q8', category:'Friedensethik', topicIds:['flucht'], type:'text',
  question:'Nenne 3 Gründe, warum Menschen flüchten.',
  answer:'Krieg / Armut / Klimawandel / politische Verfolgung / Religionsverfolgung / Naturkatastrophen' },

{ id:'q9', category:'Friedensethik', topicIds:['flucht'], type:'mc',
  question:'Welche Organisation ist speziell für Kinderrechte zuständig?',
  options:['Amnesty International','UNICEF','Greenpeace','UNHCR'],
  correct:1 },

{ id:'q10', category:'Friedensethik', topicIds:['gordon'], type:'mc',
  question:'Wie heißt Schritt 6 (der letzte) bei Gordon?',
  options:['Realisierung der Entscheidung','Entscheidung','Beurteilung in der Praxis','Wertung der Lösungsvorschläge'],
  correct:2 },

{ id:'q11', category:'Friedensethik', topicIds:['gewalt'], type:'text',
  question:'Erkläre den Unterschied zwischen psychischer und physischer Gewalt.',
  answer:'Psychische Gewalt = seelische Verletzung (z.B. Mobbing). Physische Gewalt = körperliche Verletzung (z.B. Schlagen).' },

{ id:'q12', category:'Friedensethik', topicIds:['flucht'], type:'mc',
  question:'Was organisiert Amnesty International hauptsächlich?',
  options:['Lebensmittelhilfe','Katastrophenschutz','Menschenrechte','Klimaschutz'],
  correct:2 },

{ id:'q12b', category:'Friedensethik', topicIds:['gewalt'], type:'match',
  question:'Ordne die Gewaltformen ihrer Beschreibung zu:',
  pairs:[['Psychische Gewalt','Seelische Verletzung'],['Physische Gewalt','Körperliche Verletzung'],['Strukturelle Gewalt','Versteckte gesellschaftliche Benachteiligung']] },

// --- SINNSUCHE ---
{ id:'q13', category:'Sinnsuche', topicIds:['sterben'], type:'order',
  question:'Bringe die 5 Sterbephasen nach Kübler-Ross in die richtige Reihenfolge:',
  items:['Nichtwahrhabenwollen (Leugnen)','Zorn (Wut / Auflehnung)','Verhandeln','Depression (Trauer)','Zustimmung (Akzeptanz)'] },

{ id:'q14', category:'Sinnsuche', topicIds:['sterben'], type:'mc',
  question:'In welcher Sterbephase werden Diagnosen angezweifelt und irrationale Zukunftspläne gemacht?',
  options:['Zorn','Verhandeln','Nichtwahrhabenwollen','Depression'],
  correct:2 },

{ id:'q15', category:'Sinnsuche', topicIds:['sterben'], type:'mc',
  question:'Was ist die letzte Sterbephase nach Kübler-Ross?',
  options:['Depression','Zorn','Verhandeln','Zustimmung / Akzeptanz'],
  correct:3 },

{ id:'q16', category:'Sinnsuche', topicIds:['sinn'], type:'multi',
  question:'Woran erkennt man eine gefährliche Sekte? (Mehrere richtig)',
  options:['Freundliche Leute','Strenge Rangordnung','Du wirst zu etwas gezwungen','Du kannst jederzeit gehen','Du musst Geld abgeben','Du sollst andere ausspionieren','Die Gruppe grenzt sich ab','Glaube ist wichtig'],
  correct:[1,2,4,5,6] },

{ id:'q17', category:'Sinnsuche', topicIds:['sterben'], type:'mc',
  question:'Was ist der Unterschied zwischen aktiver und passiver Sterbehilfe?',
  options:['Aktiv = Verzicht auf Maßnahmen; Passiv = aktives Herbeiführen des Todes','Aktiv = aktives Herbeiführen des Todes; Passiv = Verzicht auf lebenserhaltende Maßnahmen','Beide sind dasselbe','Aktiv ist in Deutschland erlaubt, passiv nicht'],
  correct:1 },

{ id:'q18', category:'Sinnsuche', topicIds:['sinn'], type:'text',
  question:'Erkläre, warum Drogen auf die „schiefe Bahn" führen können.',
  answer:'Starke körperliche Abhängigkeit, Einschränkungen bei der Arbeit, Beschaffungskriminalität, gesundheitliche Schäden' },

{ id:'q19', category:'Sinnsuche', topicIds:['sterben'], type:'mc',
  question:'Was ist eine Hospizeinrichtung?',
  options:['Ein Krankenhaus für junge Menschen','Eine Einrichtung zur würdevollen Begleitung Sterbender','Eine Drogenberatungsstelle','Ein Heim für Waisen'],
  correct:1 },

{ id:'q20', category:'Sinnsuche', topicIds:['sterben'], type:'mc',
  question:'Was beschreibt die Sterbephase „Verhandeln"?',
  options:['Tiefe Trauer und Bewusstwerdung','Wut und Aggressivität','Wunsch nach Fristverlängerung, Versprechen machen, Kirchenbesuche','Bereit zu sterben sein'],
  correct:2 },

{ id:'q21', category:'Sinnsuche', topicIds:['sinn'], type:'text',
  question:'Nenne 3 Merkmale einer gefährlichen Sekte.',
  answer:'Strenge Rangordnung, Zwang, Geheimhaltung, Geldabgabe, Ausspionieren, Abgrenzung von der Außenwelt' },

{ id:'q22', category:'Sinnsuche', topicIds:['sinn'], type:'mc',
  question:'Warum kann Alkohol ein verfehltes Sinnangebot sein?',
  options:['Er ist zu teuer','Er kann zu Aggressivität, Depression und Geldproblemen führen und löst Probleme nicht','Er macht müde','Er ist selten erhältlich'],
  correct:1 },

// --- WELTRELIGIONEN ---
{ id:'q23', category:'Weltreligionen', topicIds:['religionen'], type:'match',
  question:'Verbinde jede Religion mit ihrer heiligen Schrift:',
  pairs:[['Christentum','Bibel'],['Islam','Koran'],['Judentum','Tanach / Tora'],['Hinduismus','Veden'],['Buddhismus','Pali-Kanon']] },

{ id:'q24', category:'Weltreligionen', topicIds:['religionen'], type:'match',
  question:'Verbinde jede Religion mit ihrem Gotteshaus:',
  pairs:[['Christentum','Kirche'],['Islam','Moschee'],['Judentum','Synagoge'],['Hinduismus','Tempel'],['Buddhismus','Tempel / Kloster']] },

{ id:'q25', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Was bedeutet Monotheismus?',
  options:['Glaube an viele Götter','Glaube an einen einzigen Gott','Kein Gottesglaube','Glaube an die Natur'],
  correct:1 },

{ id:'q26', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Welche der folgenden Religionen ist polytheistisch?',
  options:['Islam','Christentum','Hinduismus','Judentum'],
  correct:2 },

{ id:'q27', category:'Weltreligionen', topicIds:['religionen'], type:'multi',
  question:'Welche sind Gemeinsamkeiten von Christentum, Judentum und Islam?',
  options:['Monotheismus','Glaube an Karma','Glaube an Leben nach dem Tod','Achtfacher Pfad','Abraham als Stammvater'],
  correct:[0,2,4] },

{ id:'q28', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Nenne alle 5 Säulen des Islam (Deutsch reicht, Fachbegriffe = Bonus).',
  answer:'1. Glaubensbekenntnis (Schahada) 2. 5 tägliche Gebete (Salat) 3. Wohltätigkeit (Zakat) 4. Fasten im Ramadan (Saum) 5. Pilgerfahrt nach Mekka (Haddsch)' },

{ id:'q29', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Nenne mindestens 7 der 10 Gebote.',
  answer:'1. Keine anderen Götter 2. Gottes Namen nicht missbrauchen 3. Feiertag heiligen 4. Eltern ehren 5. Nicht töten 6. Nicht ehebrechen 7. Nicht stehlen 8. Nicht lügen 9+10. Nicht begehren' },

{ id:'q30', category:'Weltreligionen', topicIds:['karma'], type:'mc',
  question:'Was ist Karma?',
  options:['Ein buddhistischer Gott','Das Prinzip, dass jede Tat Konsequenzen hat','Ein Gebet im Islam','Ein heiliger Text'],
  correct:1 },

{ id:'q31', category:'Weltreligionen', topicIds:['karma'], type:'mc',
  question:'Was bedeutet Reinkarnation?',
  options:['Das Leben nach dem Tod im Himmel','Die Seele wird nach dem Tod in einem neuen Körper wiedergeboren','Ein islamisches Gebet','Das Jüngste Gericht'],
  correct:1 },

{ id:'q32', category:'Weltreligionen', topicIds:['gebote'], type:'order',
  question:'Bringe die 5 Säulen des Islam in die gebräuchliche Reihenfolge:',
  items:['Schahada (Glaubensbekenntnis)','Salat (5 tägliche Gebete)','Zakat (Wohltätigkeit)','Saum (Fasten)','Haddsch (Pilgerfahrt)'] },

{ id:'q33', category:'Weltreligionen', topicIds:['karma'], type:'mc',
  question:'Was ist das Ziel des Achtfachen Pfades im Buddhismus?',
  options:['Paradies nach dem Tod','Nirvana – Befreiung vom Leid','Wiedergeburt als Mensch','Erlangung von Karma'],
  correct:1 },

{ id:'q34', category:'Weltreligionen', topicIds:['karma'], type:'text',
  question:'Nenne alle 8 Schritte des Achtfachen Pfades.',
  answer:'1. Rechte Ansicht 2. Rechte Absicht 3. Rechte Rede 4. Rechtes Handeln 5. Rechter Lebenserwerb 6. Rechte Anstrengung 7. Rechte Achtsamkeit 8. Rechte Sammlung / Meditation' },

{ id:'q35', category:'Weltreligionen', topicIds:['gebote'], type:'mc',
  question:'Wie heißt das Glaubensbekenntnis im Islam (Fachbegriff)?',
  options:['Zakat','Salat','Schahada','Haddsch'],
  correct:2 },

{ id:'q36', category:'Weltreligionen', topicIds:['gebote'], type:'mc',
  question:'Wie heißt das Fasten im Islam (Fachbegriff)?',
  options:['Salat','Zakat','Haddsch','Saum'],
  correct:3 },

{ id:'q37', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Was versteht man unter „Weltethos"?',
  options:['Ein spezielles Gebet','Die heilige Schrift des Buddhismus','Gemeinsame ethische Grundwerte aller Weltreligionen','Ein religiöses Extremismusprogramm'],
  correct:2 },

{ id:'q38', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Was ist der Unterschied zwischen religiöser Norm und staatlichem Gesetz?',
  options:['Es gibt keinen Unterschied','Religiöse Normen gelten für Gläubige, staatliche Gesetze für alle Bürger und werden rechtlich durchgesetzt','Staatliche Gesetze kommen aus der Bibel','Religiöse Normen sind strenger'],
  correct:1 },

{ id:'q39', category:'Weltreligionen', topicIds:['gebote'], type:'mc',
  question:'Wie lautet das 5. Gebot im Christentum?',
  options:['Du sollst nicht stehlen','Du sollst Vater und Mutter ehren','Du sollst nicht töten','Du sollst nicht lügen'],
  correct:2 },

{ id:'q40', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Was ist die heilige Schrift des Judentums?',
  options:['Bibel','Koran','Tanach / Tora','Veden'],
  correct:2 },

{ id:'q41', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Welches Gotteshaus gehört zum Islam?',
  options:['Synagoge','Kirche','Tempel','Moschee'],
  correct:3 },

{ id:'q42', category:'Weltreligionen', topicIds:['religionen'], type:'mc',
  question:'Wie heißt der heilige Pilgerort im Islam?',
  options:['Jerusalem','Mekka','Medina','Istanbul'],
  correct:1 },

// ── NEUE FREITEXT-FRAGEN ─────────────────────────────────

// --- FRIEDENSETHIK: Gordon ---
{ id:'qt1', category:'Friedensethik', topicIds:['gordon'], type:'text',
  question:'Nenne alle 6 Schritte von Gordons Konfliktlösung in der richtigen Reihenfolge.',
  answer:'1. Definition des Problems 2. Sammlung möglicher Lösungen 3. Wertung der Lösungsvorschläge 4. Entscheidung 5. Realisierung der Entscheidung 6. Beurteilung in der Praxis',
  keywords:['definition','sammlung','wertung','entscheidung','realisierung','beurteilung'] },

{ id:'qt2', category:'Friedensethik', topicIds:['gordon'], type:'text',
  question:'Was bedeutet „niederlagelose Konfliktlösung" und wer hat sie entwickelt?',
  answer:'Thomas Gordon (amerikanischer Psychologe, 1918–2002) entwickelte eine Methode, bei der alle Beteiligten mit der Lösung einverstanden sind – niemand verliert.',
  keywords:['gordon','einverstanden','verliert','beteiligten','lösung'] },

{ id:'qt3', category:'Friedensethik', topicIds:['gordon'], type:'text',
  question:'Was passiert bei Schritt 6 (Beurteilung in der Praxis) von Gordons Methode, wenn jemand unzufrieden ist?',
  answer:'Bei Unzufriedenheit geht man zurück zu Schritt 1 (Definition des Problems) und startet den Prozess neu.',
  keywords:['schritt','zurück','unzufrieden','neu','definition'] },

// --- FRIEDENSETHIK: Gewalt ---
{ id:'qt4', category:'Friedensethik', topicIds:['gewalt'], type:'text',
  question:'Erkläre alle drei Gewaltformen mit je einem Beispiel.',
  answer:'Psychische Gewalt: seelische Verletzung (z.B. Mobbing, Beleidigung). Physische Gewalt: körperliche Verletzung (z.B. Schlagen). Strukturelle Gewalt: versteckte Benachteiligung durch gesellschaftliche Strukturen (z.B. fehlende Barrierefreiheit).',
  keywords:['psychische','physische','strukturelle','mobbing','körperlich','seelisch','benachteiligung'] },

{ id:'qt5', category:'Friedensethik', topicIds:['gewalt'], type:'text',
  question:'Nenne 3 sinnvolle und 2 nicht sinnvolle Maßnahmen gegen strukturelle Gewalt.',
  answer:'Sinnvoll: politisches Engagement, Bildung, Nächstenliebe/Empathie. Nicht sinnvoll: körperliche Gewalt gegen Bevorzugte, psychische Gewalt gegen Benachteiligte.',
  keywords:['engagement','bildung','empathie','körperliche','psychische'] },

// --- FRIEDENSETHIK: Flucht ---
{ id:'qt6', category:'Friedensethik', topicIds:['flucht'], type:'text',
  question:'Nenne die 4 wichtigsten Hilfsorganisationen und ihre Aufgaben.',
  answer:'UNICEF: Kinderhilfe und Kinderrechte weltweit. Amnesty International: Menschenrechte. UNHCR: Flüchtlingsschutz (UN). Rotes Kreuz: humanitäre Hilfe, medizinische Versorgung.',
  keywords:['unicef','amnesty','unhcr','rotes kreuz','menschenrechte','flüchtlingsschutz','kinderhilfe'] },

{ id:'qt7', category:'Friedensethik', topicIds:['flucht'], type:'text',
  question:'Nenne 3 Unterschiede zwischen Krieg im Computerspiel und echtem Krieg.',
  answer:'Im Spiel: unendlich viele Leben, kein Leid/Schmerz, keine seelischen Verletzungen. In der Realität: nur ein Leben, Leid und Schmerz, Traumata und Trauer.',
  keywords:['leben','leid','schmerz','trauma','spiel','realität'] },

// --- SINNSUCHE: Sterbephasen ---
{ id:'qt8', category:'Sinnsuche', topicIds:['sterben'], type:'text',
  question:'Nenne alle 5 Sterbephasen nach Kübler-Ross in der richtigen Reihenfolge.',
  answer:'1. Nichtwahrhabenwollen (Leugnen) 2. Zorn (Wut/Auflehnung) 3. Verhandeln 4. Depression (Trauer) 5. Zustimmung (Akzeptanz)',
  keywords:['leugnen','zorn','verhandeln','depression','akzeptanz','nichtwahrhabenwollen'] },

{ id:'qt9', category:'Sinnsuche', topicIds:['sterben'], type:'text',
  question:'Beschreibe die Phase „Verhandeln" bei Kübler-Ross.',
  answer:'Wunsch nach Fristverlängerung, Versprechen machen, Kirchenbesuche, Suche nach Wundermitteln. Typischer Gedanke: „Wenn ich nur noch..."',
  keywords:['fristverlängerung','versprechen','kirchenbesuche','wundermittel','wunsch'] },

{ id:'qt10', category:'Sinnsuche', topicIds:['sterben'], type:'text',
  question:'Was ist der Unterschied zwischen aktiver und passiver Sterbehilfe? Was ist in Deutschland erlaubt?',
  answer:'Aktive Sterbehilfe = aktives Herbeiführen des Todes → in Deutschland verboten. Passive Sterbehilfe = Verzicht auf lebenserhaltende Maßnahmen → unter bestimmten Umständen erlaubt.',
  keywords:['aktive','passive','verboten','erlaubt','maßnahmen','herbeiführen'] },

{ id:'qt11', category:'Sinnsuche', topicIds:['sterben'], type:'text',
  question:'Was ist ein Hospiz und welche Aufgabe hat es?',
  answer:'Ein Hospiz ist eine Einrichtung, die Sterbende würdevoll in ihren letzten Lebenswochen begleitet. Es geht um Pflege, Schmerzlinderung und menschliche Begleitung, nicht um Heilung.',
  keywords:['würdevoll','begleitet','sterbende','pflege','lebenswochen'] },

// --- SINNSUCHE: Sinn ---
{ id:'qt12', category:'Sinnsuche', topicIds:['sinn'], type:'text',
  question:'Nenne 5 Dinge, die im Leben echten Halt und Sinn geben können.',
  answer:'Familie und Freundschaft, Religion/Glaube, ehrenamtliches Engagement, Arbeit und Berufung, Kunst/Musik/Sport.',
  keywords:['familie','freundschaft','religion','engagement','arbeit','kunst','sport'] },

{ id:'qt13', category:'Sinnsuche', topicIds:['sinn'], type:'text',
  question:'Erkläre warum Alkohol ein „verfehltes Sinnangebot" ist.',
  answer:'Alkohol führt zu Aggressivität, Depression und Geldproblemen. Er löst die eigentlichen Probleme nicht, sondern überdeckt sie nur vorübergehend und macht abhängig.',
  keywords:['aggressivität','depression','geldprobleme','abhängig','überdeckt','löst'] },

{ id:'qt14', category:'Sinnsuche', topicIds:['sinn'], type:'text',
  question:'Nenne mindestens 5 Merkmale einer gefährlichen Sekte.',
  answer:'Strenge Rangordnung, Zwang, Geldabgabe, Ausspionieren anderer Mitglieder, Abgrenzung von der Außenwelt, Geheimhaltung, man kann die Gruppe nicht einfach verlassen.',
  keywords:['rangordnung','zwang','geldabgabe','ausspionieren','abgrenzung','verlassen','geheimhaltung'] },

// --- WELTRELIGIONEN: 5 Säulen ---
{ id:'qt15', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Nenne alle 5 Säulen des Islam – auf Deutsch und mit den arabischen Fachbegriffen.',
  answer:'1. Glaubensbekenntnis (Schahada) 2. 5 tägliche Gebete (Salat) 3. Wohltätigkeit/Almosen (Zakat) 4. Fasten im Ramadan (Saum) 5. Pilgerfahrt nach Mekka (Haddsch)',
  keywords:['schahada','salat','zakat','saum','haddsch','glaubensbekenntnis','gebete','fasten','pilgerfahrt','mekka'] },

{ id:'qt16', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Was ist die Schahada und warum ist sie die 1. Säule des Islam?',
  answer:'Die Schahada ist das islamische Glaubensbekenntnis: „Es gibt keinen Gott außer Allah, und Mohammed ist sein Prophet." Sie steht an erster Stelle, weil sie die Grundlage des islamischen Glaubens ist.',
  keywords:['schahada','glaubensbekenntnis','allah','mohammed','prophet','grundlage'] },

{ id:'qt17', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Erkläre Zakat (3. Säule des Islam).',
  answer:'Zakat bedeutet Wohltätigkeit/Almosen. Gläubige Muslime sind verpflichtet, einen Teil ihres Vermögens (ca. 2,5%) an Bedürftige zu spenden. Es ist eine Form der sozialen Verantwortung.',
  keywords:['zakat','wohltätigkeit','almosen','vermögen','bedürftige','spenden'] },

// --- WELTRELIGIONEN: 10 Gebote ---
{ id:'qt18', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Nenne alle 10 Gebote (Kurzform reicht).',
  answer:'1. Keine anderen Götter 2. Gottes Namen nicht missbrauchen 3. Feiertag heiligen (Sabbat) 4. Eltern ehren 5. Nicht töten 6. Nicht ehebrechen 7. Nicht stehlen 8. Nicht falsch bezeugen/lügen 9. Nicht begehren (Haus des Nächsten) 10. Nicht begehren (Frau/Eigentum)',
  keywords:['götter','namen','feiertag','eltern','töten','ehebrechen','stehlen','bezeugen','begehren'] },

{ id:'qt19', category:'Weltreligionen', topicIds:['gebote'], type:'text',
  question:'Was ist der Unterschied zwischen einer religiösen Norm und einem staatlichen Gesetz?',
  answer:'Religiöse Normen gelten für Gläubige einer Religion und werden durch den Glauben begründet. Staatliche Gesetze gelten für alle Bürger und werden vom Staat rechtlich durchgesetzt (z.B. mit Strafen).',
  keywords:['religiöse','staatliche','gläubige','bürger','rechtlich','durchgesetzt','gelten'] },

// --- WELTRELIGIONEN: Achtfacher Pfad ---
{ id:'qt20', category:'Weltreligionen', topicIds:['karma'], type:'text',
  question:'Nenne alle 8 Schritte des Achtfachen Pfades im Buddhismus.',
  answer:'1. Rechte Ansicht 2. Rechte Absicht 3. Rechte Rede 4. Rechtes Handeln 5. Rechter Lebenserwerb 6. Rechte Anstrengung 7. Rechte Achtsamkeit 8. Rechte Sammlung/Meditation',
  keywords:['ansicht','absicht','rede','handeln','lebenserwerb','anstrengung','achtsamkeit','sammlung','meditation'] },

{ id:'qt21', category:'Weltreligionen', topicIds:['karma'], type:'text',
  question:'Was ist Karma und wie hängt es mit Reinkarnation zusammen?',
  answer:'Karma bedeutet, dass jede Tat Konsequenzen hat – gute Taten führen zu gutem Karma, schlechte zu schlechtem. Die Reinkarnation (Wiedergeburt der Seele in einem neuen Körper) wird durch das angesammelte Karma beeinflusst.',
  keywords:['karma','konsequenzen','reinkarnation','wiedergeburt','seele','taten','gutes'] },

{ id:'qt22', category:'Weltreligionen', topicIds:['karma'], type:'text',
  question:'Was ist das Ziel des Achtfachen Pfades und wie heißt dieser Zustand?',
  answer:'Das Ziel ist Nirvana – die Befreiung vom Leid und Kreislauf der Wiedergeburten. Nirvana ist ein Zustand völliger innerer Ruhe und Erleuchtung.',
  keywords:['nirvana','befreiung','leid','wiedergeburten','erleuchtung','ruhe'] },

// --- WELTRELIGIONEN: Religionen vergleichen ---
{ id:'qt23', category:'Weltreligionen', topicIds:['religionen'], type:'text',
  question:'Nenne für jede der 5 Weltreligionen: heilige Schrift und Gotteshaus.',
  answer:'Christentum: Bibel, Kirche. Islam: Koran, Moschee. Judentum: Tanach/Tora, Synagoge. Hinduismus: Veden, Tempel. Buddhismus: Pali-Kanon, Tempel/Kloster.',
  keywords:['bibel','kirche','koran','moschee','tanach','synagoge','veden','tempel','pali'] },

{ id:'qt24', category:'Weltreligionen', topicIds:['religionen'], type:'text',
  question:'Was haben Christentum, Judentum und Islam gemeinsam? Nenne mindestens 3 Gemeinsamkeiten.',
  answer:'Alle drei sind monotheistisch (Glaube an einen Gott). Abraham gilt als gemeinsamer Stammvater. Glaube an Leben nach dem Tod. Heilige Schriften. Gemeinsames Erbe aus dem Nahen Osten.',
  keywords:['monotheistisch','abraham','stammvater','leben nach dem tod','schriften','gott'] },

{ id:'qt25', category:'Weltreligionen', topicIds:['religionen'], type:'text',
  question:'Was bedeutet „Weltethos" und was ist der Grundgedanke?',
  answer:'Weltethos bezeichnet gemeinsame ethische Grundwerte aller Weltreligionen. Der Grundgedanke: Obwohl Religionen verschieden sind, teilen sie grundlegende moralische Werte wie Nächstenliebe, Gerechtigkeit und das Verbot zu töten.',
  keywords:['weltethos','grundwerte','religionen','nächstenliebe','gerechtigkeit','gemeinsam'] },
];

export const MINI_IDS = [
  'q1','q2','q3','q4','q13','q14','q15','q17','q23','q25','q27','q30','q31','q33','q37',
  'qt8','qt15','qt20','qt1','qt4','qt12','qt14',
];

export const CATEGORIES = ['Friedensethik', 'Sinnsuche', 'Weltreligionen'];

export const CATEGORY_COLORS = {
  'Friedensethik': 'rose',
  'Sinnsuche': 'emerald',
  'Weltreligionen': 'indigo',
};
