import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  PanResponder,
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

type Props = {
  before: ImageSourcePropType;
  after: ImageSourcePropType;
  split?: number;
  height?: number;
  bg?: string;
};

/**
 * Touch-friendly before/after comparison.
 * Coordinates are measured in window space so touches that begin on child
 * images still map to the correct position inside the comparison frame.
 */
export function BeforeAfter({
  before,
  after,
  split = 50,
  height = 360,
  bg = '#FFFFFF',
}: Props) {
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(() => clamp(split));
  const frameRef = useRef<any>(null);
  const frameLeft = useRef(0);
  const widthRef = useRef(0);
  const positionRef = useRef(clamp(split));
  const dragStart = useRef(0);

  // Keep controlled split changes (e.g. the onboarding progress demo) in sync.
  useEffect(() => {
    const next = clamp(split);
    positionRef.current = next;
    setPosition(next);
  }, [split]);

  const updatePosition = (next: number) => {
    const value = clamp(next);
    positionRef.current = value;
    setPosition(value);
  };

  const measureFrame = () => {
    frameRef.current?.measureInWindow((x) => {
      frameLeft.current = x;
    });
  };

  const positionFromPageX = (pageX: number) => {
    if (!widthRef.current) return positionRef.current;
    return ((pageX - frameLeft.current) / widthRef.current) * 100;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (_, gesture) =>
        Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderGrant: (event: GestureResponderEvent) => {
        measureFrame();
        const next = positionFromPageX(event.nativeEvent.pageX);
        dragStart.current = next;
        updatePosition(next);
      },
      onPanResponderMove: (_, gesture: PanResponderGestureState) => {
        updatePosition(positionFromPageX(gesture.moveX));
      },
      onPanResponderRelease: (_, gesture: PanResponderGestureState) => {
        updatePosition(positionFromPageX(gesture.moveX));
      },
      onPanResponderTerminate: () => {
        dragStart.current = positionRef.current;
      },
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    }),
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    widthRef.current = nextWidth;
    setWidth(nextWidth);
    requestAnimationFrame(measureFrame);
  };

  const revealWidth = (width * position) / 100;

  return (
    <View
      ref={frameRef}
      collapsable={false}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel="Before and after photo comparison"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(position), text: `${Math.round(position)} percent` }}
      accessibilityActions={[
        { name: 'increment', label: 'Show more of the after image' },
        { name: 'decrement', label: 'Show more of the before image' },
      ]}
      onAccessibilityAction={(event) => {
        if (event.nativeEvent.actionName === 'increment') updatePosition(positionRef.current + 5);
        if (event.nativeEvent.actionName === 'decrement') updatePosition(positionRef.current - 5);
      }}
      style={[styles.frame, { height, backgroundColor: bg }]}
    >
      <Image
        source={before}
        resizeMode="cover"
        fadeDuration={120}
        style={[StyleSheet.absoluteFill, { width: '100%', height }]}
      />

      <View
        pointerEvents="none"
        style={[
          styles.afterClip,
          { width: revealWidth, height, backgroundColor: bg },
        ]}
      >
        <Image
          source={after}
          resizeMode="cover"
          fadeDuration={120}
          style={{ width, height }}
        />
      </View>

      <View pointerEvents="none" style={[styles.divider, { left: revealWidth - 1, height }]} />
      <View
        pointerEvents="none"
        style={[
          styles.handle,
          { left: revealWidth - 23, top: height / 2 - 23 },
        ]}
      >
        <Text style={styles.handleArrows}>‹ ›</Text>
      </View>

      <View pointerEvents="none" style={styles.labels}>
        <View style={styles.labelPill}><Text style={styles.labelText}>AFTER</Text></View>
        <View style={styles.labelPill}><Text style={styles.labelText}>BEFORE</Text></View>
      </View>
      <View pointerEvents="none" style={styles.hint}>
        <Text style={styles.hintText}>DRAG TO COMPARE</Text>
      </View>
    </View>
  );
}

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  afterClip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 3,
    elevation: 3,
  },
  handle: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C5CFA',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  handleArrows: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '800',
    marginTop: -3,
    letterSpacing: -3,
  },
  labels: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  hint: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
