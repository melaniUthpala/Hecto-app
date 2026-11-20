import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, Chip, Icon } from '../../src/components';
import { img } from '../../src/assets';
import { c, font } from '../../src/theme';

const SAMPLES = [['Red rose', 'Floral · photo', img.rosePhoto], ['Rose study', 'Realism · drawing', img.roseBlack], ['Mandala', 'Geometric · art', img.mandala], ['Compass', 'Linework · art', img.compass]] as const;
export default function DemoPick() {
  const [sel, setSel] = useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={7} skipHref="/onboarding/plan" />
        <H1>Try it on a sample</H1>
        <Body>Free, no credits used. Picked for what you tattoo.</Body>
        <View style={{ flexDirection: 'row', gap: 8 }}>{['Realism', 'Floral', 'Portraits'].map((t) => <Chip key={t} label={t} selected />)}</View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {SAMPLES.map(([t, m, src], i) => (
            <Pressable key={t} onPress={() => setSel(i)} style={{ width: '47.5%', borderRadius: 16, overflow: 'hidden', borderWidth: sel === i ? 2 : 1, borderColor: sel === i ? c.primary : c.line, backgroundColor: c.surface }}>
              <Image source={src} style={{ width: '100%', height: 150, backgroundColor: '#fff' }} resizeMode="cover" />
              {sel === i ? <View style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={13} color="#fff" /></View> : null}
              <View style={{ padding: 10 }}><Text style={{ ...font(700, 15), color: c.text }}>{t}</Text><Text style={{ ...font(500, 12.5), color: c.muted }}>{m}</Text></View>
            </Pressable>))}
        </View>
      </Screen>
      <Footer>
        <Button label="Make the stencil" href="/onboarding/demo-make" />
        <Button label="Use my own photo" href="/onboarding/demo-make" variant="ghost" icon="camera" size="medium" />
      </Footer>
    </View>
  );
}
