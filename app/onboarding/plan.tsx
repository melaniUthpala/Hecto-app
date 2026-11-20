import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, Icon } from '../../src/components';
import { c, font } from '../../src/theme';

const ROWS = [['sparkle', 'Starting style', 'Crosshatch · bold lines, high detail'], ['print', 'Output', 'Thermal · mirrored · true size'], ['palette', 'Line colour', 'Purple, like transfer paper'], ['body', 'For your clients', 'Try On and Real View previews']];
export default function Plan() {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={11} />
        <H1>Your Hecto is ready</H1>
        <Body>Built for a tattoo artist working in realism, floral and portraits.</Body>
        <View style={{ borderRadius: 16, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
          {ROWS.map(([i, t, s], k) => (
            <View key={t} style={{ flexDirection: 'row', gap: 14, padding: 14, alignItems: 'center', borderBottomWidth: k < 3 ? 1 : 0, borderBottomColor: c.line }}>
              <Icon name={i} size={21} color={c.primaryLight} />
              <View style={{ flex: 1 }}><Text style={{ ...font(600, 13), color: c.muted }}>{t}</Text><Text style={{ ...font(700, 15.5), color: c.text }}>{s}</Text></View>
            </View>))}
        </View>
        <Text style={{ ...font(700, 16), color: c.text }}>Your first stencil</Text>
        {['Add a photo', 'Create stencil', 'Print or Try On'].map((t, i) => (
          <View key={t} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}><Text style={{ ...font(700, 13), color: c.primaryLight }}>{i + 1}</Text></View>
            <Text style={{ ...font(600, 15.5), color: c.text }}>{t}</Text>
          </View>))}
      </Screen>
      <Footer><Button label="Continue" href="/onboarding/camera" /></Footer>
    </View>
  );
}
