import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, BeforeAfter, Seg } from '../../src/components';
import { img } from '../../src/assets';
import { c, font } from '../../src/theme';

export default function DemoResult() {
  const [i, setI] = useState(2);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={9} />
        <BeforeAfter before={img.rosePhoto} after={i === 0 ? img.sampleOutline : i === 1 ? img.sampleStandard : img.roseViolet} split={46} height={360} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View style={{ flex: 1 }}><H1>Your first stencil</H1></View><Text style={{ ...font(700, 13), color: c.green }}>Free sample</Text></View>
        <Seg options={['Linework', 'Shading', 'Crosshatch']} active={i} onChange={setI} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Body>Line weight</Body><Text style={{ ...font(700, 15), color: c.text }}>Bold</Text></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Body>Detail</Body><Text style={{ ...font(700, 15), color: c.text }}>High</Text></View>
      </Screen>
      <Footer>
        <Button label="Next: see it on skin" href="/onboarding/demo-tryon" />
        <Text style={{ ...font(500, 13.5), color: c.muted, textAlign: 'center' }}>Tap a style to compare. Nothing is saved yet.</Text>
      </Footer>
    </View>
  );
}
