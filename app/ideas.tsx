import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { Screen, Footer, H2, IconButton, Button, Chip } from '../src/components';
import { img } from '../src/assets';
import { c, font } from '../src/theme';

export default function Ideas() {
  const [q, setQ] = useState('A compass rose with fine line waves, minimal'); const [made, setMade] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" /><H2>Ideas</H2></View>
        <Text style={{ ...font(700, 16), color: c.text }}>Describe your tattoo</Text>
        <TextInput multiline value={q} onChangeText={setQ} placeholderTextColor={c.muted} style={{ minHeight: 110, padding: 14, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, ...font(500, 16, 1.4), color: c.text, textAlignVertical: 'top' }} />
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>{['Minimal', 'Fine line', 'Bold', 'Botanical'].map((t) => <Chip key={t} label={t} onPress={() => setQ((x) => `${x}, ${t.toLowerCase()}`)} />)}</View>
        {made ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {[img.compass, img.mandala, img.roseBlack, img.sampleOutline].map((s, i) => (
              <View key={i} style={{ width: '47.5%', borderRadius: 14, overflow: 'hidden', backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
                <Image source={s} style={{ width: '100%', aspectRatio: 1, backgroundColor: '#fff' }} />
                <Text style={{ ...font(700, 14), color: c.primaryLight, padding: 10 }}>Make stencil</Text>
              </View>))}
          </View>) : null}
      </Screen>
      <Footer><Button label="Generate 4 ideas · 2 credits" onPress={() => setMade(true)} /></Footer>
    </View>
  );
}
