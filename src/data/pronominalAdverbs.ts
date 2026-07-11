import type { AdverbId, PronominalAdverbExercise } from '../types';

// The 4 Dutch pronominal adverbs: unstressed "er" (anaphoric "it/them") plus the
// stressed/deictic "hier"/"daar" and the interrogative "waar", each of which combines
// with a fixed preposition (eraan, hieraan, daaraan, waaraan, ...) and can split from
// that preposition elsewhere in the clause — e.g. "Ik denk er vaak aan."
export const ADVERBS: { id: AdverbId; label: string; meaning: string }[] = [
  { id: 'er',   label: 'er',   meaning: 'it/them' },
  { id: 'hier', label: 'hier', meaning: 'this' },
  { id: 'daar', label: 'daar', meaning: 'that' },
  { id: 'waar', label: 'waar', meaning: 'what/which' },
];

type PersonId = 'ik' | 'je' | 'hij' | 'wij' | 'jullie' | 'zij';
// "je" (not "jij") throughout — pairs with the inverted-question t-drop rule below.
const PERSONS: PersonId[] = ['ik', 'je', 'hij', 'wij', 'jullie', 'zij'];
const PRONOUNS: Record<PersonId, string> = { ik: 'ik', je: 'je', hij: 'hij', wij: 'wij', jullie: 'jullie', zij: 'zij' };
const REFLEXIVE: Record<PersonId, string> = { ik: 'me', je: 'je', hij: 'zich', wij: 'ons', jullie: 'je', zij: 'zich' };

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Regular present-tense conjugation, one form per person.
type Conj = Record<PersonId, string>;

// When the subject "je" is inverted (comes after the verb, as in a fronted-adverb
// question), Dutch drops the verb's regular -t ending — "je denkt" but "denk je".
// This applies to every verb here except the further-contracted modal "kunnen"
// (kun je, not "kan je"), which supplies its own explicit override.
function questionConj(decl: Conj, jeOverride?: string): Conj {
  return { ...decl, je: jeOverride ?? decl.ik };
}

const VERBS = {
  denken:  { ik: 'denk',   je: 'denkt',   hij: 'denkt',   wij: 'denken',  jullie: 'denken',  zij: 'denken' } as Conj,
  staan:   { ik: 'sta',    je: 'staat',   hij: 'staat',   wij: 'staan',   jullie: 'staan',   zij: 'staan' } as Conj,
  geloven: { ik: 'geloof', je: 'gelooft', hij: 'gelooft', wij: 'geloven', jullie: 'geloven', zij: 'geloven' } as Conj,
  kijken:  { ik: 'kijk',   je: 'kijkt',   hij: 'kijkt',   wij: 'kijken',  jullie: 'kijken',  zij: 'kijken' } as Conj,
  geven:   { ik: 'geef',   je: 'geeft',   hij: 'geeft',   wij: 'geven',   jullie: 'geven',   zij: 'geven' } as Conj,
  lijden:  { ik: 'lijd',   je: 'lijdt',   hij: 'lijdt',   wij: 'lijden',  jullie: 'lijden',  zij: 'lijden' } as Conj,
  wachten: { ik: 'wacht',  je: 'wacht',   hij: 'wacht',   wij: 'wachten', jullie: 'wachten', zij: 'wachten' } as Conj,
  praten:  { ik: 'praat',  je: 'praat',   hij: 'praat',   wij: 'praten',  jullie: 'praten',  zij: 'praten' } as Conj,
  vechten: { ik: 'vecht',  je: 'vecht',   hij: 'vecht',   wij: 'vechten', jullie: 'vechten', zij: 'vechten' } as Conj,
  zijn:    { ik: 'ben',    je: 'bent',    hij: 'is',      wij: 'zijn',    jullie: 'zijn',    zij: 'zijn' } as Conj,
  kunnen:  { ik: 'kan',    je: 'kunt',    hij: 'kan',     wij: 'kunnen',  jullie: 'kunnen',  zij: 'kunnen' } as Conj,
};

type Guide = { en: string; es: string; de: string };

type PrepFamily = {
  id: string;
  label: string;
  meaning: string;
  modifiers: string[]; // 9 interchangeable degree/frequency words for this slot
  guides: Record<AdverbId, Guide>; // one representative guide per adverb, reused across all 50 variants
  build: (person: PersonId, isQuestion: boolean, modifier: string) => string;
};

