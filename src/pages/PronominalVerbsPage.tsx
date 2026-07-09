import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRONOMINAL_VERB_EXERCISES } from '../data/pronominalVerbs';
import { Card } from '../components/ui/Card';
import { PronominalVerbExercise } from '../components/pronominal/PronominalVerbExercise';

export function PronominalVerbsPage() {
  const { selectedLanguage } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedLanguage.id !== 'nl') {
    return (
      <div className="py-8">
        <Card className="max-w-md mx-auto p-8 text-center space-y-2">
          <p className="text-2xl">🇳🇱</p>
          <p className="font-semibold text-[#1B1A17]">Dutch only</p>
          <p className="text-sm text-[#6B6860]">
            Pronominal Verbs covers a Dutch-specific grammar construction — switch to Dutch from the header or Learn menu to practice it.
          </p>
        </Card>
      </div>
    );
  }

  const selected = PRONOMINAL_VERB_EXERCISES.find(e => e.id === selectedId) ?? null;

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-4xl font-semibold text-[#1B1A17]">Pronominal Verbs</h1>
        <p className="text-[#6B6860] font-semibold max-w-lg mx-auto">
          Dutch splits "er" and a fixed preposition around the verb when referring back to something already mentioned —
          e.g. "Ik heb er twee van" ("I have two of them").
        </p>
      </div>

      {selected ? (
        <PronominalVerbExercise exercise={selected} onBack={() => setSelectedId(null)} />
      ) : (
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PRONOMINAL_VERB_EXERCISES.map(e => (
            <Card
              key={e.id}
              onClick={() => setSelectedId(e.id)}
              accent={selectedLanguage.color}
              className="flex flex-col items-center gap-1 p-4 text-center"
            >
              <span className="font-semibold text-[#1B1A17]">{e.combo}</span>
              <span className="text-xs text-[#6B6860]">{e.comboTranslation}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
