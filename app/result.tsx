import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Footer, IconButton, BeforeAfter, ActionTile, ChoiceCard, ColorSwatch, ToggleRow, Button } from '../src/components';
import { img } from '../src/assets';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';

const COLORS: [string, string][] = [['#111111', 'Black'], ['#D3123B', 'Red'], ['#1D4ED8', 'Blue'], ['#7E22CE', 'Purple'], ['#EA580C', 'Orange']];
export default function Result() {
  const { stencil, recolor, lineColor, removeStencil } = useApp();
  const [out, setOut] = useState(0); const [sharp, setSharp] = useState(false);
  const before: any = stencil ? { uri: stencil.photoUri } : img.rosePhoto;
  const after: any = stencil ? { uri: stencil.uri } : img.roseViolet;
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <IconButton icon="chev_l" label="Back" />
          <View style={{ flex: 1 }}><Text style={{ ...font(800, 22), color: c.text }}>{stencil ? 'Your stencil' : 'Rose'}</Text><Text style={{ ...font(500, 13.5), color: c.muted }}>{stencil ? `${stencil.style} · Just now` : 'Crosshatch · Sample'}</Text></View>
          <IconButton icon="trash" tone="danger" label="Delete stencil" onPress={() => { if (stencil) removeStencil(stencil.id); router.replace('/(tabs)/library'); }} />
        </View>
        <BeforeAfter before={before} after={after} height={360} />
        <View style={{ flexDirection: 'row', gap: 12 }}><ActionTile icon="frame" label="Skin Overlay" href="/overlay" /><ActionTile icon="brush" label="Touch-up" href="/retouch" /></View>
        <Text style={{ ...font(700, 18), color: c.text }}>Get it ready for</Text>
        {[['print', 'Thermal', 'Transfer paper'], ['file', 'Inkjet', 'Plain paper'], ['image', 'Digital', 'PNG file']].map(([i, t, s], k) => <ChoiceCard key={t} icon={i} title={t} sub={s} selected={out === k} onPress={() => setOut(k)} />)}
        <Text style={{ ...font(700, 16), color: c.text }}>Line colour</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>{COLORS.map(([hex, l]) => <ColorSwatch key={l} color={hex} label={l} selected={lineColor.toLowerCase() === hex.toLowerCase()} onPress={() => recolor(hex)} />)}</View>
        <ToggleRow icon="frame" title="Sharper lines" sub="For pieces bigger than 15 cm · +1 credit" on={sharp} onChange={setSharp} />
      </Screen>
      <Footer>
        <Button label="Try on skin" variant="secondary" icon="body" href="/(tabs)/tryon" />
        <Button label="Print" icon="print" href="/print" />
      </Footer>
    </View>
  );
}
