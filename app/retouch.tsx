import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, ToolButton, Icon } from '../src/components';
import { img } from '../src/assets';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';

const TOOLS = [['brush', 'Brush'], ['eraser', 'Eraser'], ['curves', 'Curves'], ['sun', 'Lighten'], ['moon', 'Darken'], ['bucket', 'Fills']];
export default function Retouch() {
  const { stencil } = useApp();
  const [tool, setTool] = useState(4); const [size, setSize] = useState(12); const [op, setOp] = useState(25);
  const Step = ({ l, v, set, d, min, max }: any) => (
    <View style={{ flex: 1, gap: 4 }}><Text style={{ ...font(600, 13), color: c.muted }}>{l}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, paddingHorizontal: 8, borderRadius: 10, backgroundColor: c.surface }}>
        <Text onPress={() => set(Math.max(min, v - d))} style={{ ...font(800, 20), color: c.text, paddingHorizontal: 8 }}>−</Text>
        <Text style={{ ...font(700, 15), color: c.primaryLight }}>{v}{l === 'Opacity' ? '%' : ''}</Text>
        <Text onPress={() => set(Math.min(max, v + d))} style={{ ...font(800, 20), color: c.text, paddingHorizontal: 8 }}>+</Text>
      </View></View>);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 }}>
        <IconButton icon="x" label="Close" /><View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 18 }}><Icon name="undo" size={20} /><Icon name="redo" size={20} color={c.muted} /><Icon name="layers" size={20} /></View>
        <IconButton icon="check" tone="primary" label="Done" onPress={() => router.back()} />
      </View>
      <View style={{ flex: 1, backgroundColor: '#fff', margin: 16, marginTop: 0, borderRadius: 16, overflow: 'hidden' }}><Image source={stencil ? ({ uri: stencil.uri } as any) : img.roseViolet} style={{ width: '100%', height: '100%' }} resizeMode="contain" /></View>
      <View style={{ padding: 16, gap: 14 }}>
        <Text style={{ ...font(700, 15), color: c.text }}>{['Paint lines', 'Erase lines', 'Reshape lines', 'Paint to lighten shading', 'Paint to deepen shading', 'Fill areas'][tool]}</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}><Step l="Size" v={size} set={setSize} d={2} min={2} max={60} /><Step l="Opacity" v={op} set={setOp} d={5} min={5} max={100} /></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>{TOOLS.map(([i, l], k) => <ToolButton key={l} icon={i} label={l} active={tool === k} onPress={() => setTool(k)} />)}</ScrollView>
      </View>
    </SafeAreaView>
  );
}
