import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADVERBS, PREPOSITIONS } from '../data/pronominalAdverbs';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PronominalAdverbExercise } from '../components/pronominal/PronominalAdverbExercise';
import type { AdverbId } from '../types';

export function PronominalAdverbsPage() {
  const { selectedLanguage } = useApp();
  const [adverbId, setAdverbId] = useState<AdverbId | null>(null);
  const [prepositionId, setPrepositionId] = useState<string | null>(null);

  if (selectedLanguage.id !== 'nl') {
    return (
      <div className="py-8">
        <Card className="max-w-md mx-auto p-8 text-center space-y-2">
          <p className="text-2xl">🇳🇱</p>
          <p className="font-semibold text-[#1B1A17]">Dutch only</p>
          <p className="text-sm text-[#6B6860]">
            Pronominal Adverbs & Prepositions covers a Dutch-specific grammar construction — switch to Dutch from the header or Learn menu to practice it.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <h1 className="font-serif text-4xl font-semibold text-[#1B1A17] text-center">Pronominal Adverbs & Prepositions</h1>

      {!adverbId && (
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ADVERBS.map(a => (
            <Card
              key={a.id}
              onClick={() => setAdverbId(a.id)}
              accent={selectedLanguage.color}
              className="flex flex-col items-center gap-1 p-6 text-center"
            >
              <span className="font-serif text-2xl font-semibold text-[#1B1A17]">{a.label}</span>
              <span className="text-xs text-[#6B6860]">{a.meaning}</span>
            </Card>
          ))}
        </div>
      )}

      {adverbId && !prepositionId && (
        <div className="max-w-2xl mx-auto space-y-4">
          <Button variant="secondary" size="sm" onClick={() => setAdverbId(null)}>← Back to adverbs</Button>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PREPOSITIONS.map(p => (
              <Card
                key={p.id}
                onClick={() => setPrepositionId(p.id)}
                accent={selectedLanguage.color}
                className="flex flex-col items-center gap-1 p-4 text-center"
              >
                <span className="font-semibold text-[#1B1A17]">{p.label}</span>
                <span className="text-xs text-[#6B6860]">{p.meaning}</span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {adverbId && prepositionId && (
        <PronominalAdverbExercise
          adverbId={adverbId}
          prepositionId={prepositionId}
          onBack={() => setPrepositionId(null)}
        />
      )}
    </div>
  );
}
