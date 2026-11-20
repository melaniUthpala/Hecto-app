import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Footer, H1, Body, Button, BeforeAfter, Icon } from '../src/components';
import { img } from '../src/assets';
import { c, font } from '../src/theme';

export default function Welcome() {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}><Icon name="pen" size={17} color="#fff" /></View>
            <Text style={{ ...font(800, 21), color: c.text, letterSpacing: -0.6 }}>hecto</Text>
          </View>
          <Text style={{ ...font(600, 14.5), color: c.muted }}>Sign in</Text>
        </View>
        <BeforeAfter before={img.rosePhoto} after={img.roseViolet} height={330} />
        <View style={{ gap: 10 }}>
          <H1>Any reference. A clean stencil. On skin before you ink.</H1>
          <Body>Drag the slider to see a photo become a print-ready stencil.</Body>
        </View>
      </Screen>
      <Footer><Button label="Get started" href="/onboarding/problem" /></Footer>
    </View>
  );
}
