import Container from "../components/Container";
import TopBar from "../components/TopBar";
import NotificationBottomSheet from "../components/NotificationBottomSheet";
import { ScrollView } from "react-native";
import SuggestedCoursesList from "../components/SuggestedCoursesList";
import { LatestArticlesList } from "../features/articles";
import { LiveTechnicalSupportCard } from "../features/liveTechnicalSupport";
import { Suspense, useEffect } from "react";
import { View } from "../components/custom/View";
import { Text } from "../components/custom/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useBottomSheet } from "../features/bottomSheet";
import { LiveEventList } from "../features/liveEvent";
import useProfile from "../features/account/hooks/useProfile";
import { API } from "../lib/client";
import { authRoutes } from "../routes";
//import NationalIdBottomSheet from "../components/NationalIdBottomSheet";
import HomeScreenSkeleton from "../components/HomeScreenSkeleton";
import NoAuthLiveSupportCard from "../features/liveTechnicalSupport/components/NoAuthLiveSupportCard";
import messaging from "@react-native-firebase/messaging";
import useNotificationUserPermission from "../hooks/useNotificationUserPermission";

import useAuth from "../hooks/useAuth";
export default function Home() {
  const {
    bottomSheetRef: NotificationBottomSheetRef,
    close,
    open,
  } = useBottomSheet();
  /*const {
    bottomSheetRef: NationalIdBottomSheetRef,
    close: closeNationalIdBottomSheet,
    open: openNationalIdBottomSheet,
  } = useBottomSheet();*/
  const { data, refetch } = useProfile();
  useEffect(() => {
    const getDeviceTokenAsync = async () => {
      // ask for Permissions to send notifications
      const permission = await useNotificationUserPermission();
      if (permission) {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        try {
          await API.post(authRoutes.registerDeviceToken, {
            device_token: token,
          });
          refetch();
        } catch (error) {}
      }
    };
    if (data && data?.device_token === null) {
      getDeviceTokenAsync();
    }
  }, []);

  const { session } = useAuth();

  return (
    <>
      <Container topSafeAreaViewColor="#F5F5F5">
        <ScrollView className="bg-[#F5F5F5]">
          <TopBar openNotificationBottomSheet={open} />
          <Suspense fallback={<HomeScreenSkeleton />}>
            <LiveEventList />
            <View>
              {session?.authenticated ? (
                <LiveTechnicalSupportCard />
              ) : (
                <NoAuthLiveSupportCard />
              )}
            </View>
            {/**** Suggested courses section ****/}
            <View className="mt-[27px]">
              <View className="flex-row mx-layout justify-between items-center">
                <Text>دورات مقترحة</Text>
                <TouchableOpacity
                  onPress={() => router.push("/courses/")}
                  className="flex-row gap-[0.5px]"
                >
                  <Text className="text-[#FEC433]">جميع الدورات</Text>
                  <Feather name="arrow-left" size={24} color="#FEC433" />
                </TouchableOpacity>
              </View>
              <SuggestedCoursesList />
            </View>
            {/**** latest articles section ****/}
            <LatestArticlesList />
          </Suspense>
        </ScrollView>
      </Container>

      {session?.authenticated && (
        <NotificationBottomSheet
          bottomSheetRef={NotificationBottomSheetRef}
          close={close}
        />
      )}
      {/*session?.authenticated && (
        <NationalIdBottomSheet
          bottomSheetRef={NationalIdBottomSheetRef}
          closeNationalIdBottomSheet={closeNationalIdBottomSheet}
          openNationalIdBottomSheet={openNationalIdBottomSheet}
        />
      )*/}
    </>
  );
}