// Most families share the same shape: "{Pron} {verb} ___ {modifier}[ mid] ___[ tail]." /
// "___ {verb} {pron} {modifier}[ mid] ___[ tail]?" — build() already emits the adverb
// and preposition slots as literal "___" placeholders (only the modifier is
// interpolated as real text), so its return value IS the final blanked sentence.
// `mid` inserts a fixed word BEFORE the final blank (e.g. "mee"'s "blij" — Dutch
// wants the adjective before the preposition: "erg blij mee", not "erg mee blij");
// `tail` inserts one AFTER it (e.g. "door"'s past participle "overtuigd", which goes
// at the very end of the clause). Only the reflexive "bij" family (modal + reflexive
// pronoun) needs a fully bespoke builder below.
function simpleBuilder(verb: Conj, opts?: { mid?: string; tail?: string }): PrepFamily['build'] {
  const qVerb = questionConj(verb);
  const mid = opts?.mid ? ` ${opts.mid}` : '';
  const tail = opts?.tail ? ` ${opts.tail}` : '';
  return (person, isQuestion, modifier) => {
    const pron = PRONOUNS[person];
    return isQuestion
      ? `___ ${qVerb[person]} ${pron} ${modifier}${mid} ___${tail}?`
      : `${capitalize(pron)} ${verb[person]} ___ ${modifier}${mid} ___${tail}.`;
  };
}

