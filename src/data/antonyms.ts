import type { Antonym } from '../types';

// Same 25-word vocabulary per language as synonyms.ts (mooi/groot/klein/... etc.) so a
// learner reviewing one feature sees the same headwords in the other — most pairs are
// each other's antonym within the list itself (mooi<->lelijk, groot<->klein, ...);
// the rest (boos, bang, leuk, belangrijk, praten, kijken, lopen) pair with a word
// outside the list.
type Entry = readonly [string, string[], string];

function makeEntries(languageId: string, prefix: string, entries: Entry[]): Antonym[] {
  return entries.map(([word, antonyms, translation], i) => ({
    id: `ant-${prefix}-${i + 1}`,
    languageId,
    word,
    antonyms,
    translation,
  }));
}

const DUTCH_ANTONYMS = makeEntries('nl', 'nl', [
  ['mooi',       ['lelijk'],      'beautiful'],
  ['groot',      ['klein'],       'big'],
  ['klein',      ['groot'],       'small'],
  ['snel',       ['langzaam'],    'fast'],
  ['langzaam',   ['snel'],        'slow'],
  ['blij',       ['verdrietig'],  'happy'],
  ['verdrietig', ['blij'],        'sad'],
  ['boos',       ['kalm'],        'angry'],
  ['bang',       ['moedig'],      'afraid'],
  ['slim',       ['dom'],         'smart'],
  ['dom',        ['slim'],        'stupid'],
  ['sterk',      ['zwak'],        'strong'],
  ['zwak',       ['sterk'],       'weak'],
  ['makkelijk',  ['moeilijk'],    'easy'],
  ['moeilijk',   ['makkelijk'],   'difficult'],
  ['leuk',       ['saai'],        'nice / fun'],
  ['lelijk',     ['mooi'],        'ugly'],
  ['rijk',       ['arm'],         'rich'],
  ['arm',        ['rijk'],        'poor'],
  ['belangrijk', ['onbelangrijk'],'important'],
  ['praten',     ['zwijgen'],     'to talk'],
  ['kijken',     ['wegkijken'],   'to look'],
  ['lopen',      ['stilstaan'],   'to walk'],
  ['beginnen',   ['eindigen'],    'to begin'],
  ['eindigen',   ['beginnen'],    'to end'],
]);

const SPANISH_ANTONYMS = makeEntries('es', 'es', [
  ['bonito',     ['feo'],           'beautiful'],
  ['grande',     ['pequeño'],       'big'],
  ['pequeño',    ['grande'],        'small'],
  ['rápido',     ['lento'],         'fast'],
  ['lento',      ['rápido'],        'slow'],
  ['feliz',      ['triste'],        'happy'],
  ['triste',     ['feliz'],         'sad'],
  ['enojado',    ['tranquilo'],     'angry'],
  ['asustado',   ['valiente'],      'afraid'],
  ['inteligente',['tonto'],         'smart'],
  ['tonto',      ['inteligente'],   'stupid'],
  ['fuerte',     ['débil'],         'strong'],
  ['débil',      ['fuerte'],        'weak'],
  ['fácil',      ['difícil'],       'easy'],
  ['difícil',    ['fácil'],         'difficult'],
  ['divertido',  ['aburrido'],      'fun'],
  ['feo',        ['bonito'],        'ugly'],
  ['rico',       ['pobre'],         'rich'],
  ['pobre',      ['rico'],          'poor'],
  ['importante', ['insignificante'],'important'],
  ['hablar',     ['callar'],        'to talk'],
  ['mirar',      ['ignorar'],       'to look'],
  ['caminar',    ['detenerse'],     'to walk'],
  ['empezar',    ['terminar'],      'to begin'],
  ['terminar',   ['empezar'],       'to end'],
]);

const ENGLISH_ANTONYMS = makeEntries('en', 'en', [
  ['beautiful', ['ugly'],          'beautiful'],
  ['big',       ['small'],         'big'],
  ['small',     ['big'],           'small'],
  ['fast',      ['slow'],          'fast'],
  ['slow',      ['fast'],          'slow'],
  ['happy',     ['sad'],           'happy'],
  ['sad',       ['happy'],         'sad'],
  ['angry',     ['calm'],          'angry'],
  ['afraid',    ['brave'],         'afraid'],
  ['smart',     ['stupid'],        'smart'],
  ['stupid',    ['smart'],         'stupid'],
  ['strong',    ['weak'],          'strong'],
  ['weak',      ['strong'],        'weak'],
  ['easy',      ['difficult'],     'easy'],
  ['difficult', ['easy'],          'difficult'],
  ['funny',     ['boring'],        'funny'],
  ['ugly',      ['beautiful'],     'ugly'],
  ['rich',      ['poor'],          'rich'],
  ['poor',      ['rich'],          'poor'],
  ['important', ['unimportant'],   'important'],
  ['talk',      ['stay silent'],   'to talk'],
  ['look',      ['ignore'],        'to look'],
  ['walk',      ['stand still'],   'to walk'],
  ['begin',     ['end'],           'to begin'],
  ['end',       ['begin'],         'to end'],
]);

