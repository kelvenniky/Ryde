import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "../global.css";
import { useFonts } from 'expo-font';

import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@/lib/auth';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!







const RootLayout = () => {

   const [loaded] = useFonts({
      "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
      "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
      "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
      "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
      "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
      "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
      "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!publishableKey) {
   throw new Error(
     'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
   )
 }
  return (
   <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
     <Stack>
        <Stack.Screen name='index' options={{headerShown:false}} />
        <Stack.Screen name='(root)' options={{headerShown:false}} />
        <Stack.Screen name='(auth)' options={{headerShown:false}} />

     </Stack>
     </ClerkLoaded>
     </ClerkProvider>
    
  )
}

export default RootLayout

