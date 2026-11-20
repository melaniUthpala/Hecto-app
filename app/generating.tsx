import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Footer, H2, IconButton, Button, ProgressList } from '../src/components';
import { useApp } from '../src/state';
import { photoToGray, makeCoverage, renderStencilUri, tick } from '../src/stencil/pipeline';
import { c, font } from '../src/theme';

export default function Generating() {
  const { credits, setCredits, style, photoUri, lineColor, addStencil } = useApp();
  const [p, setP] = useState(4); const [step, setStep] = useState(0); const [err, setErr] = useState<string | null>(null);
  const started = useRef(false);

  const run = async () => {
    if (!photoUri) { setErr('Add a reference photo first.'); return; }
    try {
      setErr(null); setStep(0); setP(6); await tick();
      const { gray, w, h } = await photoToGray(photoUri, 640);
      setStep(1); setP(30); await tick();
      let n = 0;
      const cov = await makeCoverage(gray, w, h, style, async () => { n++; setP(30 + n * 22); if (n === 1) setStep(2); await tick(); });
      setStep(3); setP(88); await tick();
      const uri = renderStencilUri(cov, lineColor);
      addStencil({ id: String(Date.now()), photoUri, style, color: lineColor, cov, uri, createdAt: Date.now() });
      setCredits(credits - 1); // charged only after the stencil really exists
      setStep(4); setP(100);
      setTimeout(() => router.replace('/result'), 300);
    } catch (e: any) {
      setErr(String(e?.message ?? e));
    }
  };
  useEffect(() => { if (!started.current) { started.current = true; run(); } }, []);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" /><H2>Creating stencil</H2></View>
        <View style={{ height: 340, borderRadius: 16, overflow: 'hidden', backgroundColor: c.surface }}>
          {photoUri ? <Image source={{ uri: photoUri }} style={{ width: '100%', height: '100%', opacity: 0.55 }} resizeMode="cover" /> : null}
        </View>
        <View style={{ height: 6, borderRadius: 3, backgroundColor: '#3A3A3A', overflow: 'hidden' }}><View style={{ width: `${Math.min(100, p)}%`, height: 6, backgroundColor: c.primary }} /></View>
        <View><Text style={{ ...font(700, 18), color: c.text }}>Adding {style.toLowerCase()}</Text><Text style={{ ...font(500, 14), color: c.muted }}>{Math.min(100, p)}%</Text></View>
        <ProgressList items={['Reading the photo', 'Tracing outlines', `Adding ${style.toLowerCase()}`, 'Cleaning lines for printing']} done={Math.min(step, 4)} />
        {err ? (
          <View style={{ padding: 14, borderRadius: 14, backgroundColor: 'rgba(248,113,113,.1)', borderWidth: 1, borderColor: c.red, gap: 6 }}>
            <Text style={{ ...font(700, 15), color: c.red }}>Could not create the stencil</Text>
            <Text style={{ ...font(500, 13), color: c.muted }}>{err}</Text>
            <Text style={{ ...font(500, 13), color: c.muted }}>No credit was used.</Text>
          </View>
        ) : <Text style={{ ...font(500, 13.5), color: c.muted }}>1 credit is used when the stencil is ready · Balance {credits}</Text>}
      </Screen>
      {err ? <Footer><Button label="Try again" onPress={() => { started.current = false; run(); }} /></Footer> : null}
    </View>
  );
}
