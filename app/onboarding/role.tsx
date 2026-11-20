import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, ChoiceCard, TagTile } from '../../src/components';
import { img } from '../../src/assets';
import { c } from '../../src/theme';

export default function Screen_() {
  const [sel, setSel] = useState(0);
  const roles = [['pen','Tattoo artist','I make stencils for clients'],['body','Getting a tattoo','I want to see it before I ink'],['team','Studio owner','I manage artists and bookings'],['sparkle','Just exploring','Show me what Hecto can do']];
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={3} skipHref="/onboarding/work" />
        <H1>What brings you to Hecto?</H1>
        <Body>We'll set up styles, printing and tips for how you work.</Body>
        {roles.map(([i,t,s],k) => <ChoiceCard key={t} icon={i} title={t} sub={s} selected={sel===k} onPress={() => setSel(k)} />)}
      </Screen>
      <Footer><Button label="Continue" href="/onboarding/work" /></Footer>
    </View>
  );
}
