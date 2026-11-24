import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { router } from 'expo-router';
import { Screen, Footer, H2, IconButton, Button, ToggleRow, Icon, Slider } from '../src/components';
import { img } from '../src/assets';
import { useApp } from '../src/state';
import { c, font } from '../src/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Row = ({ l, v }: { l: string; v: string }) => <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}><Text style={{ ...font(500, 15), color: c.muted }}>{l}</Text><Text style={{ ...font(700, 15), color: c.text }}>{v}</Text></View>;


export default function PrintScreen() {
  const { stencil } = useApp();
  const insets = useSafeAreaInsets();
  const [mirror, setMirror] = useState(true); const [copies, setCopies] = useState(1); const [cm, setCm] = useState(12.8);
  const ratio = stencil ? stencil.cov.h / stencil.cov.w : 1;
  const html = () => {
    const one = `<img src="${stencil!.uri}" style="width:${cm}cm;${mirror ? 'transform:scaleX(-1);' : ''}display:block;margin:0 auto 1cm auto;" />`;
    return `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body style="margin:0;padding:1cm;background:#fff;">${one.repeat(copies)}</body></html>`;
  };
  const need = () => { if (!stencil) { Alert.alert('Create a stencil first', 'Make a stencil from the Create tab, then print it.'); return true; } return false; };
  const doPrint = async () => { if (need()) return; try { await Print.printAsync({ html: html() }); } catch (e) { Alert.alert('Could not print', String(e)); } };
  const doPdf = async () => {
    if (need()) return;
    try {
      const { uri } = await Print.printToFileAsync({ html: html() });
      if (await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Save or share stencil PDF' });
      else Alert.alert('PDF saved', uri);
    } catch (e) { Alert.alert('Could not create PDF', String(e)); }
  };
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: Math.max(insets.top, 12), paddingBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <IconButton icon="chev_l" label="Back" /><H2>Print</H2>
      </View>
      <Screen>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line }}>
          <Icon name="print" size={20} color={c.primaryLight} />
          <View style={{ flex: 1 }}><Text style={{ ...font(700, 15.5), color: c.text }}>System print dialog</Text><Text style={{ ...font(500, 13), color: c.muted }}>Pick any Wi-Fi or Bluetooth printer your phone can see</Text></View>
        </View>
        <View style={{ height: 320, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
          <Image source={stencil ? ({ uri: stencil.uri } as any) : img.roseViolet} style={{ width: '100%', height: '100%', transform: [{ scaleX: mirror ? -1 : 1 }] }} resizeMode="contain" />
          <Text style={{ position: 'absolute', bottom: 8, ...font(600, 12), color: '#777' }}>Preview{mirror ? ' · mirrored' : ''}</Text>
        </View>
        <View style={{ borderRadius: 14, backgroundColor: c.surface, borderWidth: 1, borderColor: c.line, paddingHorizontal: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <View style={{ flex: 1, gap: 4 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ ...font(500, 15), color: c.muted }}>Width on skin</Text><Text style={{ ...font(700, 15), color: c.primaryLight }}>{cm.toFixed(1)} cm</Text></View><Slider value={cm} minimumValue={2} maximumValue={28} step={0.5} onValueChange={setCm} /></View>
          </View>
          <Row l="Height follows the design" v={`${(cm * ratio).toFixed(1)} cm`} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <View style={{ flex: 1, gap: 4 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ ...font(500, 15), color: c.muted }}>Copies</Text><Text style={{ ...font(700, 15), color: c.primaryLight }}>{copies}</Text></View><Slider value={copies} minimumValue={1} maximumValue={9} step={1} onValueChange={v => setCopies(Math.round(v))} /></View>
          </View>
        </View>
        <ToggleRow icon="flip" title="Mirror for transfer" sub="Needed for thermal transfer paper" on={mirror} onChange={setMirror} />
      </Screen>
      <Footer><Button label="Save PDF" variant="secondary" icon="download" onPress={doPdf} /><Button label="Print" icon="print" onPress={doPrint} /></Footer>
    </View>
  );
}
