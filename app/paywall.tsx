import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Footer, H2, Body, Button, IconButton, PackRow, Icon } from '../src/components';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';

const PACKS = [{ n: 20, p: '$4.99', note: '' }, { n: 60, p: '$11.99', note: 'Most popular' }, { n: 150, p: '$24.99', note: 'Best value' }];
export default function Paywall() {
  const [sel, setSel] = useState(1); const { credits, setCredits } = useApp();
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ alignItems: 'flex-end' }}><IconButton icon="x" tone="overlay" label="Close" /></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><Icon name="wand" size={16} color={c.primaryLight} /><Text style={{ ...font(700, 14), color: c.primaryLight }}>Real View preview</Text></View>
        <H2>Credits for every idea</H2>
        <Body>One balance for stencils and Real View. Buy once, no subscription.</Body>
        <View style={{ gap: 10 }}>{PACKS.map((p, i) => <PackRow key={p.n} credits={p.n} price={p.p} note={p.note} selected={sel === i} onPress={() => setSel(i)} />)}</View>
      </Screen>
      <Footer>
        <Button label={`Get ${PACKS[sel].n} credits · ${PACKS[sel].p}`} onPress={() => { setCredits(credits + PACKS[sel].n); router.back(); }} />
        <Text style={{ ...font(500, 12.5), color: c.muted, textAlign: 'center' }}>One-time purchase · Credits never expire</Text>
      </Footer>
    </View>
  );
}
