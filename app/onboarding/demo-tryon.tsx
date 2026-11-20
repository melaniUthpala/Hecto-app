import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Screen, Footer, Button, OnbTop, Seg, Icon } from '../../src/components';
import { img } from '../../src/assets';
import { c, font } from '../../src/theme';

const PARTS = [['Forearm', img.tryon.forearm], ['Upper arm', img.tryon.forearm], ['Calf', img.tryon.calf], ['Back', img.tryon.back]] as const;
export default function DemoTryOn() {
  const [part, setPart] = useState(0); const [mode, setMode] = useState(1);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={10} />
        <View style={{ height: 380, borderRadius: 16, overflow: 'hidden', backgroundColor: c.surface }}>
          <Image source={PARTS[part][1]} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          <View style={{ position: 'absolute', left: 12, top: 12, paddingHorizontal: 10, height: 28, borderRadius: 14, backgroundColor: 'rgba(19,19,19,.72)', justifyContent: 'center' }}>
            <Text style={{ ...font(600, 13), color: '#fff' }}>{['Stencil', 'Fresh ink', 'Healed'][mode]} · {PARTS[part][0].toLowerCase()}</Text>
          </View>
          <Text style={{ position: 'absolute', bottom: 12, alignSelf: 'center', ...font(600, 12.5), color: '#fff' }}>Drag to move · pinch to resize</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable style={{ width: 64, height: 56, borderRadius: 12, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center' }}><Icon name="camera" size={22} color={c.primaryLight} /><Text style={{ ...font(600, 10.5), color: c.muted }}>My photo</Text></Pressable>
          {PARTS.map(([p], i) => <Pressable key={p} onPress={() => setPart(i)} style={{ flex: 1, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: i === part ? 'rgba(124,92,250,.15)' : c.surface, borderWidth: 1, borderColor: i === part ? c.primary : c.line }}><Text numberOfLines={1} adjustsFontSizeToFit style={{ ...font(600, 12), color: i === part ? c.primaryLight : c.text, paddingHorizontal: 2 }}>{p}</Text></Pressable>)}
        </View>
        <Seg options={['Stencil', 'Fresh ink', 'Healed']} active={mode} onChange={setMode} />
      </Screen>
      <Footer><Button label="Looks good, continue" href="/onboarding/plan" /></Footer>
    </View>
  );
}
