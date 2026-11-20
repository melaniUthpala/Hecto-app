import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, H1, OnbTop, BeforeAfter, ProgressList } from '../../src/components';
import { img } from '../../src/assets';
import { c, font } from '../../src/theme';

export default function DemoMake() {
  const [p, setP] = useState(0);
  useEffect(() => { const t = setInterval(() => setP((x) => Math.min(100, x + 7)), 350); return () => clearInterval(t); }, []);
  useEffect(() => { if (p >= 100) router.replace('/onboarding/demo-result'); }, [p]);
  const done = p < 33 ? 0 : p < 66 ? 1 : p < 95 ? 2 : 3;
  return (
    <Screen>
      <OnbTop step={8} />
      <BeforeAfter before={img.rosePhoto} after={img.roseViolet} split={Math.min(p, 100)} height={340} />
      <Text style={{ ...font(600, 14), color: c.primaryLight }}>Crosshatch · sample</Text>
      <H1>Adding crosshatch</H1>
      <Text style={{ ...font(700, 15), color: c.muted }}>{Math.min(p, 100)}%</Text>
      <ProgressList items={['Edges', 'Shadows', 'Hatching']} done={done} />
    </Screen>
  );
}
