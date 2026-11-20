import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, H1, OnbTop, ProgressList } from '../../src/components';
import { c, font } from '../../src/theme';

const ITEMS = ['Crosshatch set for realism and portraits', 'Thermal output, mirrored for transfer', 'Line weight tuned for floral detail', 'Try On ready for client previews'];
export default function Building() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDone((d) => Math.min(ITEMS.length + 1, d + 1)), 900);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (done > ITEMS.length) router.replace('/onboarding/demo-pick'); }, [done]);
  return (
    <Screen>
      <OnbTop step={6} />
      <View style={{ alignItems: 'center', paddingVertical: 40, gap: 8 }}>
        <Text style={{ ...font(800, 56), color: c.primaryLight }}>{Math.min(100, Math.round((done / ITEMS.length) * 72 + (done ? 0 : 8)))}%</Text>
        <H1>Setting up Hecto for you</H1>
      </View>
      <ProgressList items={ITEMS} done={Math.min(done, ITEMS.length)} />
    </Screen>
  );
}
