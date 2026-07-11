import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/languages';
import { completeDutchSentence } from '../../data/pronominalAdverbs';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { PronominalAdverbExercise as Exercise } from '../../types';

const XP_PER_CORRECT = 5;

function BlankOptions({
  options, correct, selected, onPick,
}: {
  options: string[];
  correct: string;
  selected: string | null;
  onPick: (choice: string) => void;
}) {
  return (
    <div className={options.length > 1 ? 'grid grid-cols-3 gap-3' : 'flex justify-center'}>
      {options.map(choice => {
        const isCorrect = choice === correct;
        const isSelected = selected === choice;
        let style = 'bg-white border-[#E3DFD4] text-[#1B1A17] hover:bg-[#F1EDE4]';
        if (selected) {
          if (isCorrect) style = 'bg-[#E3E8DC] border-[#7A8F6E] text-[#5F7256]';
          else if (isSelected) style = 'bg-[#F1DEDA] border-[#B85C4F] text-[#954A40]';
          else style = 'bg-white border-[#E3DFD4] text-[#C0BCB2]';
        }
        return (
          <button
            key={choice}
            onClick={() => onPick(choice)}
            disabled={!!selected}
            className={`py-3 text-base font-semibold rounded-2xl border transition-colors ${
              options.length > 1 ? '' : 'px-12'
            } ${style}`}
          >
            {choice}
          </button>
        );
      })}
    </div>
  );
}

export function PronominalAdverbExercise({ exercise, onBack }: { exercise: Exercise; onBack: () => void }) {
  const { selectedLanguage, addXp } = useApp();
  const [blank1, setBlank1] = useState<string | null>(null);
  const [blank2, setBlank2] = useState<string | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [guideLangId, setGuideLangId] = useState(
    selectedLanguage.id !== 'nl' ? selectedLanguage.id : 'en'
  );

  // The adverb and preposition were already chosen via the two menus that led here,
  // so the blanks aren't re-quizzing that choice — only the correct option is offered.
  const options1 = useMemo(() => [exercise.blank1.correct], [exercise.id]);
  const options2 = useMemo(() => [exercise.blank2.correct], [exercise.id]);

  useEffect(() => {
    setBlank1(null);
    setBlank2(null);
    setXpAwarded(false);
  }, [exercise.id]);

  useEffect(() => {
    if (
      blank1 === exercise.blank1.correct &&
      blank2 === exercise.blank2.correct &&
      !xpAwarded
    ) {
      addXp(XP_PER_CORRECT);
      setXpAwarded(true);
    }
  }, [blank1, blank2, exercise, xpAwarded, addXp]);

  const [p0, p1, p2] = exercise.sentence.split('___');

  function blankColor(selected: string | null, correct: string) {
    if (!selected) return '#9B8AA8';
    return selected === correct ? '#5F7256' : '#954A40';
  }

  const guideText =
    guideLangId === 'nl' ? completeDutchSentence(exercise) : exercise.guide[guideLangId as 'en' | 'es' | 'de'];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Button variant="secondary" size="sm" onClick={onBack}>← Back to prepositions</Button>

      {/* Guide sentence, shown up front as a hint for filling in the blanks below */}
      <Card className="p-5 space-y-3" accent={selectedLanguage.color}>
        <div className="flex gap-2 justify-center flex-wrap">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => setGuideLangId(lang.id)}
              className={`px-3 py-1.5 rounded-full font-semibold text-xs border transition-colors ${
                guideLangId === lang.id ? 'text-white' : 'bg-white border-[#E3DFD4] text-[#6B6860] hover:bg-[#F1EDE4]'
              }`}
              style={guideLangId === lang.id ? { backgroundColor: lang.color, borderColor: lang.color } : {}}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
        <p className="text-center font-semibold text-[#1B1A17]">{guideText}</p>
      </Card>

      <Card className="p-8 text-center space-y-6">
        <p className="text-xs font-semibold text-[#6B6860] uppercase tracking-widest">
          {exercise.adverbId} + {exercise.prepositionLabel}
        </p>
        <p className="font-serif text-xl font-semibold text-[#1B1A17] leading-relaxed">
          {p0}
          <span
            className="inline-block px-2 border-b-2 font-semibold"
            style={{ color: blankColor(blank1, exercise.blank1.correct), borderColor: blankColor(blank1, exercise.blank1.correct) }}
          >
            {blank1 ?? '___'}
          </span>
          {p1}
          <span
            className="inline-block px-2 border-b-2 font-semibold"
            style={{ color: blankColor(blank2, exercise.blank2.correct), borderColor: blankColor(blank2, exercise.blank2.correct) }}
          >
            {blank2 ?? '___'}
          </span>
          {p2}
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#6B6860] mb-2">Blank 1</p>
            <BlankOptions options={options1} correct={exercise.blank1.correct} selected={blank1} onPick={setBlank1} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B6860] mb-2">Blank 2</p>
            <BlankOptions options={options2} correct={exercise.blank2.correct} selected={blank2} onPick={setBlank2} />
          </div>
        </div>
      </Card>
    </div>
  );
}
