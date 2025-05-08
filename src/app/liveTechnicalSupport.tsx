import VideoCameraIcon from "../assets/icons/VideoCameraIcon.svg";
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon.svg";
import { Text } from "../components/custom/Text";
import { View } from "../components/custom/View";
import Container from "../components/Container";
import { ScrollView, TouchableOpacity } from "react-native";
import PlanList from "../features/liveTechnicalSupport/components/PlanList";

import { router } from "expo-router";
import { Suspense } from "react";
import PlanListSkeleton from "../features/liveTechnicalSupport/components/PlanListSkeleton";

export default function liveTechnicalSupport() {
  return (
    <Container showBottomTabs={false} bottomSafeAreaViewColor="#F5F5F5">
      <View className="h-[91px] bg-white px-[22] py-[28px] flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-[9px]">
          <VideoCameraIcon
            height={29}
            width={29}
            strokeWidth={1.8}
            stroke={"#040404"}
          />
          <Text className="text-[22px]">خدمة الدعم الفني المباشر</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <View className="my-[29px] px-layout bg-[#F5F5F5] relative">
          <Suspense fallback={<PlanListSkeleton />}>
            <PlanList />
          </Suspense>
        </View>
      </ScrollView>
    </Container>
  );
}
