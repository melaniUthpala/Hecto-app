import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, ChoiceCard, TagTile } from '../../src/components';
import { img } from '../../src/assets';
import { c } from '../../src/theme';

export default function Screen_() {
  const [sel, setSel] = useState(0);
  const opts = [['print','Thermal','Transfer paper, mirrored'],['file','Inkjet','Plain paper, hectograph sheet'],['image','Digital','PNG file for freehand or tablet']];
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={5} skipHref="/onboarding/building" />
        <H1>How do you get stencils onto skin?</H1>
        <Body>We'll size, mirror and format files for your setup.</Body>
        {opts.map(([i,t,s],k) => <ChoiceCard key={t} icon={i} title={t} sub={s} selected={sel===k} onPress={() => setSel(k)} />)}
      </Screen>
      <Footer><Button label="Continue" href="/onboarding/building" /></Footer>
    </View>
  );
}
