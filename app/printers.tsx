import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Screen, H2, IconButton, Seg, Group, ListRow, Icon } from '../src/components';
import { c, font } from '../src/theme';

const P = [['bt', 'Thermal stencil printer', 'Bluetooth · thermal paper', 'Ready'], ['wifi', 'Studio inkjet', 'Wi-Fi · AirPrint', 'Ready'], ['wifi', 'Front desk laser', 'Wi-Fi · AirPrint', 'Busy']];
export default function Printers() {
  const [f, setF] = useState(0);
  const list = P.filter((p) => f === 0 || (f === 1 ? p[0] === 'wifi' : p[0] === 'bt'));
  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" /><H2>Choose a printer</H2></View>
      <View><Text style={{ ...font(700, 16), color: c.text }}>Searching for printers</Text><Text style={{ ...font(500, 13.5), color: c.muted }}>On your Wi-Fi network and over Bluetooth</Text></View>
      <Seg options={['All', 'Wi-Fi', 'Bluetooth']} active={f} onChange={setF} />
      <Text style={{ ...font(700, 14), color: c.muted }}>Found nearby · {list.length}</Text>
      <Group>
        {list.map(([i, t, s, st], k) => (
          <ListRow key={t} icon={i} title={t} sub={`${s} · ${st}`} href={st === 'Ready' ? '/print' : undefined} last={k === list.length - 1} />))}
      </Group>
      <Text style={{ ...font(700, 14), color: c.muted }}>Other options</Text>
      <Group><ListRow icon="plus" title="Add printer by IP address" sub="For printers not found automatically" last /></Group>
    </Screen>
  );
}
