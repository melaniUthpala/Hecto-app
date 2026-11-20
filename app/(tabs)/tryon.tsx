import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Footer, H2, Seg, Button, IconButton, CreditPill, Icon } from '../../src/components';
import { img } from '../../src/assets';
import { useApp } from '../../src/state';
import { c, font } from '../../src/theme';

const PARTS = [['Forearm', img.body.forearm], ['Upper arm', img.body.upperarm], ['Calf', img.body.calf], ['Back', img.body.back], ['Chest', img.body.chest], ['Thigh', img.body.thigh]] as const;
export default function TryOn() {
  const { credits, stencil } = useApp(); const [part, setPart] = useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View><H2>Try On</H2><Text style={{ ...font(500, 14), color: c.muted }}>Rose</Text></View><CreditPill n={credits} />
        </View>
        <Seg options={['3D', 'Photo', 'Real View']} active={0} onChange={(i) => { if (i === 1) router.push('/tryon-photo'); if (i === 2) router.push('/tryon-real'); }} />
        <View style={{ height: 340, borderRadius: 16, backgroundColor: c.surface, overflow: 'hidden' }}>
          <Image source={PARTS[part][1]} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          <Image source={stencil ? ({ uri: stencil.uri } as any) : img.roseViolet} style={{ position: 'absolute', left: '36%', top: '34%', width: 90, height: 90, opacity: 0.85, ...(stencil ? {} : ({ mixBlendMode: 'multiply' } as any)) }} resizeMode="contain" />
          <Text style={{ position: 'absolute', left: 12, top: 12, ...font(600, 12.5), color: c.muted }}>3D · 360°</Text>
          <View style={{ position: 'absolute', right: 10, top: 10, gap: 8 }}><IconButton icon="refresh" tone="overlay" label="Reset view" /><IconButton icon="move" tone="overlay" label="Move tattoo" /></View>
          <Text style={{ position: 'absolute', bottom: 10, alignSelf: 'center', ...font(500, 12.5), color: c.muted }}>Drag to rotate · pinch to resize</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {PARTS.map(([p], i) => <Pressable key={p} onPress={() => setPart(i)} style={{ width: '31.5%', height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: i === part ? 'rgba(124,92,250,.15)' : c.surface, borderWidth: 1, borderColor: i === part ? c.primary : c.line }}><Text style={{ ...font(600, 14), color: i === part ? c.primaryLight : c.text }}>{p}</Text></Pressable>)}
        </View>
      </Screen>
      <View style={{ paddingHorizontal: 20, gap: 10, paddingBottom: 12 }}>
        <Button label="Try on a photo" icon="camera" href="/tryon-photo" />
        <Button label="Save" icon="download" variant="secondary" href="/(tabs)/library" />
      </View>
    </View>
  );
}
