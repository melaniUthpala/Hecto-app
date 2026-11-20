import React from 'react';
import { Text, View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, Icon } from '../../src/components';
import { c, font } from '../../src/theme';

const OLD = [['image', 'Print the reference'], ['frame', 'Trace it on a lightbox'], ['pen', 'Redraw and clean the lines'], ['file', 'Scan or photocopy it'], ['ruler', 'Resize, reprint, repeat']];
const NEW = [['image', 'Add a photo'], ['sparkle', 'Pick a style'], ['print', 'Print or Try On']];
const Card = ({ title, badge, rows, hl }: any) => (
  <View style={{ padding: 16, borderRadius: 16, backgroundColor: c.surface, borderWidth: hl ? 2 : 1, borderColor: hl ? c.primary : c.line, gap: 12 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ ...font(700, 16), color: c.text }}>{title}</Text><Text style={{ ...font(700, 14), color: hl ? c.primaryLight : c.muted }}>{badge}</Text>
    </View>
    {rows.map(([i, t]: string[]) => <View key={t} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}><Icon name={hl ? 'check' : i} size={16} color={hl ? c.green : c.muted} /><Text style={{ ...font(500, 15), color: hl ? c.text : c.muted }}>{t}</Text></View>)}
  </View>
);
export default function Problem() {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={1} />
        <H1>Stop redrawing every stencil by hand</H1>
        <Body>Here is what a stencil usually takes, and what it takes with Hecto.</Body>
        <Card title="The usual way" badge="5 steps" rows={OLD} />
        <Card title="With Hecto" badge="3 taps" rows={NEW} hl />
      </Screen>
      <Footer><Button label="Continue" href="/onboarding/styles" /></Footer>
    </View>
  );
}
