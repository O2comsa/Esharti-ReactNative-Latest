import { useFonts } from "expo-font";
import { SplashScreen, Stack, Unmatched, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nManager } from "react-native";
import { preFetchProfile as preFetchProfileFn } from "../features/account/hooks/useProfile";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import messaging from "@react-native-firebase/messaging";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  const [isProfileFetching, setIsProfileFetching] = useState<boolean>(true);
  const [loaded, error] = useFonts({
    IBMPlexSansArabic400: require("../assets/fonts/IBMPlexSansArabic-400.ttf"),
    IBMPlexSansArabic500: require("../assets/fonts/IBMPlexSansArabic-500.ttf"),
    IBMPlexSansArabic600: require("../assets/fonts/IBMPlexSansArabic-600.ttf"),
  });

  useEffect(() => {
    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data) {
          const related_id = remoteMessage?.data?.related_id;
          const related_type = remoteMessage?.data?.related_type;
          //@ts-ignore
          navigateToScreen(related_id, related_type);
        }
      });

    const navigateToScreen = (related_id: string, related_type: string) => {
      if (related_type === undefined) return;
      if (related_type?.includes("course")) {
        router.push({ pathname: "/courses/[id]", params: { id: related_id } });
      } else if (
        related_type?.includes("live-event") ||
        related_id?.includes("liveEvent")
      ) {
        router.push({
          pathname: "/liveEvent",
          params: { liveEventId: related_id },
        });
      } else if (related_type?.includes("dictionary")) {
        router.push({
          pathname: "/dictionary/[id]",
          params: { id: related_id },
        });
      } else if (related_type?.includes("certificate")) {
        router.push({ pathname: "/certificates" });
      }
    };

    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response: any) => {
      const { type, id } = response?.notification?.request?.content?.data;
      navigateToScreen(id, type);
    };

    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationClick
      );

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      const notification = {
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: remoteMessage.data, // optional data payload
      };
    });

    // Handle push notifications when the app is in the foreground
    const handlePushNotification = async (remoteMessage: any) => {
      const notification = {
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: remoteMessage.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    };

    // Listen for push notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(handlePushNotification);

    // Clean up the event listeners
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, []);
  useEffect(() => {
    const prefetchProfile = async () => {
      try {
        let token = await SecureStore.getItemAsync("token");
        if (token) {
          await queryClient.prefetchQuery({
            queryKey: ["profile"],
            queryFn: preFetchProfileFn,
          });
        }
      } catch (error) {
      } finally {
        setIsProfileFetching(false);
      }
    };
    prefetchProfile();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isProfileFetching) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isProfileFetching]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <RootLayoutNav />
      <StatusBar style="dark" />
    </>
  );
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ animation: "fade", animationDuration: 150 }}>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="live-event/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="courses/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="courses/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="lessons/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="dictionary/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="dictionary/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="account/[key]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="account/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="account/bookmarks"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="auth/index" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen
              name="articles/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="articles/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="liveTechnicalSupport"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="certificates"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="payment" options={{ headerShown: false }} />
            <Stack.Screen
              name="paymentSuccess"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="zoom" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
