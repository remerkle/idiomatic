import type { ConjugationSet, Verb } from '../../types';

// A second batch of common German verbs, generated from a small weak-verb (schwach)
// conjugation engine. Curated to stick to *simple, unprefixed* regular verbs — verbs
// with a separable prefix (auf-, an-, ...) or an inseparable one (be-, ver-, ent-, ...)
// are excluded, since those change past-participle formation in ways this engine
// doesn't model. Three sub-patterns are handled: plain "-en" weak verbs, "-ieren"
// loanwords (which take no "ge-" in the participle), and "-ern" verbs (ich-form keeps
// the "e": wandern -> ich wandere). "-eln" verbs (sammeln -> ich sammle) are excluded —
// their ich-form contraction is a distinct, fiddlier pattern.
type VerbType = 'weak' | 'ieren' | 'ern';
type Entry = { infinitive: string; translation: string; type?: VerbType };

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'ä', 'ö', 'ü']);
const SIBILANTS = new Set(['s', 'ß', 'z', 'x']);

function needsE(stem: string): boolean {
  const last = stem.at(-1);
  const secondLast = stem.at(-2);
  if (last === 'd' || last === 't') return true;
  if ((last === 'm' || last === 'n') && secondLast && !VOWELS.has(secondLast) && secondLast !== 'l' && secondLast !== 'r') return true;
  return false;
}

function conjugate(entry: Entry): Omit<Verb, 'id' | 'languageId'> {
  const { infinitive, translation } = entry;
  const type = entry.type ?? 'weak';

  let present: ConjugationSet;
  let past: ConjugationSet;
  let participle: string;

  if (type === 'ieren') {
    const stem = infinitive.slice(0, -2); // "studieren" -> "studier"
    present = [`${stem}e`, `${stem}st`, `${stem}t`, infinitive, `${stem}t`, infinitive];
    past = [`${stem}te`, `${stem}test`, `${stem}te`, `${stem}ten`, `${stem}tet`, `${stem}ten`];
    participle = `${stem}t`; // no ge- on -ieren loanwords
  } else if (type === 'ern') {
    const stem = infinitive.slice(0, -1); // "wandern" -> "wander"
    present = [`${stem}e`, `${stem}st`, `${stem}t`, infinitive, `${stem}t`, infinitive];
    past = [`${stem}te`, `${stem}test`, `${stem}te`, `${stem}ten`, `${stem}tet`, `${stem}ten`];
    participle = `ge${stem}t`;
  } else {
    const stem = infinitive.slice(0, -2); // "putzen" -> "putz"
    const e = needsE(stem) ? 'e' : '';
    const last = stem.at(-1) ?? '';
    const duEnding = SIBILANTS.has(last) ? 't' : `${e}st`;
    present = [`${stem}e`, `${stem}${duEnding}`, `${stem}${e}t`, infinitive, `${stem}${e}t`, infinitive];
    past = [`${stem}${e}te`, `${stem}${e}test`, `${stem}${e}te`, `${stem}${e}ten`, `${stem}${e}tet`, `${stem}${e}ten`];
    participle = `ge${stem}${e}t`;
  }

  const future: ConjugationSet = [
    `werde ${infinitive}`, `wirst ${infinitive}`, `wird ${infinitive}`,
    `werden ${infinitive}`, `werdet ${infinitive}`, `werden ${infinitive}`,
  ];
  const haben = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'];
  const presentPerfect = haben.map(h => `${h} ${participle}`) as unknown as ConjugationSet;

  return { infinitive, translation, present, past, future, presentPerfect };
}

