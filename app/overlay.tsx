import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, ToolButton, Icon } from '../src/components';
import { img } from '../src/assets';
import { c, font } from '../src/theme';

const TOOLS = [['palette', 'Lines'], ['move', 'Align'], ['opacity', 'Opacity'], ['sun', 'Bright'], ['contrast', 'Contrast'], ['curves', 'Curves']];
export default function Overlay() {
  const [tool, setTool] = useState(3); const [v, setV] = useState(12);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 }}>
        <IconButton icon="x" tone="overlay" label="Close" onPress={() => router.back()} />
        <View style={{ flex: 1, alignItems: 'center' }}><View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><Icon name="sun" size={14} color={c.amber} /><Text style={{ ...font(600, 13), color: '#fff' }}>Screen stays awake</Text></View></View>
        <Icon name="help" size={21} />
      </View>
      <View style={{ flex: 1 }}>
        <Image source={img.roseOverlay} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      </View>
      <View style={{ backgroundColor: c.bg, padding: 16, gap: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...font(700, 15), color: c.text }}>{['Overlay lines', 'Align', 'Overlay opacity', 'Brightness', 'Contrast', 'Curves'][tool]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Text onPress={() => setV(v - 4)} style={{ ...font(800, 22), color: c.text }}>−</Text><Text style={{ ...font(700, 15), color: c.primaryLight, minWidth: 34, textAlign: 'center' }}>{v > 0 ? '+' : ''}{v}</Text><Text onPress={() => setV(v + 4)} style={{ ...font(800, 22), color: c.text }}>+</Text>
            <Text onPress={() => setV(0)} style={{ ...font(600, 14), color: c.muted }}>Reset</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>{TOOLS.map(([i, l], k) => <ToolButton key={l} icon={i} label={l} active={tool === k} onPress={() => setTool(k)} />)}</ScrollView>
        <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 8 }}>{['Photo', 'Stencil', 'Overlay'].map((t, i) => <View key={t} style={{ flex: 1, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: i === 2 ? c.primary : c.raised }}><Text style={{ ...font(700, 14), color: i === 2 ? '#fff' : c.muted }}>{t}</Text></View>)}</View>
      </View>
    </SafeAreaView>
  );
}
