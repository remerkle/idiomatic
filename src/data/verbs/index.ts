import type { Verb } from '../../types';
import { DUTCH_VERBS } from './dutchVerbs';
import { SPANISH_VERBS } from './spanishVerbs';
import { ENGLISH_VERBS } from './englishVerbs';
import { GERMAN_VERBS } from './germanVerbs';
import { DUTCH_VERBS_EXTRA } from './dutchVerbsExtra';
import { SPANISH_VERBS_EXTRA } from './spanishVerbsExtra';
import { ENGLISH_VERBS_EXTRA } from './englishVerbsExtra';
import { GERMAN_VERBS_EXTRA } from './germanVerbsExtra';

export const VERBS: Verb[] = [
  ...DUTCH_VERBS,
  ...DUTCH_VERBS_EXTRA,
  ...SPANISH_VERBS,
  ...SPANISH_VERBS_EXTRA,
  ...ENGLISH_VERBS,
  ...ENGLISH_VERBS_EXTRA,
  ...GERMAN_VERBS,
  ...GERMAN_VERBS_EXTRA,
];

export { PERSON_LABELS, TENSE_LABELS, TENSE_KEYS } from './labels';
