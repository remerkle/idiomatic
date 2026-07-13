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

const PRONOUNS_EN: Record<PersonId, string> = { ik: 'I', je: 'you', hij: 'he', wij: 'we', jullie: 'you', zij: 'they' };
const PRONOUNS_ES: Record<PersonId, string> = { ik: 'yo', je: 'tú', hij: 'él', wij: 'nosotros', jullie: 'vosotros', zij: 'ellos' };
const PRONOUNS_DE: Record<PersonId, string> = { ik: 'ich', je: 'du', hij: 'er', wij: 'wir', jullie: 'ihr', zij: 'sie' };
const REFLEXIVE_ES: Record<PersonId, string> = { ik: 'me', je: 'te', hij: 'se', wij: 'nos', jullie: 'os', zij: 'se' };
// "sich vorstellen" (bij) takes a dative reflexive (mir/dir/sich/...); "sich kümmern" (om)
// takes an accusative one (mich/dich/sich/...) — German distinguishes the two.
const REFLEXIVE_DE_DAT: Record<PersonId, string> = { ik: 'mir', je: 'dir', hij: 'sich', wij: 'uns', jullie: 'euch', zij: 'sich' };
const REFLEXIVE_DE_ACC: Record<PersonId, string> = { ik: 'mich', je: 'dich', hij: 'sich', wij: 'uns', jullie: 'euch', zij: 'sich' };

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// English "I" is always capitalized, even after "What do/does" — every other subject
// pronoun stays lowercase mid-sentence.
function enSubj(person: PersonId): string {
  return person === 'ik' ? 'I' : PRONOUNS_EN[person];
}

