import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '../../src/components';
import { c, font } from '../../src/theme';

const tab = (name: string, title: string, icon: string) => (
  <Tabs.Screen key={name} name={name} options={{ title, tabBarIcon: ({ color }) => <Icon name={icon} size={23} color={color} /> }} />
);
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: c.primaryLight, tabBarInactiveTintColor: '#8A8A8A',
      tabBarLabelStyle: { ...font(600, 11.5) }, tabBarStyle: { backgroundColor: c.tabbar, borderTopColor: c.line, height: 84, paddingTop: 8 } }}>
      {tab('create', 'Create', 'home')}
      {tab('tryon', 'Try On', 'body')}
      {tab('library', 'Stencils', 'grid')}
      {tab('profile', 'Profile', 'user')}
    </Tabs>
  );
}
