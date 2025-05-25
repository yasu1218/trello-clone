import { ActionSheetProvider } from '@expo/react-native-action-sheet'; // For wrapping the app to allow use of action sheets (pop-up option menus)
import { Stack } from "expo-router"; // For defining the navigation stack (pushing / popping screens)
import { StatusBar } from "expo-status-bar"; // For controlling the status bar appearance
import { GestureHandlerRootView } from "react-native-gesture-handler"; // For handling gestures in the app (swipe, pan, etc.)

// _layout.tsx
// defines the root layout for the app's navigation using Expo Router, with some global providers and UI setup.

// Initial layout component:
// This component is used to define the initial layout of the app.
const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false }} />
    </Stack>
  )
}

// Root layout component:
// ActionSheetProvider is used to provide the action sheet context throughout the app.
// GestureHandlerRootView is used to wrap the app to enable gesture handling.
// StatusBar is used to control the appearance of the status bar. (light mode in this case)
// The InitialLayout component is rendered inside the GestureHandlerRootView to ensure that gestures are handled correctly.
const RootLayoutNav = () => {
  return (
    <ActionSheetProvider>
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="light" />
          <InitialLayout />
        </GestureHandlerRootView>
      </>
    </ActionSheetProvider>
  )
}

export default RootLayoutNav;
