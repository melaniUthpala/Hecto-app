import React from 'react';
import { Image, Text, View } from 'react-native';
import { Screen, Footer, H1, Body, Button, OnbTop, Icon } from '../../src/components';
import { img } from '../../src/assets';
import { c, font } from '../../src/theme';

export default function Styles() {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={2} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[['3D', img.body.forearm, 'cube'], ['Photo', img.tryon.forearm, 'camera'], ['Real View', img.tryon.back, 'wand']].map(([t, src, ic]: any) => (
            <View key={t} style={{ flex: 1, borderRadius: 14, overflow: 'hidden', backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
              <Image source={src} style={{ width: '100%', height: 150 }} />
              <View style={{ padding: 10, flexDirection: 'row', gap: 6, alignItems: 'center' }}><Icon name={ic} size={15} color={c.primaryLight} /><Text style={{ ...font(700, 14), color: c.text }}>{t}</Text></View>
            </View>))}
        </View>
        <H1>See it on skin before the needle</H1>
        <Body>Spin it on a 3D body part, place it on a real photo, or make a realistic Real View preview for your client.</Body>
      </Screen>
      <Footer>
        <Button label="Set up Hecto for me" href="/onboarding/role" />
        <Text style={{ ...font(500, 13.5), color: c.muted, textAlign: 'center' }}>3 quick questions · under a minute</Text>
      </Footer>
    </View>
  );
}
