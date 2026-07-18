import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data/languages';
import { PRONOMINAL_ADVERB_EXERCISES, completeDutchSentence } from '../../data/pronominalAdverbs';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import type { AdverbId, PronominalAdverbExercise as Exercise } from '../../types';

const SESSION_SIZE = 10;
const XP_PER_CORRECT = 5;

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Blank({ correct, selected, onPick }: { correct: string; selected: string | null; onPick: () => void }) {
  const style = selected
    ? 'bg-[#E3E8DC] border-[#7A8F6E] text-[#5F7256]'
    : 'bg-white border-[#E3DFD4] text-[#1B1A17] hover:bg-[#F1EDE4]';
  return (
    <div className="flex justify-center">
      <button
        onClick={onPick}
        disabled={!!selected}
        className={`py-3 px-12 text-base font-semibold rounded-2xl border transition-colors ${style}`}
      >
        {correct}
      </button>
    </div>
  );
}

export function PronominalAdverbExercise({
  adverbId, prepositionId, onBack,
}: { adverbId: AdverbId; prepositionId: string; onBack: () => void }) {
  const { selectedLanguage, addXp } = useApp();
  const [questions, setQuestions] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);
  const [blank1, setBlank1] = useState<string | null>(null);
  const [blank2, setBlank2] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [guideLangId, setGuideLangId] = useState(
    selectedLanguage.id !== 'nl' ? selectedLanguage.id : 'en'
  );

  function startSession() {
    const pool = PRONOMINAL_ADVERB_EXERCISES.filter(
      e => e.adverbId === adverbId && e.prepositionId === prepositionId
    );
    setQuestions(shuffle(pool).slice(0, SESSION_SIZE));
    setIndex(0);
    setBlank1(null);
    setBlank2(null);
    setScore(0);
  }

  useEffect(startSession, [adverbId, prepositionId]);

  const current = questions[index];
  const finished = questions.length > 0 && index >= questions.length;
  const bothAnswered = !!blank1 && !!blank2;

  useEffect(() => {
    if (bothAnswered) {
      addXp(XP_PER_CORRECT);
      setScore(s => s + 1);
    }
    // Only fires once per question: blank1/blank2 only ever transition null -> value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bothAnswered]);

  function handleNext() {
    setIndex(i => i + 1);
    setBlank1(null);
    setBlank2(null);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-md mx-auto p-8 text-center space-y-4">
        <span className="text-4xl">🎉</span>
        <h2 className="font-serif text-2xl font-semibold text-[#1B1A17]">Session complete!</h2>
        <p className="text-lg font-semibold text-[#6B6860]">
          You practiced <span className="text-[#5F7256]">{score}</span> / {questions.length} sentences
        </p>
        <Badge color="green">{pct}%</Badge>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onBack} fullWidth>← Back to prepositions</Button>
          <Button onClick={startSession} fullWidth>Play again</Button>
        </div>
      </Card>
    );
  }

  if (!current) return null;

  const [p0, p1, p2] = current.sentence.split('___');
  const guideText =
    guideLangId === 'nl' ? completeDutchSentence(current) : current.guide[guideLangId as 'en' | 'es' | 'de'];

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="sm" onClick={onBack}>← Back to prepositions</Button>
        <span className="text-sm font-semibold text-[#6B6860]">Sentence {index + 1} of {questions.length}</span>
      </div>
      <ProgressBar value={index} max={questions.length} color="#9B8AA8" />

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
        <p className="text-center font-serif text-xl font-semibold text-[#1B1A17] leading-relaxed">{guideText}</p>
      </Card>

      <Card className="p-8 text-center space-y-6">
        <p className="text-xs font-semibold text-[#6B6860] uppercase tracking-widest">
          {current.adverbId} + {current.prepositionLabel}
        </p>
        <p className="font-serif text-xl font-semibold text-[#1B1A17] leading-relaxed">
          {p0}
          <span
            className="inline-block px-2 border-b-2 font-semibold"
            style={{ color: blank1 ? '#5F7256' : '#9B8AA8', borderColor: blank1 ? '#5F7256' : '#9B8AA8' }}
          >
            {blank1 ?? '___'}
          </span>
          {p1}
          <span
            className="inline-block px-2 border-b-2 font-semibold"
            style={{ color: blank2 ? '#5F7256' : '#9B8AA8', borderColor: blank2 ? '#5F7256' : '#9B8AA8' }}
          >
            {blank2 ?? '___'}
          </span>
          {p2}
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#6B6860] mb-2">Blank 1</p>
            <Blank correct={current.blank1.correct} selected={blank1} onPick={() => setBlank1(current.blank1.correct)} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B6860] mb-2">Blank 2</p>
            <Blank correct={current.blank2.correct} selected={blank2} onPick={() => setBlank2(current.blank2.correct)} />
          </div>
        </div>
      </Card>

      {bothAnswered && (
        <Button onClick={handleNext} fullWidth>
          {index + 1 === questions.length ? 'See results' : 'Next sentence'}
        </Button>
      )}
    </div>
  );
}
