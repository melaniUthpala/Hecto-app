import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Screen, H2, IconButton, Icon } from '../src/components';
import { c, font } from '../src/theme';

const PLACES = [['Outer forearm', 'Flat, easy to show, heals well'], ['Outer upper arm', 'More padding, easy to cover'], ['Calf', 'Room to grow the design later']];
export default function Assistant() {
  const [msg, setMsg] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" /><H2>Assistant</H2></View>
        <View style={{ alignSelf: 'flex-end', maxWidth: '82%', padding: 12, borderRadius: 16, backgroundColor: c.primary }}><Text style={{ ...font(500, 15, 1.4), color: '#fff' }}>12 cm rose, first tattoo, low pain tolerance. Where should it go?</Text></View>
        <View style={{ alignSelf: 'flex-start', maxWidth: '92%', padding: 14, borderRadius: 16, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, gap: 10 }}>
          <Text style={{ ...font(500, 15, 1.4), color: c.text }}>For a first piece this size, these spots hurt least and show the design well:</Text>
          {PLACES.map(([t, s]) => (
            <View key={t} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 12, backgroundColor: c.raised }}>
              <View style={{ flex: 1 }}><Text style={{ ...font(700, 14.5), color: c.text }}>{t}</Text><Text style={{ ...font(500, 12.5), color: c.muted }}>{s}</Text></View>
              <Pressable onPress={() => {}} style={{ paddingHorizontal: 12, height: 32, borderRadius: 16, backgroundColor: 'rgba(124,92,250,.15)', justifyContent: 'center' }}><Text style={{ ...font(700, 13), color: c.primaryLight }}>Try</Text></Pressable>
            </View>))}
        </View>
      </Screen>
      <View style={{ flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 28, borderTopWidth: 1, borderTopColor: c.line }}>
        <TextInput value={msg} onChangeText={setMsg} placeholder="Message" placeholderTextColor={c.muted} style={{ flex: 1, height: 46, paddingHorizontal: 14, borderRadius: 23, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, ...font(500, 15.5), color: c.text }} />
        <IconButton icon="send" tone="primary" label="Send" onPress={() => setMsg('')} />
      </View>
    </View>
  );
}
