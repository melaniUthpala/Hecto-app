import React from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Screen, Footer, H2, Body, Button, StyleCard, CreditPill, Icon, ActionTile } from '../../src/components';
import { img } from '../../src/assets';
import { useApp } from '../../src/state';
import { c, font } from '../../src/theme';

const STYLES = [
  { k: 'Linework', desc: 'Single-weight lines that trace every edge.', time: 'Good for lettering', s: img.sampleOutline },
  { k: 'Shading', desc: 'Lines plus mapped shadow zones, so you know where to pack and blend.', time: 'Good for realism', s: img.sampleStandard },
  { k: 'Crosshatch', desc: 'Fine crossing lines that carry depth, for engraving and fine-line realism.', time: 'Good for portraits', s: img.roseViolet },
] as const;

export default function Create() {
  const { credits, style, setStyle, photoUri, setPhotoUri } = useApp();
  const launch = async (cam: boolean) => {
    try {
      if (cam) {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) { Alert.alert('Camera permission needed', 'Allow camera access in Settings, or choose from gallery.'); return; }
      }
      const r = cam ? await ImagePicker.launchCameraAsync({ quality: 1 }) : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
      if (!r.canceled) setPhotoUri(r.assets[0].uri);
    } catch (e) { Alert.alert('Could not open photos', String(e)); }
  };
  const choose = () => Alert.alert('Add a reference photo', undefined, [
    { text: 'Camera', onPress: () => launch(true) }, { text: 'Gallery', onPress: () => launch(false) }, { text: 'Cancel', style: 'cancel' }]);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><H2>Create</H2><CreditPill n={credits} /></View>
        <Pressable onPress={choose} style={{ height: photoUri ? 200 : 120, borderRadius: 16, overflow: 'hidden', borderWidth: photoUri ? 2 : 1.5, borderStyle: photoUri ? 'solid' : 'dashed', borderColor: photoUri ? c.primary : '#3A3A3A', backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {photoUri ? (
            <>
              <Image source={{ uri: photoUri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              <View style={{ position: 'absolute', bottom: 10, right: 10, flexDirection: 'row', gap: 6, alignItems: 'center', paddingHorizontal: 12, height: 32, borderRadius: 16, backgroundColor: 'rgba(19,19,19,.78)' }}>
                <Icon name="refresh" size={15} color="#fff" /><Text style={{ ...font(600, 13), color: '#fff' }}>Change photo</Text>
              </View>
            </>
          ) : (
            <>
              <Icon name="upload" size={26} color={c.primaryLight} />
              <Text style={{ ...font(700, 16), color: c.text }}>Add a reference photo</Text>
              <Text style={{ ...font(500, 13), color: c.muted }}>Camera or gallery</Text>
            </>
          )}
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...font(700, 18), color: c.text }}>Stencil style</Text>
          <Pressable onPress={() => router.push('/tips')} style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}><Icon name="bulb" size={16} color={c.amber} /><Text style={{ ...font(600, 14), color: c.primaryLight }}>Tips</Text></Pressable>
        </View>
        <Body style={{ fontSize: 14 }}>Every style costs 1 credit. The samples show the same rose in each style.</Body>
        {STYLES.map((s) => <StyleCard key={s.k} title={s.k} desc={s.desc} time={s.time} sample={s.s} selected={style === s.k} onPress={() => setStyle(s.k)} />)}
        <Text style={{ ...font(700, 16), color: c.text, marginTop: 4 }}>See it on skin first</Text>
        <Body style={{ fontSize: 14 }}>Try On in 3D, on a photo, or with Real View.</Body>
        <ActionTile icon="body" label="Open Try On" href="/(tabs)/tryon" />
      </Screen>
      <Footer>
        <Button label="Create stencil · 1 credit" icon="sparkle" variant={photoUri ? 'primary' : 'disabled'} href={credits > 0 ? '/generating' : '/paywall'} />
        <Text style={{ ...font(500, 13), color: c.muted, textAlign: 'center' }}>{!photoUri ? 'Add a photo to continue' : credits > 0 ? `Balance ${credits} credits` : 'Balance 0 credits · you will be asked to top up first'}</Text>
      </Footer>
    </View>
  );
}
