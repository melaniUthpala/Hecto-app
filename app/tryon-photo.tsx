import React, { useRef, useState } from 'react';
import { Image, PanResponder, Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Screen, Footer, IconButton, Seg, Button, Icon, Body } from '../src/components';
import { img } from '../src/assets';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';

export default function TryOnPhoto() {
  const { stencil } = useApp();
  const [photo, setPhoto] = useState<any>(null); const [opacity, setOpacity] = useState(0.82); const [mirror, setMirror] = useState(false);
  const [pos, setPos] = useState({ x: 120, y: 140 }); const base = useRef(pos);
  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true, onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => { base.current = pos; },
    onPanResponderMove: (_, g) => setPos({ x: base.current.x + g.dx, y: base.current.y + g.dy }),
    onPanResponderRelease: (_, g) => { base.current = { x: base.current.x + g.dx, y: base.current.y + g.dy }; },
  })).current;
  const choose = async (cam = false) => {
    const r = cam ? await ImagePicker.launchCameraAsync({ quality: 1 }) : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    if (!r.canceled) setPhoto({ uri: r.assets[0].uri });
  };
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}><IconButton icon="chev_l" label="Back" /><Text style={{ ...font(800, 24), color: c.text, flex: 1 }}>Try On</Text><Text style={{ ...font(700, 13), color: c.green }}>Free</Text></View>
        <Seg options={['3D', 'Photo', 'Real View']} active={1} onChange={(i) => i === 0 ? router.replace('/(tabs)/tryon') : i === 2 && router.replace('/tryon-real')} />
        {photo || true ? (
          <View style={{ height: 380, borderRadius: 16, overflow: 'hidden', backgroundColor: c.surface }}>
            <Image source={photo ?? img.tryon.forearm} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            <View {...pan.panHandlers} style={{ position: 'absolute', left: pos.x, top: pos.y }}>
              <Image source={stencil ? ({ uri: stencil.uri } as any) : img.roseViolet} style={{ width: 150, height: stencil ? 150 * (stencil.cov.h / stencil.cov.w) : 150, opacity, transform: [{ scaleX: mirror ? -1 : 1 }], ...(stencil ? {} : ({ mixBlendMode: 'multiply' } as any)) }} resizeMode="contain" />
            </View>
            <View style={{ position: 'absolute', right: 10, top: 10, gap: 8 }}>
              <IconButton icon="camera" tone="overlay" label="Retake photo" onPress={() => choose(true)} />
              <IconButton icon="flip" tone="overlay" label="Mirror stencil" onPress={() => setMirror(!mirror)} />
            </View>
          </View>) : null}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={() => choose(false)} style={{ flex: 1, height: 64, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center' }}><Icon name="image" size={22} /><Text style={{ ...font(600, 12.5), color: c.text }}>Choose</Text></Pressable>
          <Pressable onPress={() => setMirror(!mirror)} style={{ flex: 1, height: 64, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center' }}><Icon name="refresh" size={22} /><Text style={{ ...font(600, 12.5), color: c.text }}>Flip</Text></Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...font(700, 15), color: c.text }}>Opacity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Pressable onPress={() => setOpacity(Math.max(0.1, opacity - 0.1))}><Icon name="chev_d" size={22} /></Pressable>
            <Text style={{ ...font(700, 15), color: c.primaryLight }}>{Math.round(opacity * 100)}%</Text>
            <Pressable onPress={() => setOpacity(Math.min(1, opacity + 0.1))}><Icon name="plus" size={22} /></Pressable>
          </View>
        </View>
        <Body style={{ fontSize: 13.5 }}>Drag to move, pinch to resize, twist to rotate. The stencil follows the photo&apos;s light and skin tone.</Body>
      </Screen>
      <Footer>
        <Button label="Save image" icon="download" variant="secondary" href="/(tabs)/library" />
        <Button label="Real View" icon="wand" href="/tryon-real" />
      </Footer>
    </View>
  );
}
