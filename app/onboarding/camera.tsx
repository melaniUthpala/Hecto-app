import React from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Screen, Footer, H1, Body, Button, OnbTop, Icon } from '../../src/components';
import { c } from '../../src/theme';

export default function Camera() {
  const ask = async () => { try { await ImagePicker.requestCameraPermissionsAsync(); } finally { router.replace('/(tabs)/create'); } };
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <OnbTop step={12} />
        <View style={{ alignSelf: 'center', width: 96, height: 96, borderRadius: 24, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}><Icon name="camera" size={40} color={c.primaryLight} /></View>
        <H1>Use your camera in Hecto</H1>
        <Body>Snap references, and take skin photos for Try On and Skin Overlay. Photos stay on your phone unless you choose Real View.</Body>
      </Screen>
      <Footer>
        <Button label="Continue" onPress={ask} />
        <Button label="Not now" href="/(tabs)/create" variant="ghost" size="medium" />
      </Footer>
    </View>
  );
}
