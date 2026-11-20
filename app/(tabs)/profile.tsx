import React from 'react';
import { Text, View } from 'react-native';
import { Screen, H2, Button, ListRow, Group } from '../../src/components';
import { useApp } from '../../src/state';
import { c, font } from '../../src/theme';

export default function Profile() {
  const { credits } = useApp();
  return (
    <Screen>
      <H2>Profile</H2>
      <View style={{ padding: 16, borderRadius: 16, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, gap: 6 }}>
        <Text style={{ ...font(600, 14), color: c.muted }}>Credit balance</Text>
        <Text style={{ ...font(800, 44), color: c.text }}>{credits}</Text>
        <Text style={{ ...font(500, 13.5), color: c.muted }}>Stencil 1 · Real View 2</Text>
        <Text style={{ ...font(500, 13.5), color: c.muted }}>3D and photo Try On free</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <View style={{ flex: 1 }}><Button label="Get credits" icon="plus" size="medium" href="/paywall" /></View>
          <View style={{ flex: 1 }}><Button label="Sign in" icon="user" variant="secondary" size="medium" /></View>
        </View>
      </View>
      <Text style={{ ...font(700, 15), color: c.muted }}>More tools</Text>
      <Group><ListRow icon="wand" title="Ideas" sub="Turn words into a design" href="/ideas" /><ListRow icon="msg" title="Assistant" sub="Placement and aftercare help" href="/assistant" last /></Group>
      <Text style={{ ...font(700, 15), color: c.muted }}>Preferences</Text>
      <Group>
        <ListRow icon="palette" title="Defaults" sub="Printer, style and line colour" href="/customize" />
        <ListRow icon="shield" title="Real View permission" sub="Allowed · Google Gemini" href="/consent" />
        <ListRow icon="globe" title="Language" sub="English" href="/language" last />
      </Group>
      <Group>
        <ListRow icon="help" title="Support" sub="Get help from our team" />
        <ListRow icon="doc" title="Privacy and terms" last />
      </Group>
    </Screen>
  );
}
