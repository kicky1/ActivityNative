import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';

const SCREEN_OPTIONS = {
  animation: 'ios', // for android
} as const;

const PublicLayout = () => {
  useInitialAndroidBarSync();
  const { colorScheme } = useColorScheme();

  return (
    <>



         <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetModalProvider>
      <ActionSheetProvider>
        <NavThemeProvider value={NAV_THEME[colorScheme]}>
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Activity App',
        }}></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Rejestracja',
        }}></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset hasła',
        }}></Stack.Screen>
    </Stack>
    </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
 
  );
};

export default PublicLayout;