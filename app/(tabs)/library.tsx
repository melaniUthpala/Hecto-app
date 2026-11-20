import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, H2, Seg, StencilTile, CreditPill, Icon } from '../../src/components';
import { img } from '../../src/assets';
import { useApp } from '../../src/state';
import { c, font } from '../../src/theme';

const SAMPLES = [
  { id: 's1', img: img.compass, num: 'Sample', title: 'Compass', meta: 'Linework' }, { id: 's2', img: img.mandala, num: 'Sample', title: 'Mandala', meta: 'Shading' },
  { id: 's3', img: img.roseBlack, num: 'Sample', title: 'Rose, black', meta: 'Crosshatch' }, { id: 's4', img: img.roseViolet, num: 'Sample', title: 'Rose', meta: 'Crosshatch' },
];
export default function Library() {
  const { credits, history, openStencil } = useApp(); const [f, setF] = useState(0); const [q, setQ] = useState('');
  const tabs = ['All', 'Linework', 'Shading', 'Crosshatch'];
  const mine = history.map((s, i) => ({ id: s.id, img: { uri: s.uri } as any, num: new Date(s.createdAt).toLocaleDateString(), title: `Stencil ${history.length - i}`, meta: s.style, mine: true }));
  const all = [...mine, ...SAMPLES.map((s) => ({ ...s, mine: false }))];
  const list = all.filter((s) => (f === 0 || s.meta === tabs[f]) && s.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><H2>Stencils</H2><CreditPill n={credits} /></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, height: 46, paddingHorizontal: 14, borderRadius: 12, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
        <Icon name="search" size={19} color={c.muted} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search" placeholderTextColor={c.muted} style={{ flex: 1, ...font(500, 15.5), color: c.text }} />
      </View>
      <Seg options={tabs} active={f} onChange={setF} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {list.map((s) => <View key={s.id} style={{ width: '47.5%' }}><StencilTile img={s.img} title={s.title} meta={s.meta} num={s.num} onPress={() => { if (s.mine) openStencil(s.id); router.push('/result'); }} /></View>)}
      </View>
      {list.length === 0 ? <Text style={{ ...font(500, 15), color: c.muted, textAlign: 'center' }}>No stencils match.</Text> : null}
      {history.length === 0 ? <Text style={{ ...font(500, 13.5), color: c.muted, textAlign: 'center' }}>Your own stencils appear here after you create one. They are kept until the app is closed.</Text> : null}
    </Screen>
  );
}
