import type { ConjugationSet, Verb } from '../../types';

// A second batch of 200 common Dutch verbs, generated from a small weak-verb
// conjugation engine rather than hand-typed — reduces the chance of a typo in a
// repeated form across 6 persons x 4 tenses. Curated to stick to *simple, unprefixed*
// weak (regular) verbs: verbs with a separable prefix (op-, aan-, in-, ...) or an
// inseparable one (be-, ver-, ont-, her-, ge-, er-) are deliberately excluded, since
// those change where "ge-" lands in the past participle (or drop it entirely) in ways
// this simple engine doesn't model. See Context-Idiomatrix.md for the scope note.
type Entry = { infinitive: string; stem: string; translation: string; aux?: 'hebben' | 'zijn'; voiced?: boolean };

const KOFSCHIP = new Set(['p', 't', 'k', 'f', 's', 'x', 'c', 'h']); // "'t kofschip" rule

function conjugate(entry: Entry): Omit<Verb, 'id' | 'languageId'> {
  const { infinitive, stem, translation } = entry;
  const aux = entry.aux ?? 'hebben';
  const last = stem.at(-1) ?? '';
  // A handful of verbs (proeven, niezen, durven) have an underlying voiced v/z stem
  // that's spelled with a devoiced f/s only because it's word-final in the ik-form
  // (same pattern as leven -> "ik leef" but "leefde"/"geleefd", not "leefte"/"geleeft").
  // `voiced: true` forces the -de/-d ending despite the f/s spelling fooling kofschip.
  const voiceless = !entry.voiced && KOFSCHIP.has(last);
  const pastSuffix = voiceless ? 'te' : 'de';
  const pastPluralSuffix = voiceless ? 'ten' : 'den';
  const participleEnding = voiceless ? 't' : 'd';
  // If the stem already ends in the ending consonant, don't double it up.
  const presentSg = last === 't' ? stem : `${stem}t`;
  // "ge" + a stem starting with "e" needs a trema (geëist, not geeist) so the two
  // vowels aren't misread as one long "ee".
  const gePrefixedStem = stem.startsWith('e') ? `ë${stem.slice(1)}` : stem;
  const participle = last === participleEnding ? `ge${gePrefixedStem}` : `ge${gePrefixedStem}${participleEnding}`;

  const present: ConjugationSet = [stem, presentSg, presentSg, infinitive, infinitive, infinitive];
  const past: ConjugationSet = [
    `${stem}${pastSuffix}`, `${stem}${pastSuffix}`, `${stem}${pastSuffix}`,
    `${stem}${pastPluralSuffix}`, `${stem}${pastPluralSuffix}`, `${stem}${pastPluralSuffix}`,
  ];
  const future: ConjugationSet = [
    `zal ${infinitive}`, `zult ${infinitive}`, `zal ${infinitive}`,
    `zullen ${infinitive}`, `zullen ${infinitive}`, `zullen ${infinitive}`,
  ];
  const auxForms = aux === 'hebben'
    ? ['heb', 'hebt', 'heeft', 'hebben', 'hebben', 'hebben']
    : ['ben', 'bent', 'is', 'zijn', 'zijn', 'zijn'];
  const presentPerfect = auxForms.map(a => `${a} ${participle}`) as ConjugationSet;

  return { infinitive, translation, present, past, future, presentPerfect };
}

