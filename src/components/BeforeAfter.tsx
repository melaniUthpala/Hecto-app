import React, { useRef, useState } from 'react';
import { Image, ImageSourcePropType, PanResponder, View } from 'react-native';

type Props = { before: ImageSourcePropType; after: ImageSourcePropType; split?: number; height?: number; bg?: string };
/** Draggable before/after slider (design: UiBeforeAfter, mode=slider) */
export function BeforeAfter({ before, after, split = 50, height = 360, bg = '#FFFFFF' }: Props) {
  const [w, setW] = useState(0);
  const [pct, setPct] = useState(split);
  const start = useRef(split);
  const wRef = useRef(0);
  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => { if (wRef.current) { const p = (e.nativeEvent.locationX / wRef.current) * 100; start.current = clamp(p); setPct(start.current); } },
    onPanResponderMove: (_, g) => { if (wRef.current) setPct(clamp(start.current + (g.dx / wRef.current) * 100)); },
    onPanResponderRelease: (_, g) => { if (wRef.current) start.current = clamp(start.current + (g.dx / wRef.current) * 100); },
  })).current;
  const x = (w * pct) / 100;
  return (
    <View {...pan.panHandlers} onLayout={(e) => { setW(e.nativeEvent.layout.width); wRef.current = e.nativeEvent.layout.width; }}
      style={{ height, borderRadius: 16, overflow: 'hidden', backgroundColor: '#1B1B1B' }}>
      <Image source={before} resizeMode="cover" style={{ position: 'absolute', width: '100%', height }} />
      <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: x, overflow: 'hidden', backgroundColor: bg }}>
        <Image source={after} resizeMode="cover" style={{ width: w, height }} />
      </View>
      <View style={{ position: 'absolute', left: x - 1, top: 0, bottom: 0, width: 2, backgroundColor: '#fff' }} />
      <View style={{ position: 'absolute', left: x - 18, top: height / 2 - 18, width: 36, height: 36, borderRadius: 18, backgroundColor: '#7C5CFA', borderWidth: 3, borderColor: '#fff' }} />
    </View>
  );
}
const clamp = (n: number) => Math.max(0, Math.min(100, n));