const PREP_FAMILIES: PrepFamily[] = [
  {
    id: 'aan', label: 'aan', meaning: 'to/at',
    modifiers: ['vaak', 'soms', 'regelmatig', 'wel eens', 'af en toe', 'meestal', 'steeds', 'voortdurend', 'constant'],
    build: simpleBuilder(VERBS.denken),
    guides: {
      er:   { en: 'I often think about it.',        es: 'A menudo pienso en ello.',      de: 'Ich denke oft daran.' },
      hier: { en: 'I often think about this.',       es: 'A menudo pienso en esto.',      de: 'Ich denke oft hieran.' },
      daar: { en: 'I often think about that.',        es: 'A menudo pienso en eso.',       de: 'Ich denke oft daran.' },
      waar: { en: 'What do you often think about?',   es: '¿En qué piensas a menudo?',     de: 'Woran denkst du oft?' },
    },
  },
  {
    id: 'achter', label: 'achter', meaning: 'behind',
    modifiers: ['volledig', 'helemaal', 'altijd', 'meestal', 'vaak', 'echt', 'absoluut', 'resoluut', 'volmondig'],
    build: simpleBuilder(VERBS.staan),
    guides: {
      er:   { en: 'I fully support it.',              es: 'Lo apoyo por completo.',        de: 'Ich stehe voll dahinter.' },
      hier: { en: 'I fully support this.',             es: 'Apoyo esto por completo.',      de: 'Ich stehe voll hierhinter.' },
      daar: { en: 'I fully support that.',             es: 'Apoyo eso por completo.',       de: 'Ich stehe voll dahinter.' },
      waar: { en: 'What do you fully support?',        es: '¿Qué apoyas por completo?',     de: 'Was unterstützt du voll und ganz?' },
    },
  },
  {
    id: 'bij', label: 'bij', meaning: 'with/by',
    modifiers: ['niets', 'weinig', 'nauwelijks iets', 'bijna niets', 'helemaal niets', 'niet veel', 'maar weinig', 'vrijwel niets', 'amper iets'],
    build: (person, isQuestion, modifier) => {
      const pron = PRONOUNS[person];
      const modal = questionConj(VERBS.kunnen, 'kun');
      const refl = REFLEXIVE[person];
      return isQuestion
        ? `___ ${modal[person]} ${pron} ${refl} ${modifier} ___ voorstellen?`
        : `${capitalize(pron)} ${VERBS.kunnen[person]} ${refl} ___ ${modifier} ___ voorstellen.`;
    },
    guides: {
      er:   { en: "I can't picture anything about it.",   es: 'No puedo imaginarme nada al respecto.',        de: 'Ich kann mir darunter nichts vorstellen.' },
      hier: { en: "I can't picture anything about this.",  es: 'No puedo imaginarme nada respecto a esto.',    de: 'Ich kann mir hierunter nichts vorstellen.' },
      daar: { en: "I can't picture anything about that.",  es: 'No puedo imaginarme nada respecto a eso.',     de: 'Ich kann mir darunter nichts vorstellen.' },
      waar: { en: "What can't you picture anything about?", es: '¿Respecto a qué no puedes imaginarte nada?',  de: 'Worunter kannst du dir nichts vorstellen?' },
    },
  },
  {
    id: 'door', label: 'door', meaning: 'through',
    modifiers: ['niet', 'nauwelijks', 'amper', 'niet volledig', 'niet helemaal', 'niet meteen', 'niet snel', 'maar moeilijk', 'absoluut niet'],
    build: simpleBuilder(VERBS.zijn, { tail: 'overtuigd' }),
    guides: {
      er:   { en: "It's entirely because of it.",   es: 'Se debe enteramente a ello.',   de: 'Es liegt ganz daran.' },
      hier: { en: "It's entirely because of this.",  es: 'Se debe enteramente a esto.',   de: 'Es liegt ganz hieran.' },
      daar: { en: "It's entirely because of that.",  es: 'Se debe enteramente a eso.',    de: 'Es liegt ganz daran.' },
      waar: { en: 'What is it entirely because of?', es: '¿A qué se debe enteramente?',   de: 'Woran liegt es ganz?' },
    },
  },
  {
    id: 'in', label: 'in', meaning: 'in',
    modifiers: ['echt', 'sterk', 'volledig', 'oprecht', 'vurig', 'rotsvast', 'blindelings', 'diep', 'onwrikbaar'],
    build: simpleBuilder(VERBS.geloven),
    guides: {
      er:   { en: 'I really believe in it.',    es: 'Realmente creo en ello.',   de: 'Ich glaube wirklich daran.' },
      hier: { en: 'I really believe in this.',   es: 'Realmente creo en esto.',   de: 'Ich glaube wirklich hieran.' },
      daar: { en: 'I really believe in that.',   es: 'Realmente creo en eso.',    de: 'Ich glaube wirklich daran.' },
      waar: { en: 'What do you really believe in?', es: '¿En qué crees realmente?', de: 'Woran glaubst du wirklich?' },
    },
  },
  {
    id: 'mee', label: 'mee / met', meaning: 'with',
    modifiers: ['erg', 'heel', 'ontzettend', 'oprecht', 'best', 'echt', 'zeer', 'uitermate', 'bijzonder'],
    build: simpleBuilder(VERBS.zijn, { mid: 'blij' }),
    guides: {
      er:   { en: "I'm happy with it.",   es: 'Estoy contento con ello.',  de: 'Ich bin damit zufrieden.' },
      hier: { en: "I'm happy with this.",  es: 'Estoy contento con esto.',  de: 'Ich bin hiermit zufrieden.' },
      daar: { en: "I'm happy with that.",  es: 'Estoy contento con eso.',   de: 'Ich bin damit zufrieden.' },
      waar: { en: 'What are you happy with?', es: '¿Con qué estás contento?', de: 'Womit bist du zufrieden?' },
    },
  },
  {
    id: 'naar', label: 'naar', meaning: 'to',
    modifiers: ['graag', 'vaak', 'altijd', 'dolgraag', 'regelmatig', 'elke dag', 'steeds weer', 'keer op keer', 'telkens'],
    build: simpleBuilder(VERBS.kijken),
    guides: {
      er:   { en: 'We like watching it.',   es: 'Nos gusta verlo.',      de: 'Wir schauen es uns gerne an.' },
      hier: { en: 'We like watching this.',  es: 'Nos gusta ver esto.',   de: 'Wir schauen uns das hier gerne an.' },
      daar: { en: 'We like watching that.',  es: 'Nos gusta ver eso.',    de: 'Wir schauen uns das da gerne an.' },
      waar: { en: 'What do you like watching?', es: '¿Qué os gusta ver?', de: 'Was schaut ihr euch gerne an?' },
    },
  },
  {
    id: 'om', label: 'om', meaning: 'around',
    modifiers: ['heel veel', 'ontzettend veel', 'erg veel', 'oprecht', 'echt veel', 'zoveel', 'meer dan wat ook', 'boven alles', 'enorm veel'],
    build: simpleBuilder(VERBS.geven),
    guides: {
      er:   { en: 'I care about it a lot.',   es: 'Me importa mucho.',       de: 'Es liegt mir sehr daran.' },
      hier: { en: 'I care about this a lot.',  es: 'Esto me importa mucho.',  de: 'Es liegt mir sehr hieran.' },
      daar: { en: 'I care about that a lot.',  es: 'Eso me importa mucho.',   de: 'Es liegt mir sehr daran.' },
      waar: { en: 'What do you care about a lot?', es: '¿Qué te importa mucho?', de: 'Woran liegt dir sehr viel?' },
    },
  },
  {
    id: 'onder', label: 'onder', meaning: 'under',
    modifiers: ['erg', 'ontzettend', 'zwaar', 'enorm', 'hevig', 'dagelijks', 'voortdurend', 'zichtbaar', 'danig'],
    build: simpleBuilder(VERBS.lijden),
    guides: {
      er:   { en: 'She suffers from it a lot.',   es: 'Sufre mucho por ello.',  de: 'Sie leidet sehr darunter.' },
      hier: { en: 'She suffers from this a lot.',  es: 'Sufre mucho por esto.',  de: 'Sie leidet sehr hierunter.' },
      daar: { en: 'She suffers from that a lot.',  es: 'Sufre mucho por eso.',   de: 'Sie leidet sehr darunter.' },
      waar: { en: 'What does she suffer from a lot?', es: '¿Por qué sufre tanto?', de: 'Worunter leidet sie sehr?' },
    },
  },
  {
    id: 'op', label: 'op', meaning: 'on',
    modifiers: ['al lang', 'al jaren', 'al weken', 'al maanden', 'geduldig', 'al een tijd', 'al zo lang', 'al de hele dag', 'al eindeloos'],
    build: simpleBuilder(VERBS.wachten),
    guides: {
      er:   { en: "We've been waiting for it for a long time.",  es: 'Llevamos mucho tiempo esperándolo.',    de: 'Wir warten schon lange darauf.' },
      hier: { en: "We've been waiting for this for a long time.", es: 'Llevamos mucho tiempo esperando esto.', de: 'Wir warten schon lange hierauf.' },
      daar: { en: "We've been waiting for that for a long time.", es: 'Llevamos mucho tiempo esperando eso.',  de: 'Wir warten schon lange darauf.' },
      waar: { en: 'What have you been waiting for a long time?', es: '¿Qué lleváis esperando mucho tiempo?',   de: 'Worauf wartet ihr schon lange?' },
    },
  },
  {
    id: 'over', label: 'over', meaning: 'about',
    modifiers: ['nooit', 'zelden', 'bijna nooit', 'haast nooit', 'amper', 'vrijwel nooit', 'niet vaak', 'node', 'zo goed als nooit'],
    build: simpleBuilder(VERBS.praten),
    guides: {
      er:   { en: 'They never talk about it.',   es: 'Nunca hablan de ello.',   de: 'Sie sprechen nie darüber.' },
      hier: { en: 'They never talk about this.',  es: 'Nunca hablan de esto.',   de: 'Sie sprechen nie hierüber.' },
      daar: { en: 'They never talk about that.',  es: 'Nunca hablan de eso.',    de: 'Sie sprechen nie darüber.' },
      waar: { en: 'What do they never talk about?', es: '¿De qué no hablan nunca?', de: 'Worüber sprechen sie nie?' },
    },
  },
  {
    id: 'tegen', label: 'tegen', meaning: 'against',
    modifiers: ['hard', 'fel', 'hevig', 'verbeten', 'vastberaden', 'keihard', 'onvermoeibaar', 'dag en nacht', 'tot het uiterste'],
    build: simpleBuilder(VERBS.vechten),
    guides: {
      er:   { en: 'I fight against it hard.',   es: 'Lucho duro contra ello.',  de: 'Ich kämpfe hart dagegen.' },
      hier: { en: 'I fight against this hard.',  es: 'Lucho duro contra esto.',  de: 'Ich kämpfe hart hiergegen.' },
      daar: { en: 'I fight against that hard.',  es: 'Lucho duro contra eso.',   de: 'Ich kämpfe hart dagegen.' },
      waar: { en: 'What do you fight against hard?', es: '¿Contra qué luchas duro?', de: 'Wogegen kämpfst du hart?' },
    },
  },
];

