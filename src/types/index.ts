export type Language = {
  id: string;
  name: string;
  flag: string;
  color: string;
};

export type Flashcard = {
  id: string;
  languageId: string;
  front: string;
  back: string;
  nextReviewDate: string;
  interval: number;
  easeFactor: number;
};

export type NounArticle = {
  id: string;
  languageId: string;
  noun: string;
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter' | 'common' | 'indefinite';
  translation: string;
};

export type Synonym = {
  id: string;
  languageId: string;
  word: string;
  synonyms: string[];
  translation: string;
};

export type Antonym = {
  id: string;
  languageId: string;
  word: string;
  antonyms: string[];
  translation: string;
};

export type UserProgress = {
  streak: number;
  xp: number;
  level: number;
  dailyGoal: number;
  todayXp: number;
};

export type TenseKey = 'present' | 'past' | 'future' | 'presentPerfect';

// Conjugated forms in fixed person order: [I, you, he/she/it, we, you-all, they]
export type ConjugationSet = [string, string, string, string, string, string];

export type Verb = {
  id: string;
  languageId: string;
  infinitive: string;
  translation: string;
  present: ConjugationSet;
  past: ConjugationSet;
  future: ConjugationSet;
  presentPerfect: ConjugationSet;
};

export type PrepositionExercise = {
  id: string;
  languageId: string;
  sentence: string; // contains "___" marking the blank
  correct: string;
  distractors: [string, string];
  translation: string;
};

export type AdverbId = 'er' | 'hier' | 'daar' | 'waar';

export type PronominalAdverbExercise = {
  id: string;
  adverbId: AdverbId;
  prepositionId: string;      // e.g. "aan"
  prepositionLabel: string;   // e.g. "aan" or "mee / met"
  sentence: string;           // Dutch sentence with exactly two "___" blanks
  blank1: { correct: string }; // the adverb (er/hier/daar/waar) — the menu already picked it, so no distractors
  blank2: { correct: string }; // the preposition — same
  guide: { en: string; es: string; de: string }; // guide sentence per non-Dutch language, shown upfront as a hint
};