const ENTRIES: Entry[] = [
  { infinitive: 'putzen', translation: 'to clean' },
  { infinitive: 'wischen', translation: 'to wipe / mop' },
  { infinitive: 'schrubben', translation: 'to scrub' },
  { infinitive: 'pflücken', translation: 'to pick' },
  { infinitive: 'pflanzen', translation: 'to plant' },
  { infinitive: 'säen', translation: 'to sow' },
  { infinitive: 'sprühen', translation: 'to spray' },
  { infinitive: 'harken', translation: 'to rake' },
  { infinitive: 'üben', translation: 'to practice' },
  { infinitive: 'joggen', translation: 'to jog' },
  { infinitive: 'ruhen', translation: 'to rest' },
  { infinitive: 'atmen', translation: 'to breathe' },
  { infinitive: 'husten', translation: 'to cough' },
  { infinitive: 'niesen', translation: 'to sneeze' },
  { infinitive: 'zählen', translation: 'to count' },
  { infinitive: 'rechnen', translation: 'to calculate / do math' },
  { infinitive: 'kalkulieren', translation: 'to calculate / estimate', type: 'ieren' },
  { infinitive: 'planen', translation: 'to plan' },
  { infinitive: 'packen', translation: 'to pack' },
  { infinitive: 'checken', translation: 'to check' },
  { infinitive: 'klagen', translation: 'to complain / sue' },
  { infinitive: 'managen', translation: 'to manage' },
  { infinitive: 'mieten', translation: 'to rent' },
  { infinitive: 'stoppen', translation: 'to stop' },
  { infinitive: 'warnen', translation: 'to warn' },
  { infinitive: 'melden', translation: 'to report / announce' },
  { infinitive: 'drucken', translation: 'to print' },
  { infinitive: 'kleben', translation: 'to paste / glue' },
  { infinitive: 'löschen', translation: 'to delete' },
  { infinitive: 'retten', translation: 'to save / rescue' },
  { infinitive: 'telefonieren', translation: 'to phone', type: 'ieren' },
  { infinitive: 'mailen', translation: 'to email' },
  { infinitive: 'programmieren', translation: 'to program', type: 'ieren' },
  { infinitive: 'scannen', translation: 'to scan' },
  { infinitive: 'installieren', translation: 'to install', type: 'ieren' },
  { infinitive: 'sortieren', translation: 'to sort', type: 'ieren' },
  { infinitive: 'kombinieren', translation: 'to combine', type: 'ieren' },
  { infinitive: 'testen', translation: 'to test' },
  { infinitive: 'evaluieren', translation: 'to evaluate', type: 'ieren' },
  { infinitive: 'klassifizieren', translation: 'to classify', type: 'ieren' },
  { infinitive: 'kategorisieren', translation: 'to categorize', type: 'ieren' },
  { infinitive: 'analysieren', translation: 'to analyze', type: 'ieren' },
  { infinitive: 'interpretieren', translation: 'to interpret', type: 'ieren' },
  { infinitive: 'resultieren', translation: 'to result', type: 'ieren' },
  { infinitive: 'generieren', translation: 'to generate', type: 'ieren' },
  { infinitive: 'reservieren', translation: 'to reserve', type: 'ieren' },
  { infinitive: 'stornieren', translation: 'to cancel', type: 'ieren' },
  { infinitive: 'korrigieren', translation: 'to correct', type: 'ieren' },
  { infinitive: 'redigieren', translation: 'to edit', type: 'ieren' },
  { infinitive: 'produzieren', translation: 'to produce', type: 'ieren' },
  { infinitive: 'importieren', translation: 'to import', type: 'ieren' },
  { infinitive: 'exportieren', translation: 'to export', type: 'ieren' },
  { infinitive: 'transportieren', translation: 'to transport', type: 'ieren' },
  { infinitive: 'signieren', translation: 'to sign (an autograph)', type: 'ieren' },
  { infinitive: 'notieren', translation: 'to note down', type: 'ieren' },
  { infinitive: 'fotokopieren', translation: 'to photocopy', type: 'ieren' },
  { infinitive: 'küssen', translation: 'to kiss' },
  { infinitive: 'grüßen', translation: 'to greet' },
  { infinitive: 'gratulieren', translation: 'to congratulate', type: 'ieren' },
  { infinitive: 'trösten', translation: 'to comfort' },
  { infinitive: 'motivieren', translation: 'to motivate', type: 'ieren' },
  { infinitive: 'inspirieren', translation: 'to inspire', type: 'ieren' },
  { infinitive: 'irritieren', translation: 'to irritate', type: 'ieren' },
  { infinitive: 'nerven', translation: 'to annoy / get on nerves' },
  { infinitive: 'schockieren', translation: 'to shock', type: 'ieren' },
  { infinitive: 'imponieren', translation: 'to impress', type: 'ieren' },
  { infinitive: 'faszinieren', translation: 'to fascinate', type: 'ieren' },
  { infinitive: 'amüsieren', translation: 'to amuse', type: 'ieren' },
  { infinitive: 'respektieren', translation: 'to respect', type: 'ieren' },
  { infinitive: 'wählen', translation: 'to choose / vote' },
  { infinitive: 'stimmen', translation: 'to vote / be correct' },
  { infinitive: 'protestieren', translation: 'to protest', type: 'ieren' },
  { infinitive: 'kooperieren', translation: 'to cooperate', type: 'ieren' },
  { infinitive: 'konkurrieren', translation: 'to compete', type: 'ieren' },
  { infinitive: 'kollaborieren', translation: 'to collaborate', type: 'ieren' },
  { infinitive: 'fusionieren', translation: 'to merge', type: 'ieren' },
  { infinitive: 'finanzieren', translation: 'to finance', type: 'ieren' },
  { infinitive: 'sponsern', translation: 'to sponsor', type: 'ern' },
  { infinitive: 'spenden', translation: 'to donate' },
  { infinitive: 'sparen', translation: 'to save (money)' },
  { infinitive: 'garantieren', translation: 'to guarantee', type: 'ieren' },
  { infinitive: 'riskieren', translation: 'to risk', type: 'ieren' },
  { infinitive: 'wünschen', translation: 'to wish' },
  { infinitive: 'fokussieren', translation: 'to focus', type: 'ieren' },
  { infinitive: 'konzentrieren', translation: 'to concentrate', type: 'ieren' },
  { infinitive: 'meditieren', translation: 'to meditate', type: 'ieren' },
  { infinitive: 'relaxen', translation: 'to relax' },
  { infinitive: 'demonstrieren', translation: 'to demonstrate', type: 'ieren' },
  { infinitive: 'diskutieren', translation: 'to discuss', type: 'ieren' },
  { infinitive: 'wandern', translation: 'to hike', type: 'ern' },
  { infinitive: 'feiern', translation: 'to celebrate', type: 'ern' },
  { infinitive: 'klettern', translation: 'to climb', type: 'ern' },
  { infinitive: 'hämmern', translation: 'to hammer', type: 'ern' },
  { infinitive: 'liefern', translation: 'to deliver', type: 'ern' },
  { infinitive: 'fordern', translation: 'to demand', type: 'ern' },
  { infinitive: 'ärgern', translation: 'to annoy', type: 'ern' },
  { infinitive: 'schleudern', translation: 'to spin / hurl', type: 'ern' },
  { infinitive: 'plaudern', translation: 'to chat', type: 'ern' },
  { infinitive: 'zittern', translation: 'to shiver / tremble', type: 'ern' },
  { infinitive: 'kochen', translation: 'to cook' },
  { infinitive: 'grillen', translation: 'to grill' },
  { infinitive: 'rösten', translation: 'to roast / toast' },
  { infinitive: 'würzen', translation: 'to season / spice' },
  { infinitive: 'servieren', translation: 'to serve (food)', type: 'ieren' },
  { infinitive: 'probieren', translation: 'to try / taste', type: 'ieren' },
  { infinitive: 'schmecken', translation: 'to taste' },
  { infinitive: 'tasten', translation: 'to feel / touch tentatively' },
  { infinitive: 'danken', translation: 'to thank' },
  { infinitive: 'loben', translation: 'to praise' },
  { infinitive: 'schimpfen', translation: 'to scold / curse' },
];

export const GERMAN_VERBS_EXTRA: Verb[] = ENTRIES.map((entry, i) => ({
  id: `vt-de-x-${i + 1}`,
  languageId: 'de',
  ...conjugate(entry),
}));
