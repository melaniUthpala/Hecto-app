import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, Footer, IconButton, Seg, Button, Chip, CreditPill, Icon, Body } from '../src/components';
import { img } from '../src/assets';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';

export default function TryOnReal() {
  const { consent } = useLocalSearchParams<{ consent?: string }>();
  const { credits, setCredits } = useApp(); const [place, setPlace] = useState(0); const [stage, setStage] = useState<'setup' | 'busy' | 'done'>('setup'); const [hold, setHold] = useState(false);
  useEffect(() => { if (consent === '1') run(); }, [consent]);
  const run = () => { setStage('busy'); setTimeout(() => { setCredits(credits - 2); setStage('done'); }, 2200); };
  if (stage !== 'setup') return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" onPress={() => setStage('setup')} /><Text style={{ ...font(800, 22), color: c.text, flex: 1 }}>Real View</Text><IconButton icon="share" label="Share" /></View>
        <Pressable onPressIn={() => setHold(true)} onPressOut={() => setHold(false)} style={{ height: 440, borderRadius: 16, overflow: 'hidden', backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }}>
          {stage === 'busy' ? <Text style={{ ...font(600, 15), color: c.muted }}>Making 4 variations…</Text>
            : <><Image source={hold ? img.tryon.forearm : img.tryon.back} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              <Text style={{ position: 'absolute', bottom: 12, ...font(600, 12.5), color: '#fff' }}>Hold to see original</Text>
              <View style={{ position: 'absolute', left: 12, top: 12, paddingHorizontal: 10, height: 28, borderRadius: 14, backgroundColor: 'rgba(19,19,19,.72)', justifyContent: 'center' }}><Text style={{ ...font(600, 13), color: '#fff' }}>Real View · Fresh ink</Text></View></>}
        </Pressable>
        {stage === 'done' ? <Text style={{ ...font(500, 13.5), color: c.muted }}>4 variations · 2 credits used · balance {credits}</Text> : null}
      </Screen>
      <Footer><Button label="Try again · 2" variant="secondary" icon="refresh" onPress={run} /><Button label="Save" icon="download" href="/(tabs)/library" /></Footer>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" /><Text style={{ ...font(800, 24), color: c.text, flex: 1 }}>Try On</Text><CreditPill n={credits} /></View>
        <Seg options={['3D', 'Photo', 'Real View']} active={2} onChange={(i) => i === 0 ? router.replace('/(tabs)/tryon') : i === 1 && router.replace('/tryon-photo')} />
        <View style={{ gap: 4 }}><Text style={{ ...font(800, 22), color: c.text }}>Real View</Text><Body>AI places your stencil on your photo with real skin texture, shading and curve.</Body></View>
        {[['Your photo', 'Body part, good light', img.tryon.forearm], ['Rose', 'Crosshatch', img.roseViolet]].map(([t, s, src]: any) => (
          <View key={t} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
            <Image source={src} style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: '#fff' }} />
            <View style={{ flex: 1 }}><Text style={{ ...font(700, 15.5), color: c.text }}>{t}</Text><Text style={{ ...font(500, 13), color: c.muted }}>{s}</Text></View>
            <Text style={{ ...font(600, 14), color: c.primaryLight }}>Change</Text>
          </View>))}
        <Text style={{ ...font(700, 16), color: c.text }}>Where should it go?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{['Inner forearm', 'Outer forearm', 'Wrist', 'Let AI decide'].map((t, i) => <Chip key={t} label={t} selected={place === i} onPress={() => setPlace(i)} />)}</View>
      </Screen>
      <Footer><Button label="Make Real View · 2 credits" icon="wand" href="/consent" /></Footer>
    </View>
  );
}
