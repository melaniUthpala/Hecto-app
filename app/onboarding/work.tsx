import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, ChoiceCard, TagTile } from '../../src/components';
import { img } from '../../src/assets';
import { c } from '../../src/theme';

export default function Screen_() {
  const [sel, setSel] = useState<string[]>(['Floral','Portraits']);
  const tog = (t: string) => setSel(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  const tags: [string, any][] = [['Fine line', img.sampleOutline],['Lettering', img.compass],['Floral', img.roseViolet],['Geometric', img.mandala],['Portraits', img.roseBlack]];
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={4} skipHref="/onboarding/transfer" />
        <H1>What do you tattoo most?</H1>
        <Body>Pick all that apply. We'll suggest the best style for each.</Body>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>{tags.map(([t,s]) => <TagTile key={t} label={t} img={s} selected={sel.includes(t)} onPress={() => tog(t)} />)}</View>
      </Screen>
      <Footer><Button label="Continue" href="/onboarding/transfer" /></Footer>
    </View>
  );
}
