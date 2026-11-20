import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SheetHeader, goBack } from './ui';
import { c } from '../theme';

/** Bottom sheet shell for transparentModal routes (design: UiSheetHeader + dim backdrop) */
export function Sheet({ title, sub, icon, children, footer }: { title: string; sub?: string; icon?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,.55)' }}>
      <Pressable style={{ flex: 1 }} onPress={goBack} />
      <View style={{ maxHeight: '86%', backgroundColor: c.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1, borderColor: c.line, overflow: 'hidden' }}>
        <SheetHeader title={title} sub={sub} icon={icon} />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>{children}</ScrollView>
        {footer ? <View style={{ padding: 20, paddingTop: 0, paddingBottom: 32, gap: 10 }}>{footer}</View> : null}
      </View>
    </View>
  );
}