const GERMAN_ANTONYMS = makeEntries('de', 'de', [
  ['schön',     ['hässlich'],     'beautiful'],
  ['groß',      ['klein'],        'big'],
  ['klein',     ['groß'],         'small'],
  ['schnell',   ['langsam'],      'fast'],
  ['langsam',   ['schnell'],      'slow'],
  ['glücklich', ['traurig'],      'happy'],
  ['traurig',   ['glücklich'],    'sad'],
  ['wütend',    ['ruhig'],        'angry'],
  ['ängstlich', ['mutig'],        'afraid'],
  ['klug',      ['dumm'],         'smart'],
  ['dumm',      ['klug'],         'stupid'],
  ['stark',     ['schwach'],      'strong'],
  ['schwach',   ['stark'],        'weak'],
  ['einfach',   ['schwierig'],    'easy'],
  ['schwierig', ['einfach'],      'difficult'],
  ['lustig',    ['langweilig'],   'funny'],
  ['hässlich',  ['schön'],        'ugly'],
  ['reich',     ['arm'],          'rich'],
  ['arm',       ['reich'],        'poor'],
  ['wichtig',   ['unwichtig'],    'important'],
  ['sprechen',  ['schweigen'],    'to talk'],
  ['schauen',   ['wegschauen'],   'to look'],
  ['gehen',     ['stehenbleiben'],'to walk'],
  ['anfangen',  ['beenden'],      'to begin'],
  ['beenden',   ['anfangen'],     'to end'],
]);

// Nouns pulled in from the Articles dictionary (src/data/nounArticles.ts) that have a
// genuine opposite — most concrete nouns there (dog, table, chair, apple...) don't, so
// this is a curated subset of the abstract/concept nouns, not an exhaustive merge of
// all ~1000 Dutch entries. Several pairs are each other's antonym within the Dutch list
// itself (begin<->einde, geluk<->ongeluk, orde<->chaos, voordeel<->nadeel,
// stijging<->daling, gezondheid<->ziekte, genot<->pijn); the rest pair with a word
// outside the curated dictionaries. See Context-Idiomatrix.md for the scope decision.
const DUTCH_NOUN_ANTONYMS = makeEntries('nl', 'nl-n', [
  ['begin',       ['einde'],         'beginning'],
  ['einde',       ['begin'],         'end'],
  ['geluk',       ['ongeluk'],       'happiness / luck'],
  ['ongeluk',     ['geluk'],         'accident / misfortune'],
  ['vreugde',     ['verdriet'],      'joy'],
  ['verdriet',    ['vreugde'],       'sadness / grief'],
  ['liefde',      ['haat'],          'love'],
  ['orde',        ['chaos'],         'order'],
  ['chaos',       ['orde'],          'chaos'],
  ['voordeel',    ['nadeel'],        'advantage'],
  ['nadeel',      ['voordeel'],      'disadvantage'],
  ['stijging',    ['daling'],        'increase / rise'],
  ['daling',      ['stijging'],      'decrease / decline'],
  ['vrede',       ['oorlog'],        'peace'],
  ['vrijheid',    ['gevangenschap'], 'freedom'],
  ['succes',      ['mislukking'],    'success'],
  ['macht',       ['onmacht'],       'power'],
  ['hoop',        ['wanhoop'],       'hope'],
  ['angst',       ['moed'],          'fear / anxiety'],
  ['groei',       ['krimp'],         'growth'],
  ['verbetering', ['verslechtering'],'improvement'],
  ['winst',       ['verlies'],       'profit / win'],
  ['leven',       ['dood'],          'life'],
  ['gezondheid',  ['ziekte'],        'health'],
  ['ziekte',      ['gezondheid'],    'illness / disease'],
  ['pijn',        ['genot'],         'pain'],
  ['genot',       ['pijn'],          'pleasure'],
  ['schuld',      ['onschuld'],      'debt / guilt'],
]);

// Small es/en/de Articles lists are almost entirely concrete everyday objects (dog,
// table, apple...) with no real antonyms — "day/night" and "man/woman" are the two
// clean reciprocal pairs, both already present within each of the 3 small lists.
const SPANISH_NOUN_ANTONYMS = makeEntries('es', 'es-n', [
  ['día',    ['noche'], 'day'],
  ['noche',  ['día'],   'night'],
  ['hombre', ['mujer'], 'man'],
  ['mujer',  ['hombre'],'woman'],
]);
const ENGLISH_NOUN_ANTONYMS = makeEntries('en', 'en-n', [
  ['day',   ['night'], 'day'],
  ['night', ['day'],   'night'],
  ['man',   ['woman'], 'man'],
  ['woman', ['man'],   'woman'],
]);
const GERMAN_NOUN_ANTONYMS = makeEntries('de', 'de-n', [
  ['Tag',   ['Nacht'], 'day'],
  ['Nacht', ['Tag'],   'night'],
  ['Mann',  ['Frau'],  'man'],
  ['Frau',  ['Mann'],  'woman'],
]);

export const ANTONYMS: Antonym[] = [
  ...DUTCH_ANTONYMS,
  ...SPANISH_ANTONYMS,
  ...ENGLISH_ANTONYMS,
  ...GERMAN_ANTONYMS,
  ...DUTCH_NOUN_ANTONYMS,
  ...SPANISH_NOUN_ANTONYMS,
  ...ENGLISH_NOUN_ANTONYMS,
  ...GERMAN_NOUN_ANTONYMS,
];
