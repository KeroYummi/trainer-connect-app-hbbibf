
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'workouts',
      route: '/(tabs)/workouts',
      icon: 'figure.strengthtraining.traditional',
      label: 'Workouts',
    },
    {
      name: 'nutrition',
      route: '/(tabs)/nutrition',
      icon: 'fork.knife',
      label: 'Nutrition',
    },
    {
      name: 'appointments',
      route: '/(tabs)/appointments',
      icon: 'calendar',
      label: 'Appointments',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="workouts">
          <Icon sf="figure.strengthtraining.traditional" drawable="ic_fitness" />
          <Label>Workouts</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="nutrition">
          <Icon sf="fork.knife" drawable="ic_restaurant" />
          <Label>Nutrition</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="appointments">
          <Icon sf="calendar" drawable="ic_calendar" />
          <Label>Appointments</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="workouts" />
        <Stack.Screen name="nutrition" />
        <Stack.Screen name="appointments" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