export const PREPOSITIONS = PREP_FAMILIES.map(({ id, label, meaning }) => ({ id, label, meaning }));

const EXERCISES_PER_COMBO = 50;

// 6 persons x 9 modifiers = 54 natural variants per (adverb, preposition) combo —
// generated from conjugation tables + interchangeable modifier words rather than
// hand-written one by one, then trimmed to 50. Each family's build() already emits
// the adverb/preposition slots as literal "___" placeholders (only the modifier is
// interpolated as real text), so the generated sentence is exactly what's rendered.
// The guide sentence stays the same representative en/es/de translation for every
// variant of a given combo — a "you often think about it"-style hint conveys the
// pattern regardless of which of the 50 Dutch surface forms is shown (see
// Context-Idiomatrix.md for the reasoning).
export const PRONOMINAL_ADVERB_EXERCISES: PronominalAdverbExercise[] = ADVERBS.flatMap(adverb =>
  PREP_FAMILIES.flatMap((family): PronominalAdverbExercise[] => {
    const variants: PronominalAdverbExercise[] = [];
    for (const person of PERSONS) {
      for (const modifier of family.modifiers) {
        variants.push({
          id: `pa-${adverb.id}-${family.id}-${person}-${variants.length}`,
          adverbId: adverb.id,
          prepositionId: family.id,
          prepositionLabel: family.label,
          sentence: family.build(person, adverb.id === 'waar', modifier),
          blank1: { correct: adverb.id },
          blank2: { correct: family.id },
          guide: family.guides[adverb.id],
        });
      }
    }
    return variants.slice(0, EXERCISES_PER_COMBO);
  })
);

export function completeDutchSentence(exercise: PronominalAdverbExercise): string {
  return exercise.sentence
    .replace('___', exercise.blank1.correct)
    .replace('___', exercise.blank2.correct);
}