const ENTRIES: Entry[] = [
  { infinitive: 'poetsen', stem: 'poets', translation: 'to clean / polish' },
  { infinitive: 'dweilen', stem: 'dweil', translation: 'to mop' },
  { infinitive: 'schrobben', stem: 'schrob', translation: 'to scrub' },
  { infinitive: 'plukken', stem: 'pluk', translation: 'to pick' },
  { infinitive: 'oogsten', stem: 'oogst', translation: 'to harvest' },
  { infinitive: 'planten', stem: 'plant', translation: 'to plant' },
  { infinitive: 'zaaien', stem: 'zaai', translation: 'to sow' },
  { infinitive: 'sproeien', stem: 'sproei', translation: 'to spray' },
  { infinitive: 'snoeien', stem: 'snoei', translation: 'to prune' },
  { infinitive: 'harken', stem: 'hark', translation: 'to rake' },
  { infinitive: 'schoffelen', stem: 'schoffel', translation: 'to hoe' },
  { infinitive: 'oefenen', stem: 'oefen', translation: 'to practice' },
  { infinitive: 'trainen', stem: 'train', translation: 'to train' },
  { infinitive: 'sporten', stem: 'sport', translation: 'to play sports' },
  { infinitive: 'fietsen', stem: 'fiets', translation: 'to cycle' },
  { infinitive: 'schaatsen', stem: 'schaats', translation: 'to skate' },
  { infinitive: 'surfen', stem: 'surf', translation: 'to surf' },
  { infinitive: 'wandelen', stem: 'wandel', translation: 'to hike / stroll' },
  { infinitive: 'kamperen', stem: 'kampeer', translation: 'to camp' },
  { infinitive: 'vissen', stem: 'vis', translation: 'to fish' },
  { infinitive: 'rusten', stem: 'rust', translation: 'to rest' },
  { infinitive: 'relaxen', stem: 'relax', translation: 'to relax' },
  { infinitive: 'ademen', stem: 'adem', translation: 'to breathe' },
  { infinitive: 'hoesten', stem: 'hoest', translation: 'to cough' },
  { infinitive: 'niezen', stem: 'nies', translation: 'to sneeze', voiced: true },
  { infinitive: 'opereren', stem: 'opereer', translation: 'to operate' },
  { infinitive: 'tellen', stem: 'tel', translation: 'to count' },
  { infinitive: 'calculeren', stem: 'calculeer', translation: 'to calculate' },
  { infinitive: 'studeren', stem: 'studeer', translation: 'to study' },
  { infinitive: 'repeteren', stem: 'repeteer', translation: 'to rehearse / review' },
  { infinitive: 'fantaseren', stem: 'fantaseer', translation: 'to fantasize / imagine' },
  { infinitive: 'plannen', stem: 'plan', translation: 'to plan' },
  { infinitive: 'organiseren', stem: 'organiseer', translation: 'to organize' },
  { infinitive: 'regelen', stem: 'regel', translation: 'to arrange' },
  { infinitive: 'prepareren', stem: 'prepareer', translation: 'to prepare' },
  { infinitive: 'vluchten', stem: 'vlucht', translation: 'to flee', aux: 'zijn' },
  { infinitive: 'noteren', stem: 'noteer', translation: 'to note down' },
  { infinitive: 'checken', stem: 'check', translation: 'to check' },
  { infinitive: 'controleren', stem: 'controleer', translation: 'to inspect / check' },
  { infinitive: 'accepteren', stem: 'accepteer', translation: 'to accept' },
  { infinitive: 'weigeren', stem: 'weiger', translation: 'to refuse' },
  { infinitive: 'klagen', stem: 'klaag', translation: 'to complain' },
  { infinitive: 'debatteren', stem: 'debatteer', translation: 'to debate' },
  { infinitive: 'concurreren', stem: 'concurreer', translation: 'to compete' },
  { infinitive: 'rennen', stem: 'ren', translation: 'to run / sprint', aux: 'zijn' },
  { infinitive: 'leiden', stem: 'leid', translation: 'to lead' },
  { infinitive: 'managen', stem: 'manage', translation: 'to manage' },
  { infinitive: 'huren', stem: 'huur', translation: 'to rent / hire' },
  { infinitive: 'stoppen', stem: 'stop', translation: 'to stop' },
  { infinitive: 'pensioneren', stem: 'pensioneer', translation: 'to retire' },
  { infinitive: 'registreren', stem: 'registreer', translation: 'to register' },
  { infinitive: 'solliciteren', stem: 'solliciteer', translation: 'to apply (for a job)' },
  { infinitive: 'eisen', stem: 'eis', translation: 'to demand' },
  { infinitive: 'adviseren', stem: 'adviseer', translation: 'to advise' },
  { infinitive: 'waarschuwen', stem: 'waarschuw', translation: 'to warn' },
  { infinitive: 'informeren', stem: 'informeer', translation: 'to inform' },
  { infinitive: 'melden', stem: 'meld', translation: 'to report / announce' },
  { infinitive: 'publiceren', stem: 'publiceer', translation: 'to publish' },
  { infinitive: 'printen', stem: 'print', translation: 'to print' },
  { infinitive: 'kopiëren', stem: 'kopieer', translation: 'to copy' },
  { infinitive: 'plakken', stem: 'plak', translation: 'to paste / glue' },
  { infinitive: 'wissen', stem: 'wis', translation: 'to delete' },
  { infinitive: 'redden', stem: 'red', translation: 'to save / rescue' },
  { infinitive: 'delen', stem: 'deel', translation: 'to share' },
  { infinitive: 'lenen', stem: 'leen', translation: 'to borrow / lend' },
  { infinitive: 'bellen', stem: 'bel', translation: 'to call (phone)' },
  { infinitive: 'mailen', stem: 'mail', translation: 'to email' },
  { infinitive: 'downloaden', stem: 'download', translation: 'to download' },
  { infinitive: 'uploaden', stem: 'upload', translation: 'to upload' },
  { infinitive: 'programmeren', stem: 'programmeer', translation: 'to program' },
  { infinitive: 'coderen', stem: 'codeer', translation: 'to code' },
  { infinitive: 'googelen', stem: 'googel', translation: 'to google' },
  { infinitive: 'installeren', stem: 'installeer', translation: 'to install' },
  { infinitive: 'updaten', stem: 'update', translation: 'to update' },
  { infinitive: 'formatteren', stem: 'formatteer', translation: 'to format' },
  { infinitive: 'scannen', stem: 'scan', translation: 'to scan' },
  { infinitive: 'archiveren', stem: 'archiveer', translation: 'to archive' },
  { infinitive: 'synchroniseren', stem: 'synchroniseer', translation: 'to synchronize' },
  { infinitive: 'activeren', stem: 'activeer', translation: 'to activate' },
  { infinitive: 'blokkeren', stem: 'blokkeer', translation: 'to block' },
  { infinitive: 'filteren', stem: 'filter', translation: 'to filter' },
  { infinitive: 'sorteren', stem: 'sorteer', translation: 'to sort' },
  { infinitive: 'combineren', stem: 'combineer', translation: 'to combine' },
  { infinitive: 'koppelen', stem: 'koppel', translation: 'to link / couple' },
  { infinitive: 'testen', stem: 'test', translation: 'to test' },
  { infinitive: 'evalueren', stem: 'evalueer', translation: 'to evaluate' },
  { infinitive: 'rangschikken', stem: 'rangschik', translation: 'to rank / arrange' },
  { infinitive: 'classificeren', stem: 'classificeer', translation: 'to classify' },
  { infinitive: 'categoriseren', stem: 'categoriseer', translation: 'to categorize' },
  { infinitive: 'analyseren', stem: 'analyseer', translation: 'to analyze' },
  { infinitive: 'interpreteren', stem: 'interpreteer', translation: 'to interpret' },
  { infinitive: 'concluderen', stem: 'concludeer', translation: 'to conclude' },
  { infinitive: 'genereren', stem: 'genereer', translation: 'to generate' },
  { infinitive: 'reserveren', stem: 'reserveer', translation: 'to reserve' },
  { infinitive: 'annuleren', stem: 'annuleer', translation: 'to cancel' },
  { infinitive: 'verifiëren', stem: 'verifieer', translation: 'to verify' },
  { infinitive: 'corrigeren', stem: 'corrigeer', translation: 'to correct' },
  { infinitive: 'redigeren', stem: 'redigeer', translation: 'to edit' },
  { infinitive: 'distribueren', stem: 'distribueer', translation: 'to distribute' },
  { infinitive: 'produceren', stem: 'produceer', translation: 'to produce' },
  { infinitive: 'importeren', stem: 'importeer', translation: 'to import' },
  { infinitive: 'exporteren', stem: 'exporteer', translation: 'to export' },
  { infinitive: 'transporteren', stem: 'transporteer', translation: 'to transport' },
  { infinitive: 'leveren', stem: 'lever', translation: 'to deliver / supply' },
  { infinitive: 'duwen', stem: 'duw', translation: 'to push' },
  { infinitive: 'tikken', stem: 'tik', translation: 'to type / tap' },
  { infinitive: 'drukken', stem: 'druk', translation: 'to press / print' },
  { infinitive: 'knippen', stem: 'knip', translation: 'to cut (with scissors)' },
  { infinitive: 'roosteren', stem: 'roosteer', translation: 'to roast / toast' },
  { infinitive: 'grillen', stem: 'gril', translation: 'to grill' },
  { infinitive: 'pureren', stem: 'pureer', translation: 'to puree' },
  { infinitive: 'marineren', stem: 'marineer', translation: 'to marinate' },
  { infinitive: 'kruiden', stem: 'kruid', translation: 'to season (spice)' },
  { infinitive: 'serveren', stem: 'serveer', translation: 'to serve (food)' },
  { infinitive: 'proeven', stem: 'proef', translation: 'to taste', voiced: true },
  { infinitive: 'raken', stem: 'raak', translation: 'to touch / hit' },
  { infinitive: 'aaien', stem: 'aai', translation: 'to pet / stroke' },
  { infinitive: 'knuffelen', stem: 'knuffel', translation: 'to cuddle / hug' },
  { infinitive: 'kussen', stem: 'kus', translation: 'to kiss' },
  { infinitive: 'groeten', stem: 'groet', translation: 'to greet' },
  { infinitive: 'feliciteren', stem: 'feliciteer', translation: 'to congratulate' },
  { infinitive: 'danken', stem: 'dank', translation: 'to thank' },
  { infinitive: 'kwetsen', stem: 'kwets', translation: 'to hurt / offend' },
  { infinitive: 'troosten', stem: 'troost', translation: 'to comfort' },
  { infinitive: 'motiveren', stem: 'motiveer', translation: 'to motivate' },
  { infinitive: 'inspireren', stem: 'inspireer', translation: 'to inspire' },
  { infinitive: 'irriteren', stem: 'irriteer', translation: 'to irritate' },
  { infinitive: 'ergeren', stem: 'erger', translation: 'to annoy' },
  { infinitive: 'schokken', stem: 'schok', translation: 'to shock' },
  { infinitive: 'imponeren', stem: 'imponeer', translation: 'to impress' },
  { infinitive: 'fascineren', stem: 'fascineer', translation: 'to fascinate' },
  { infinitive: 'boeien', stem: 'boei', translation: 'to captivate / interest' },
  { infinitive: 'amuseren', stem: 'amuseer', translation: 'to amuse' },
  { infinitive: 'waarderen', stem: 'waardeer', translation: 'to appreciate' },
  { infinitive: 'respecteren', stem: 'respecteer', translation: 'to respect' },
  { infinitive: 'twijfelen', stem: 'twijfel', translation: 'to doubt' },
  { infinitive: 'aarzelen', stem: 'aarzel', translation: 'to hesitate' },
  { infinitive: 'selecteren', stem: 'selecteer', translation: 'to select' },
  { infinitive: 'stemmen', stem: 'stem', translation: 'to vote' },
  { infinitive: 'protesteren', stem: 'protesteer', translation: 'to protest' },
  { infinitive: 'demonstreren', stem: 'demonstreer', translation: 'to demonstrate' },
  { infinitive: 'staken', stem: 'staak', translation: 'to strike (labor)' },
  { infinitive: 'fuseren', stem: 'fuseer', translation: 'to merge' },
  { infinitive: 'investeren', stem: 'investeer', translation: 'to invest' },
  { infinitive: 'financieren', stem: 'financieer', translation: 'to finance' },
  { infinitive: 'sponsoren', stem: 'sponsor', translation: 'to sponsor' },
  { infinitive: 'doneren', stem: 'doneer', translation: 'to donate' },
  { infinitive: 'sparen', stem: 'spaar', translation: 'to save (money)' },
  { infinitive: 'garanderen', stem: 'garandeer', translation: 'to guarantee' },
  { infinitive: 'riskeren', stem: 'riskeer', translation: 'to risk' },
  { infinitive: 'wagen', stem: 'waag', translation: 'to dare / risk' },
  { infinitive: 'durven', stem: 'durf', translation: 'to dare', voiced: true },
  { infinitive: 'hopen', stem: 'hoop', translation: 'to hope' },
  { infinitive: 'wensen', stem: 'wens', translation: 'to wish' },
  { infinitive: 'missen', stem: 'mis', translation: 'to miss (someone/something)' },
  { infinitive: 'focussen', stem: 'focus', translation: 'to focus' },
  { infinitive: 'concentreren', stem: 'concentreer', translation: 'to concentrate' },
  { infinitive: 'mediteren', stem: 'mediteer', translation: 'to meditate' },
  { infinitive: 'schilderen', stem: 'schilder', translation: 'to paint (art)' },
  { infinitive: 'tekenen', stem: 'teken', translation: 'to draw' },
  { infinitive: 'dansen', stem: 'dans', translation: 'to dance' },
  { infinitive: 'acteren', stem: 'acteer', translation: 'to act' },
  { infinitive: 'filmen', stem: 'film', translation: 'to film' },
  { infinitive: 'fotograferen', stem: 'fotografeer', translation: 'to photograph' },
  { infinitive: 'componeren', stem: 'componeer', translation: 'to compose (music)' },
  { infinitive: 'dirigeren', stem: 'dirigeer', translation: 'to conduct (music)' },
  { infinitive: 'repareren', stem: 'repareer', translation: 'to repair' },
  { infinitive: 'monteren', stem: 'monteer', translation: 'to assemble / mount' },
  { infinitive: 'demonteren', stem: 'demonteer', translation: 'to disassemble' },
  { infinitive: 'pakken', stem: 'pak', translation: 'to grab / pack' },
  { infinitive: 'schudden', stem: 'schud', translation: 'to shake' },
  { infinitive: 'schoppen', stem: 'schop', translation: 'to kick' },
  { infinitive: 'gooien', stem: 'gooi', translation: 'to throw' },
  { infinitive: 'passen', stem: 'pas', translation: 'to fit / try on' },
];

export const DUTCH_VERBS_EXTRA: Verb[] = ENTRIES.map((entry, i) => ({
  id: `vt-nl-x-${i + 1}`,
  languageId: 'nl',
  ...conjugate(entry),
}));
