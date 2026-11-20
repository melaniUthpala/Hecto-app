import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Sheet, Button, Icon, Body } from '../src/components';
import { c, font } from '../src/theme';

const R = [['image', 'Only the photo and stencil you picked are sent.'], ['trash', 'Photos are used only to make your preview and are not shown to anyone else.'], ['gear', 'You can turn this off any time in Profile.']];
export default function Consent() {
  return (
    <Sheet title="Before Real View" icon="shield" footer={<><Button label="Allow and continue" onPress={() => router.replace('/tryon-real?consent=1')} /><Button label="Not now" variant="ghost" size="medium" onPress={() => router.back()} /></>}>
      <Text style={{ ...font(500, 16, 1.5), color: c.text }}>To make a realistic preview, Hecto sends <Text style={{ fontFamily: 'Manrope_700Bold' }}>your body photo</Text> and <Text style={{ fontFamily: 'Manrope_700Bold' }}>your stencil</Text> to <Text style={{ fontFamily: 'Manrope_700Bold' }}>Google Gemini</Text>, an AI service run by Google.</Text>
      {R.map(([i, t]) => <View key={t} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}><Icon name={i} size={18} /><Body style={{ flex: 1, fontSize: 14.5 }}>{t}</Body></View>)}
      <Text style={{ ...font(600, 14), color: c.primaryLight }}>How Hecto uses your photos</Text>
    </Sheet>
  );
}
