import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Sheet, ChoiceCard, Seg, ColorSwatch, Button } from '../src/components';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';

const COLORS: [string, string][] = [['#111111', 'Black'], ['#D3123B', 'Red'], ['#1D4ED8', 'Blue'], ['#7E22CE', 'Purple'], ['#EA580C', 'Orange']];
const STYLES = ['Linework', 'Shading', 'Crosshatch'] as const;
export default function Customize() {
  const { style, setStyle } = useApp(); const [out, setOut] = useState(0); const [col, setCol] = useState(3);
  return (
    <Sheet title="Defaults" sub="Used for every new stencil" icon="palette" footer={<Button label="Save defaults" onPress={() => router.back()} />}>
      <Text style={{ ...font(700, 16), color: c.text }}>My printer</Text>
      {[['print', 'Thermal', 'Transfer paper'], ['file', 'Inkjet', 'Plain paper'], ['image', 'Digital', 'PNG file']].map(([i, t, s], k) => <ChoiceCard key={t} icon={i} title={t} sub={s} selected={out === k} onPress={() => setOut(k)} />)}
      <Text style={{ ...font(700, 16), color: c.text }}>Starting style</Text>
      <Seg options={[...STYLES]} active={STYLES.indexOf(style)} onChange={(i) => setStyle(STYLES[i])} />
      <Text style={{ ...font(700, 16), color: c.text }}>Line colour</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>{COLORS.map(([h, l], k) => <ColorSwatch key={l} color={h} label={l} selected={col === k} onPress={() => setCol(k)} />)}</View>
    </Sheet>
  );
}
