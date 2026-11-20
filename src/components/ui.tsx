import React from 'react';
import { Image, ImageSourcePropType, Pressable, ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { c, font } from '../theme';

/* ---------- Icon: design icon names -> Ionicons ---------- */
const ICONS: Record<string, string> = {
  bell: 'notifications-outline', body: 'body-outline', bolt: 'flash-outline', brush: 'brush-outline', bt: 'bluetooth',
  bucket: 'color-fill-outline', bulb: 'bulb-outline', calendar: 'calendar-outline', camera: 'camera-outline',
  check: 'checkmark', chev_d: 'chevron-down', chev_l: 'chevron-back', chev_r: 'chevron-forward', clock: 'time-outline',
  coin: 'disc-outline', contrast: 'contrast-outline', cube: 'cube-outline', curves: 'analytics-outline',
  doc: 'document-text-outline', dots: 'ellipsis-horizontal', download: 'download-outline', drop: 'water-outline',
  eraser: 'backspace-outline', eye: 'eye-outline', faq: 'help-circle-outline', file: 'document-outline', flash: 'flash-outline',
  flip: 'swap-horizontal', folder: 'folder-outline', frame: 'scan-outline', gear: 'settings-outline', gift: 'gift-outline',
  globe: 'globe-outline', grid: 'grid-outline', hand: 'hand-left-outline', help: 'help-circle-outline', home: 'home-outline',
  image: 'image-outline', info: 'information-circle-outline', layers: 'layers-outline', lock: 'lock-closed-outline',
  mail: 'mail-outline', mic: 'mic-outline', moon: 'moon-outline', move: 'move-outline', msg: 'chatbubble-outline',
  opacity: 'ellipse-outline', palette: 'color-palette-outline', pen: 'create-outline', plus: 'add', print: 'print-outline',
  redo: 'arrow-redo-outline', refresh: 'refresh', ruler: 'resize-outline', search: 'search', send: 'send', share: 'share-outline',
  sharpen: 'sparkles-outline', shield: 'shield-checkmark-outline', sparkle: 'sparkles-outline', star: 'star', sun: 'sunny-outline',
  target: 'locate-outline', team: 'people-outline', trash: 'trash-outline', undo: 'arrow-undo-outline',
  upload: 'cloud-upload-outline', user: 'person-outline', wand: 'color-wand-outline', wifi: 'wifi', x: 'close',
};
export const Icon = ({ name, size = 20, color = c.text }: { name: string; size?: number; color?: string }) =>
  <Ionicons name={(ICONS[name] ?? 'help-circle-outline') as any} size={size} color={color} />;

export const goBack = () => (router.canGoBack() ? router.back() : router.replace('/(tabs)/create'));
const go = (href?: string, onPress?: () => void) => () => { onPress?.(); if (href && href !== '#') router.push(href as any); };

/* ---------- Layout ---------- */
export const Screen = ({ children, scroll = true, pad = 20, style }: { children: React.ReactNode; scroll?: boolean; pad?: number; style?: StyleProp<ViewStyle> }) => (
  <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.bg }}>
    {scroll
      ? <ScrollView contentContainerStyle={[{ padding: pad, gap: 16, paddingBottom: 40 }, style]} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      : <View style={[{ flex: 1, padding: pad }, style]}>{children}</View>}
  </SafeAreaView>
);
export const Footer = ({ children }: { children: React.ReactNode }) => {
  const { bottom } = useSafeAreaInsets();
  return <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(bottom, 16), gap: 10, backgroundColor: c.bg }}>{children}</View>;
};
export const H1 = ({ children }: any) => <Text style={{ ...font(800, 30, 1.12), letterSpacing: -0.75, color: c.text }}>{children}</Text>;
export const H2 = ({ children }: any) => <Text style={{ ...font(800, 26, 1.15), letterSpacing: -0.5, color: c.text }}>{children}</Text>;
export const Body = ({ children, style }: any) => <Text style={[{ ...font(500, 15.5, 1.5), color: c.muted }, style]}>{children}</Text>;
export const Label = ({ children }: any) => <Text style={{ ...font(700, 16), color: c.text }}>{children}</Text>;

