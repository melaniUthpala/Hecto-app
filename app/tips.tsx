import React from 'react';
import { Sheet, TipCard } from '../src/components';
export default function Tips() {
  return (
    <Sheet title="Tips for best results" icon="bulb">
      <TipCard icon="layers" title="One clear subject" body="Little background clutter works better than a busy scene." />
      <TipCard icon="layers" title="Crosshatch for realism" body="Realistic photos keep their depth as crossing lines." />
      <TipCard icon="pen" title="Linework for bold designs" body="Logos, lettering and flash come out sharp and simple." />
    </Sheet>
  );
}