// "does" for he/she/it, "do" for every other person — English do-support in questions.
function enAux(person: PersonId): string {
  return person === 'hij' ? 'does' : 'do';
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

// --- English / Spanish / German conjugation tables, used only for the guide sentence
// (the graded exercise is entirely in Dutch). Regular present tense per person.
const EN_VERBS = {
  think:   { ik: 'think', je: 'think', hij: 'thinks', wij: 'think', jullie: 'think', zij: 'think' } as Conj,
  support: { ik: 'support', je: 'support', hij: 'supports', wij: 'support', jullie: 'support', zij: 'support' } as Conj,
  believe: { ik: 'believe', je: 'believe', hij: 'believes', wij: 'believe', jullie: 'believe', zij: 'believe' } as Conj,
  enjoy:   { ik: 'enjoy', je: 'enjoy', hij: 'enjoys', wij: 'enjoy', jullie: 'enjoy', zij: 'enjoy' } as Conj,
  care:    { ik: 'care', je: 'care', hij: 'cares', wij: 'care', jullie: 'care', zij: 'care' } as Conj,
  suffer:  { ik: 'suffer', je: 'suffer', hij: 'suffers', wij: 'suffer', jullie: 'suffer', zij: 'suffer' } as Conj,
  talk:    { ik: 'talk', je: 'talk', hij: 'talks', wij: 'talk', jullie: 'talk', zij: 'talk' } as Conj,
  fight:   { ik: 'fight', je: 'fight', hij: 'fights', wij: 'fight', jullie: 'fight', zij: 'fight' } as Conj,
  be:      { ik: 'am', je: 'are', hij: 'is', wij: 'are', jullie: 'are', zij: 'are' } as Conj,
  have:    { ik: 'have', je: 'have', hij: 'has', wij: 'have', jullie: 'have', zij: 'have' } as Conj,
};

const ES_VERBS = {
  pensar:      { ik: 'pienso', je: 'piensas', hij: 'piensa', wij: 'pensamos', jullie: 'pensáis', zij: 'piensan' } as Conj,
  estar:       { ik: 'estoy', je: 'estás', hij: 'está', wij: 'estamos', jullie: 'estáis', zij: 'están' } as Conj,
  poder:       { ik: 'puedo', je: 'puedes', hij: 'puede', wij: 'podemos', jullie: 'podéis', zij: 'pueden' } as Conj,
  creer:       { ik: 'creo', je: 'crees', hij: 'cree', wij: 'creemos', jullie: 'creéis', zij: 'creen' } as Conj,
  sufrir:      { ik: 'sufro', je: 'sufres', hij: 'sufre', wij: 'sufrimos', jullie: 'sufrís', zij: 'sufren' } as Conj,
  llevar:      { ik: 'llevo', je: 'llevas', hij: 'lleva', wij: 'llevamos', jullie: 'lleváis', zij: 'llevan' } as Conj,
  hablar:      { ik: 'hablo', je: 'hablas', hij: 'habla', wij: 'hablamos', jullie: 'habláis', zij: 'hablan' } as Conj,
  luchar:      { ik: 'lucho', je: 'luchas', hij: 'lucha', wij: 'luchamos', jullie: 'lucháis', zij: 'luchan' } as Conj,
  disfrutar:   { ik: 'disfruto', je: 'disfrutas', hij: 'disfruta', wij: 'disfrutamos', jullie: 'disfrutáis', zij: 'disfrutan' } as Conj,
  preocuparse: { ik: 'me preocupo', je: 'te preocupas', hij: 'se preocupa', wij: 'nos preocupamos', jullie: 'os preocupáis', zij: 'se preocupan' } as Conj,
};

const DE_VERBS = {
  denken:        { ik: 'denke', je: 'denkst', hij: 'denkt', wij: 'denken', jullie: 'denkt', zij: 'denken' } as Conj,
  stehen:        { ik: 'stehe', je: 'stehst', hij: 'steht', wij: 'stehen', jullie: 'steht', zij: 'stehen' } as Conj,
  unterstuetzen: { ik: 'unterstütze', je: 'unterstützt', hij: 'unterstützt', wij: 'unterstützen', jullie: 'unterstützt', zij: 'unterstützen' } as Conj,
  koennen:       { ik: 'kann', je: 'kannst', hij: 'kann', wij: 'können', jullie: 'könnt', zij: 'können' } as Conj,
  sein:          { ik: 'bin', je: 'bist', hij: 'ist', wij: 'sind', jullie: 'seid', zij: 'sind' } as Conj,
  glauben:       { ik: 'glaube', je: 'glaubst', hij: 'glaubt', wij: 'glauben', jullie: 'glaubt', zij: 'glauben' } as Conj,
  beobachten:    { ik: 'beobachte', je: 'beobachtest', hij: 'beobachtet', wij: 'beobachten', jullie: 'beobachtet', zij: 'beobachten' } as Conj,
  kuemmern:      { ik: 'kümmere', je: 'kümmerst', hij: 'kümmert', wij: 'kümmern', jullie: 'kümmert', zij: 'kümmern' } as Conj,
  leiden:        { ik: 'leide', je: 'leidest', hij: 'leidet', wij: 'leiden', jullie: 'leidet', zij: 'leiden' } as Conj,
  warten:        { ik: 'warte', je: 'wartest', hij: 'wartet', wij: 'warten', jullie: 'wartet', zij: 'warten' } as Conj,
  sprechen:      { ik: 'spreche', je: 'sprichst', hij: 'spricht', wij: 'sprechen', jullie: 'sprecht', zij: 'sprechen' } as Conj,
  kaempfen:      { ik: 'kämpfe', je: 'kämpfst', hij: 'kämpft', wij: 'kämpfen', jullie: 'kämpft', zij: 'kämpfen' } as Conj,
};

type Guide = { en: string; es: string; de: string };
type RestMap = Record<AdverbId, string>;

type PrepFamily = {
  id: string;
  label: string;
  meaning: string;
  modifiers: string[]; // interchangeable degree/frequency words for the Dutch exercise sentence
  build: (person: PersonId, isQuestion: boolean, modifier: string) => string;
  guideBuild: (person: PersonId, adverbId: AdverbId) => Guide;
};

// Most Dutch families share the same shape: "{Pron} {verb} ___ {modifier}[ mid] ___[
// tail]." / "___ {verb} {pron} {modifier}[ mid] ___[ tail]?" — build() already emits
// the adverb and preposition slots as literal "___" placeholders (only the modifier is
// interpolated as real text), so its return value IS the final blanked sentence.
// `mid` inserts a fixed word BEFORE the final blank (e.g. "mee"'s "blij" — Dutch wants
// "erg blij mee", not "erg mee blij"); `tail` inserts one AFTER it (e.g. "door"'s past
// participle "overtuigd", which goes at the very end of the clause). Only the
// reflexive "bij" family (modal + reflexive pronoun) needs a fully bespoke builder.
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
    modifiers: ['vaak', 'soms', 'regelmatig', 'wel eens', 'af en toe', 'meestal', 'steeds', 'voortdurend', 'constant', 'geregeld', 'vrijwel altijd', 'iedere dag'],
    build: simpleBuilder(VERBS.denken),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'about it', hier: 'about this', daar: 'about that', waar: '' };
      const objEs: RestMap = { er: 'en ello', hier: 'en esto', daar: 'en eso', waar: '' };
      const compDe: RestMap = { er: 'daran', hier: 'hieran', daar: 'daran', waar: 'woran' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} often think about?`
        : `${capitalize(enSubj(person))} often ${EN_VERBS.think[person]} ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿En qué ${ES_VERBS.pensar[person]} ${PRONOUNS_ES[person]} a menudo?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.pensar[person]} a menudo ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.denken[person]} ${PRONOUNS_DE[person]} oft?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.denken[person]} oft ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'achter', label: 'achter', meaning: 'behind',
    modifiers: ['volledig', 'helemaal', 'altijd', 'meestal', 'vaak', 'echt', 'absoluut', 'resoluut', 'volmondig', 'onvoorwaardelijk', 'compleet', 'van harte'],
    build: simpleBuilder(VERBS.staan),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const objEs: RestMap = { er: 'ello', hier: 'esto', daar: 'eso', waar: '' };
      const compDe: RestMap = { er: 'dahinter', hier: 'hierhinter', daar: 'dahinter', waar: '' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} fully support?`
        : `${capitalize(enSubj(person))} fully ${EN_VERBS.support[person]} ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿De qué ${ES_VERBS.estar[person]} ${PRONOUNS_ES[person]} totalmente a favor?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.estar[person]} totalmente a favor de ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `Was ${DE_VERBS.unterstuetzen[person]} ${PRONOUNS_DE[person]} voll und ganz?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.stehen[person]} voll ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'bij', label: 'bij', meaning: 'with/by',
    modifiers: ['niets', 'weinig', 'nauwelijks iets', 'bijna niets', 'helemaal niets', 'niet veel', 'maar weinig', 'vrijwel niets', 'amper iets', 'zo goed als niets', 'haast niets', 'amper wat'],
    build: (person, isQuestion, modifier) => {
      const pron = PRONOUNS[person];
      const modal = questionConj(VERBS.kunnen, 'kun');
      const refl = REFLEXIVE[person];
      return isQuestion
        ? `___ ${modal[person]} ${pron} ${refl} ${modifier} ___ voorstellen?`
        : `${capitalize(pron)} ${VERBS.kunnen[person]} ${refl} ___ ${modifier} ___ voorstellen.`;
    },
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'about it', hier: 'about this', daar: 'about that', waar: '' };
      const objEs: RestMap = { er: 'ello', hier: 'esto', daar: 'eso', waar: '' };
      const compDe: RestMap = { er: 'darunter', hier: 'hierunter', daar: 'darunter', waar: '' };
      const en = adverbId === 'waar'
        ? `What can't ${enSubj(person)} picture anything about?`
        : `${capitalize(enSubj(person))} can't picture anything ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿Respecto a qué no ${ES_VERBS.poder[person]} ${PRONOUNS_ES[person]} imaginar${REFLEXIVE_ES[person]} nada?`
        : `${capitalize(PRONOUNS_ES[person])} no ${ES_VERBS.poder[person]} imaginar${REFLEXIVE_ES[person]} nada respecto a ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `Was ${DE_VERBS.koennen[person]} ${PRONOUNS_DE[person]} ${REFLEXIVE_DE_DAT[person]} nichts vorstellen?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.koennen[person]} ${REFLEXIVE_DE_DAT[person]} nichts ${compDe[adverbId]} vorstellen.`;
      return { en, es, de };
    },
  },
  {
    id: 'door', label: 'door', meaning: 'through',
    modifiers: ['niet', 'nauwelijks', 'amper', 'niet volledig', 'niet helemaal', 'niet meteen', 'niet snel', 'maar moeilijk', 'absoluut niet', 'niet echt', 'niet direct', 'nog niet'],
    build: simpleBuilder(VERBS.zijn, { tail: 'overtuigd' }),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const objEs: RestMap = { er: 'ello', hier: 'esto', daar: 'eso', waar: '' };
      const compDe: RestMap = { er: 'davon', hier: 'hiervon', daar: 'davon', waar: 'wovon' };
      const en = adverbId === 'waar'
        ? `What ${EN_VERBS.be[person]} ${enSubj(person)} not entirely convinced by?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.be[person]} not entirely convinced by ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿De qué no ${ES_VERBS.estar[person]} ${PRONOUNS_ES[person]} del todo convencido?`
        : `${capitalize(PRONOUNS_ES[person])} no ${ES_VERBS.estar[person]} del todo convencido de ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.sein[person]} ${PRONOUNS_DE[person]} nicht ganz überzeugt?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.sein[person]} nicht ganz ${compDe[adverbId]} überzeugt.`;
      return { en, es, de };
    },
  },
  {
    id: 'in', label: 'in', meaning: 'in',
    modifiers: ['echt', 'sterk', 'volledig', 'oprecht', 'vurig', 'rotsvast', 'blindelings', 'diep', 'onwrikbaar', 'innig', 'vast', 'onvoorwaardelijk'],
    build: simpleBuilder(VERBS.geloven),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'in it', hier: 'in this', daar: 'in that', waar: '' };
      const objEs: RestMap = { er: 'en ello', hier: 'en esto', daar: 'en eso', waar: '' };
      const compDe: RestMap = { er: 'daran', hier: 'hieran', daar: 'daran', waar: 'woran' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} really believe in?`
        : `${capitalize(enSubj(person))} really ${EN_VERBS.believe[person]} ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿En qué ${ES_VERBS.creer[person]} ${PRONOUNS_ES[person]} realmente?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.creer[person]} realmente ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.glauben[person]} ${PRONOUNS_DE[person]} wirklich?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.glauben[person]} wirklich ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'mee', label: 'mee / met', meaning: 'with',
    modifiers: ['erg', 'heel', 'ontzettend', 'oprecht', 'best', 'echt', 'zeer', 'uitermate', 'bijzonder', 'best wel', 'reuze', 'mateloos'],
    build: simpleBuilder(VERBS.zijn, { mid: 'blij' }),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const objEs: RestMap = { er: 'ello', hier: 'esto', daar: 'eso', waar: '' };
      const compDe: RestMap = { er: 'damit', hier: 'hiermit', daar: 'damit', waar: 'womit' };
      const en = adverbId === 'waar'
        ? `What ${EN_VERBS.be[person]} ${enSubj(person)} happy with?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.be[person]} happy with ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿Con qué ${ES_VERBS.estar[person]} ${PRONOUNS_ES[person]} contento?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.estar[person]} contento con ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.sein[person]} ${PRONOUNS_DE[person]} zufrieden?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.sein[person]} zufrieden ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'naar', label: 'naar', meaning: 'to',
    modifiers: ['graag', 'vaak', 'altijd', 'dolgraag', 'regelmatig', 'elke dag', 'steeds weer', 'keer op keer', 'telkens', 'iedere keer weer', 'met veel plezier', 'erg graag'],
    build: simpleBuilder(VERBS.kijken),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const gerundEs: RestMap = { er: 'viéndolo', hier: 'viendo esto', daar: 'viendo eso', waar: '' };
      const objDe: RestMap = { er: 'es', hier: 'das hier', daar: 'das da', waar: '' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} enjoy watching?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.enjoy[person]} watching ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿Qué ${ES_VERBS.disfrutar[person]} ${PRONOUNS_ES[person]} viendo?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.disfrutar[person]} ${gerundEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `Was ${DE_VERBS.beobachten[person]} ${PRONOUNS_DE[person]} gerne?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.beobachten[person]} ${objDe[adverbId]} gerne.`;
      return { en, es, de };
    },
  },
  {
    id: 'om', label: 'om', meaning: 'around',
    modifiers: ['heel veel', 'ontzettend veel', 'erg veel', 'oprecht', 'echt veel', 'zoveel', 'meer dan wat ook', 'boven alles', 'enorm veel', 'innig', 'oprecht veel', 'hartstochtelijk'],
    build: simpleBuilder(VERBS.geven),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const compDe: RestMap = { er: 'darum', hier: 'hierom', daar: 'darum', waar: 'worum' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} care about a lot?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.care[person]} about ${objEn[adverbId]} a lot.`;
      const es = adverbId === 'waar'
        ? `¿Por qué ${ES_VERBS.preocuparse[person]} ${PRONOUNS_ES[person]} tanto?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.preocuparse[person]} mucho por ${{ er: 'ello', hier: 'esto', daar: 'eso', waar: '' }[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.kuemmern[person]} ${PRONOUNS_DE[person]} ${REFLEXIVE_DE_ACC[person]} sehr?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.kuemmern[person]} ${REFLEXIVE_DE_ACC[person]} sehr ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'onder', label: 'onder', meaning: 'under',
    modifiers: ['erg', 'ontzettend', 'zwaar', 'enorm', 'hevig', 'dagelijks', 'voortdurend', 'zichtbaar', 'danig', 'vreselijk', 'aanzienlijk', 'merkbaar'],
    build: simpleBuilder(VERBS.lijden),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'from it', hier: 'from this', daar: 'from that', waar: '' };
      const objEs: RestMap = { er: 'por ello', hier: 'por esto', daar: 'por eso', waar: '' };
      const compDe: RestMap = { er: 'darunter', hier: 'hierunter', daar: 'darunter', waar: 'worunter' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} suffer from a lot?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.suffer[person]} ${objEn[adverbId]} a lot.`;
      const es = adverbId === 'waar'
        ? `¿Por qué ${ES_VERBS.sufrir[person]} ${PRONOUNS_ES[person]} tanto?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.sufrir[person]} mucho ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.leiden[person]} ${PRONOUNS_DE[person]} sehr?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.leiden[person]} sehr ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'op', label: 'op', meaning: 'on',
    modifiers: ['al lang', 'al jaren', 'al weken', 'al maanden', 'geduldig', 'al een tijd', 'al zo lang', 'al de hele dag', 'al eindeloos', 'al uren', 'al maandenlang', 'gespannen'],
    build: simpleBuilder(VERBS.wachten),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const compDe: RestMap = { er: 'darauf', hier: 'hierauf', daar: 'darauf', waar: 'worauf' };
      const en = adverbId === 'waar'
        ? `What ${EN_VERBS.have[person]} ${enSubj(person)} been waiting for a long time?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.have[person]} been waiting for ${objEn[adverbId]} for a long time.`;
      const es = adverbId === 'waar'
        ? `¿Qué ${ES_VERBS.llevar[person]} ${PRONOUNS_ES[person]} mucho tiempo esperando?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.llevar[person]} mucho tiempo esperándolo.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.warten[person]} ${PRONOUNS_DE[person]} schon lange?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.warten[person]} schon lange ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'over', label: 'over', meaning: 'about',
    modifiers: ['nooit', 'zelden', 'bijna nooit', 'haast nooit', 'amper', 'vrijwel nooit', 'niet vaak', 'node', 'zo goed als nooit', 'hoogst zelden', 'bijna niet', 'nauwelijks'],
    build: simpleBuilder(VERBS.praten),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'about it', hier: 'about this', daar: 'about that', waar: '' };
      const objEs: RestMap = { er: 'de ello', hier: 'de esto', daar: 'de eso', waar: '' };
      const compDe: RestMap = { er: 'darüber', hier: 'hierüber', daar: 'darüber', waar: 'worüber' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} never talk about?`
        : `${capitalize(enSubj(person))} never ${EN_VERBS.talk[person]} ${objEn[adverbId]}.`;
      const es = adverbId === 'waar'
        ? `¿De qué no ${ES_VERBS.hablar[person]} ${PRONOUNS_ES[person]} nunca?`
        : `${capitalize(PRONOUNS_ES[person])} nunca ${ES_VERBS.hablar[person]} ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.sprechen[person]} ${PRONOUNS_DE[person]} nie?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.sprechen[person]} nie ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
  {
    id: 'tegen', label: 'tegen', meaning: 'against',
    modifiers: ['hard', 'fel', 'hevig', 'verbeten', 'vastberaden', 'keihard', 'onvermoeibaar', 'dag en nacht', 'tot het uiterste', 'meedogenloos', 'onophoudelijk', 'met volle overgave'],
    build: simpleBuilder(VERBS.vechten),
    guideBuild: (person, adverbId) => {
      const objEn: RestMap = { er: 'it', hier: 'this', daar: 'that', waar: '' };
      const objEs: RestMap = { er: 'ello', hier: 'esto', daar: 'eso', waar: '' };
      const compDe: RestMap = { er: 'dagegen', hier: 'hiergegen', daar: 'dagegen', waar: 'wogegen' };
      const en = adverbId === 'waar'
        ? `What ${enAux(person)} ${enSubj(person)} fight against hard?`
        : `${capitalize(enSubj(person))} ${EN_VERBS.fight[person]} against ${objEn[adverbId]} hard.`;
      const es = adverbId === 'waar'
        ? `¿Contra qué ${ES_VERBS.luchar[person]} ${PRONOUNS_ES[person]} duro?`
        : `${capitalize(PRONOUNS_ES[person])} ${ES_VERBS.luchar[person]} duro contra ${objEs[adverbId]}.`;
      const de = adverbId === 'waar'
        ? `${capitalize(compDe.waar)} ${DE_VERBS.kaempfen[person]} ${PRONOUNS_DE[person]} hart?`
        : `${capitalize(PRONOUNS_DE[person])} ${DE_VERBS.kaempfen[person]} hart ${compDe[adverbId]}.`;
      return { en, es, de };
    },
  },
];

export const PREPOSITIONS = PREP_FAMILIES.map(({ id, label, meaning }) => ({ id, label, meaning }));

const EXERCISES_PER_COMBO = 70;

// 6 persons x 12 modifiers = 72 natural variants per (adverb, preposition) combo —
// generated from conjugation tables + interchangeable modifier words rather than
// hand-written one by one, then trimmed to 70. Each family's build() already emits
// the adverb/preposition slots as literal "___" placeholders (only the modifier is
// interpolated as real text), so the generated sentence is exactly what's rendered.
// The guide sentence is generated per (adverb, person) via guideBuild() — it changes
// as the learner advances through a session (subject pronoun + verb conjugation always
// match), though the exact Dutch *modifier* word (one of 12 synonyms) isn't separately
// translated; the guide conveys the pattern and correct person, not a word-for-word
// match of every synonym choice.
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
          guide: family.guideBuild(person, adverb.id),
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