/* ---------- Button (UiButton) ---------- */
const VARIANT = {
  primary: [c.primary, '#fff', c.primary], secondary: [c.raised, c.text, c.line],
  outline: ['transparent', c.text, '#3A3A3A'], ghost: ['transparent', c.muted, 'transparent'], disabled: [c.raised, c.dim, c.line],
} as const;
export function Button({ label, href, onPress, variant = 'primary', icon, size = 'large' }:
  { label: string; href?: string; onPress?: () => void; variant?: keyof typeof VARIANT; icon?: string; size?: 'large' | 'medium' }) {
  const [bg, fg, bd] = VARIANT[variant];
  return (
    <Pressable disabled={variant === 'disabled'} onPress={go(href, onPress)} accessibilityRole="button"
      style={({ pressed }) => ({ height: size === 'medium' ? 46 : 54, borderRadius: 12, backgroundColor: pressed && variant === 'primary' ? '#6A49E8' : pressed && variant === 'secondary' ? '#303030' : bg,
        borderWidth: variant === 'ghost' ? 0 : 1, borderColor: bd, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 })}>
      {icon ? <Icon name={icon} size={19} color={fg} /> : null}
      <Text style={{ ...font(700, 16), color: fg }}>{label}</Text>
    </Pressable>
  );
}
export const IconButton = ({ icon = 'chev_l', href, onPress, tone = 'default', label }:
  { icon?: string; href?: string; onPress?: () => void; tone?: 'default' | 'accent' | 'primary' | 'danger' | 'overlay'; label?: string }) => {
  const T = { default: [c.surface, c.line, c.text], accent: [c.surface, c.line, c.primaryLight], primary: [c.primary, 'transparent', '#fff'],
    danger: [c.surface, c.line, c.red], overlay: ['rgba(19,19,19,.72)', 'transparent', '#fff'] }[tone];
  return (
    <Pressable accessibilityLabel={label} onPress={go(href, onPress ?? (icon === 'chev_l' && !href ? goBack : undefined))}
      style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: T[0], borderWidth: 1, borderColor: T[1], alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} size={20} color={T[2]} />
    </Pressable>
  );
};
export const Steps = ({ count, active }: { count: number; active: number }) => (
  <View style={{ flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
    {Array.from({ length: count }, (_, i) => <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i <= active ? c.primary : '#3A3A3A' }} />)}
  </View>
);
/** Top bar for onboarding: back + progress + optional Skip */
export const OnbTop = ({ step, skipHref }: { step: number; skipHref?: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
    <IconButton icon="chev_l" label="Back" />
    <Steps count={13} active={step} />
    {skipHref ? <Pressable onPress={() => router.push(skipHref as any)}><Text style={{ ...font(600, 14.5), color: c.muted }}>Skip</Text></Pressable> : <View style={{ width: 28 }} />}
  </View>
);

/* ---------- Segmented control (UiSeg) ---------- */
export const Seg = ({ options, active, onChange }: { options: string[]; active: number; onChange?: (i: number) => void }) => (
  <View style={{ flexDirection: 'row', gap: 2, padding: 4, borderRadius: 12, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
    {options.map((o, i) => (
      <Pressable key={o} onPress={() => onChange?.(i)} accessibilityState={{ selected: i === active }}
        style={{ flex: 1, height: 38, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: i === active ? '#363636' : 'transparent' }}>
        <Text style={{ ...font(i === active ? 700 : 600, 14.5), color: i === active ? c.text : c.muted }}>{o}</Text>
      </Pressable>))}
  </View>
);

/* ---------- Rows ---------- */
export const ListRow = ({ icon, title, sub, href, onPress, last }: { icon: string; title: string; sub?: string; href?: string; onPress?: () => void; last?: boolean }) => (
  <Pressable onPress={go(href, onPress)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 64, paddingVertical: 10, paddingHorizontal: 14, borderBottomWidth: last ? 0 : 1, borderBottomColor: c.line }}>
    <Icon name={icon} size={21} color="#D4D4D4" />
    <View style={{ flex: 1, gap: 1 }}>
      <Text style={{ ...font(600, 15.5), color: c.text }}>{title}</Text>
      {sub ? <Text style={{ ...font(500, 13), color: c.muted }}>{sub}</Text> : null}
    </View>
    <Icon name="chev_r" size={18} color={c.dim} />
  </Pressable>
);
export const Group = ({ children }: any) => <View style={{ backgroundColor: c.surface, borderRadius: 16, borderWidth: 1, borderColor: c.line, overflow: 'hidden' }}>{children}</View>;
export const ToggleRow = ({ icon, title, sub, on, onChange }: { icon: string; title: string; sub?: string; on: boolean; onChange: (v: boolean) => void }) => (
  <Pressable onPress={() => onChange(!on)} accessibilityRole="switch" accessibilityState={{ checked: on }}
    style={{ flexDirection: 'row', alignItems: 'center', gap: 14, minHeight: 68, padding: 12, paddingHorizontal: 14, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
    <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={19} color={c.muted} /></View>
    <View style={{ flex: 1, gap: 1 }}>
      <Text style={{ ...font(600, 15.5), color: c.text }}>{title}</Text>
      {sub ? <Text style={{ ...font(500, 13), color: c.muted }}>{sub}</Text> : null}
    </View>
    <View style={{ width: 48, height: 28, borderRadius: 14, backgroundColor: on ? c.primary : '#3A3A3A' }}>
      <View style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' }} />
    </View>
  </Pressable>
);
export const SheetHeader = ({ title, sub, icon }: { title: string; sub?: string; icon?: string }) => (
  <View style={{ gap: 14, paddingTop: 10, paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: c.line }}>
    <View style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: '#444' }} />
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {icon ? <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={20} color={c.primaryLight} /></View> : null}
      <View style={{ flex: 1 }}>
        <Text style={{ ...font(700, 20), color: c.text }}>{title}</Text>
        {sub ? <Text style={{ ...font(500, 14), color: c.muted }}>{sub}</Text> : null}
      </View>
      <Pressable accessibilityLabel="Close" onPress={goBack} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="x" size={16} color={c.muted} />
      </Pressable>
    </View>
  </View>
);

/* ---------- Cards & tiles ---------- */
export const StyleCard = ({ title, desc, credits = '1 credit', time, sample, selected, onPress }:
  { title: string; desc: string; credits?: string; time?: string; sample: ImageSourcePropType; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} accessibilityState={{ selected }}
    style={{ flexDirection: 'row', gap: 14, padding: 12, borderRadius: 16, borderWidth: selected ? 2 : 1, borderColor: selected ? c.primary : c.line, backgroundColor: selected ? 'rgba(124,92,250,.07)' : c.surface }}>
    <Image source={sample} style={{ width: 98, height: 98, borderRadius: 12, backgroundColor: '#fff' }} />
    <View style={{ flex: 1, gap: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ ...font(700, 17), color: c.text }}>{title}</Text>
        <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: selected ? c.primary : '#4A4A4A', alignItems: 'center', justifyContent: 'center' }}>
          {selected ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.primary }} /> : null}
        </View>
      </View>
      <Text style={{ ...font(500, 13.5, 1.4), color: c.muted }}>{desc}</Text>
      <View style={{ marginTop: 'auto', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', columnGap: 10 }}>
        <Text style={{ ...font(600, 13), color: selected ? c.primaryLight : c.text }}>{credits}</Text>
        {time ? <Text style={{ ...font(600, 13), color: c.muted }}>{time}</Text> : null}
      </View>
    </View>
  </Pressable>
);
export const ChoiceCard = ({ icon, title, sub, selected, onPress }: { icon: string; title: string; sub?: string; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, borderWidth: selected ? 2 : 1, borderColor: selected ? c.primary : c.line, backgroundColor: selected ? 'rgba(124,92,250,.07)' : c.surface }}>
    <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={20} color={selected ? c.primaryLight : c.text} /></View>
    <View style={{ flex: 1 }}>
      <Text style={{ ...font(700, 16), color: c.text }}>{title}</Text>
      {sub ? <Text style={{ ...font(500, 13.5), color: c.muted }}>{sub}</Text> : null}
    </View>
    <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: selected ? c.primary : '#4A4A4A', alignItems: 'center', justifyContent: 'center' }}>
      {selected ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.primary }} /> : null}
    </View>
  </Pressable>
);
export const TagTile = ({ label, img, selected, onPress }: { label: string; img: ImageSourcePropType; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={{ width: '47.5%', borderRadius: 16, overflow: 'hidden', borderWidth: selected ? 2 : 1, borderColor: selected ? c.primary : c.line, backgroundColor: c.surface }}>
    <Image source={img} style={{ width: '100%', height: 110, backgroundColor: '#fff' }} resizeMode="cover" />
    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ ...font(700, 15), color: c.text }}>{label}</Text>
      {selected ? <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={13} color="#fff" /></View> : null}
    </View>
  </Pressable>
);
export const StencilTile = ({ img, title, meta, num, href, onPress }: { img: ImageSourcePropType; title: string; meta: string; num: string; href?: string; onPress?: () => void }) => (
  <Pressable onPress={go(href, onPress)} style={{ flex: 1, borderRadius: 14, overflow: 'hidden', backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
    <Image source={img} style={{ width: '100%', height: 150, backgroundColor: '#fff' }} resizeMode="cover" />
    <View style={{ padding: 10, gap: 1 }}>
      <Text style={{ ...font(700, 15), color: c.text }}>{title}</Text>
      <Text style={{ ...font(500, 12.5), color: c.muted }}>{meta} · {num}</Text>
    </View>
  </Pressable>
);
export const ColorSwatch = ({ color, label, selected, onPress }: { color: string; label: string; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={{ alignItems: 'center', gap: 6, width: 56 }}>
    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: color, borderWidth: selected ? 3 : 1, borderColor: selected ? c.primaryLight : c.line }} />
    <Text style={{ ...font(selected ? 700 : 500, 12), color: selected ? c.text : c.muted }}>{label}</Text>
  </Pressable>
);
export const ToolButton = ({ icon, label, active, onPress }: { icon: string; label: string; active?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={{ alignItems: 'center', gap: 4, width: 58 }}>
    <View style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: active ? c.primary : c.raised, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={20} color={active ? '#fff' : c.text} /></View>
    <Text style={{ ...font(600, 11.5), color: active ? c.primaryLight : c.muted }}>{label}</Text>
  </Pressable>
);
export const ActionTile = ({ icon, label, href }: { icon: string; label: string; href?: string }) => (
  <Pressable onPress={go(href)} style={{ flex: 1, height: 64, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
    <Icon name={icon} size={20} color={c.primaryLight} /><Text style={{ ...font(700, 15), color: c.text }}>{label}</Text>
  </Pressable>
);
export const TipCard = ({ icon, title, body }: { icon: string; title: string; body: string }) => (
  <View style={{ flexDirection: 'row', gap: 14, padding: 14, borderRadius: 16, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
    <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: c.raised, alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={20} color={c.amber} /></View>
    <View style={{ flex: 1, gap: 2 }}><Text style={{ ...font(700, 16), color: c.text }}>{title}</Text><Text style={{ ...font(500, 14, 1.4), color: c.muted }}>{body}</Text></View>
  </View>
);
export const PackRow = ({ credits, price, note, selected, onPress }: { credits: number; price: string; note?: string; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', height: 76, paddingHorizontal: 16, borderRadius: 16, borderWidth: selected ? 2 : 1, borderColor: selected ? c.primary : c.line, backgroundColor: selected ? 'rgba(124,92,250,.07)' : c.surface }}>
    <View style={{ flex: 1 }}>
      <Text style={{ ...font(800, 18), color: c.text }}>{credits} credits</Text>
      {note ? <Text style={{ ...font(600, 13), color: selected ? c.primaryLight : c.muted }}>{note}</Text> : null}
    </View>
    <Text style={{ ...font(700, 17), color: c.text }}>{price}</Text>
  </Pressable>
);
export const ReviewCard = ({ quote, name, role, stars = 5 }: { quote: string; name: string; role: string; stars?: number }) => (
  <View style={{ width: 260, minHeight: 168, padding: 16, borderRadius: 16, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, gap: 10 }}>
    <View style={{ flexDirection: 'row', gap: 2 }}>{Array.from({ length: stars }, (_, i) => <Icon key={i} name="star" size={14} color={c.amber} />)}</View>
    <Text style={{ ...font(500, 14.5, 1.45), color: c.text }}>{quote}</Text>
    <View style={{ marginTop: 'auto' }}><Text style={{ ...font(700, 13.5), color: c.text }}>{name}</Text><Text style={{ ...font(500, 12.5), color: c.muted }}>{role}</Text></View>
  </View>
);
export const CreditPill = ({ n, href = '/paywall' }: { n: number; href?: string }) => (
  <Pressable onPress={go(href)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 36, paddingHorizontal: 12, borderRadius: 18, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
    <Icon name="coin" size={17} color={c.primaryLight} /><Text style={{ ...font(700, 14), color: c.text }}>{n}</Text><Icon name="plus" size={16} color={c.primaryLight} />
  </Pressable>
);
export const ProgressList = ({ items, done }: { items: string[]; done: number }) => (
  <View style={{ gap: 12 }}>
    {items.map((t, i) => (
      <View key={t} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: i < done ? c.green : 'transparent', borderWidth: i < done ? 0 : 2, borderColor: '#3A3A3A' }}>
          {i < done ? <Icon name="check" size={13} color="#121212" /> : null}
        </View>
        <Text style={{ flex: 1, ...font(i < done ? 600 : 500, 15.5), color: i < done ? c.text : c.muted }}>{t}</Text>
      </View>))}
  </View>
);
export const Chip = ({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={{ height: 38, paddingHorizontal: 16, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: selected ? 'rgba(124,92,250,.15)' : c.surface, borderWidth: 1, borderColor: selected ? c.primary : c.line }}>
    <Text style={{ ...font(600, 14), color: selected ? c.primaryLight : c.text }}>{label}</Text>
  </Pressable>
);
