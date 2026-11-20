import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Sheet, Icon } from '../src/components';
import { c, font } from '../src/theme';

const L = [['EN', 'English', 'English'], ['FR', 'Français', 'French'], ['DE', 'Deutsch', 'German'], ['HI', 'हिन्दी', 'Hindi'], ['IT', 'Italiano', 'Italian'], ['JA', '日本語', 'Japanese'], ['PT', 'Português', 'Portuguese'], ['SI', 'සිංහල', 'Sinhala'], ['ES', 'Español', 'Spanish']];
export default function Language() {
  const [sel, setSel] = useState('EN');
  return (
    <Sheet title="Language" icon="globe">
      {L.map(([code, native, en]) => (
        <Pressable key={code} onPress={() => { setSel(code); setTimeout(() => router.back(), 150); }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12, borderRadius: 14, backgroundColor: c.surface, borderWidth: sel === code ? 2 : 1, borderColor: sel === code ? c.primary : c.line }}>
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}><Text style={{ ...font(700, 13), color: c.primaryLight }}>{code}</Text></View>
          <View style={{ flex: 1 }}><Text style={{ ...font(700, 16), color: c.text }}>{native}</Text><Text style={{ ...font(500, 13), color: c.muted }}>{en}</Text></View>
          {sel === code ? <Icon name="check" size={20} color={c.primaryLight} /> : null}
        </Pressable>))}
    </Sheet>
  );
}
