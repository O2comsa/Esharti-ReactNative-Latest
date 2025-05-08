import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { View } from "../components/custom/View";
import Container from "../components/Container";
import { AcademicCapIcon, ArrowLeftIcon } from "../components/SvgIcons";
import { Text } from "../components/custom/Text";
import { CertificateListSkeleton } from "../features/account";
import { Suspense } from "react";
import CertificateList from "../features/account/components/CertificateList";

export default function certificates() {
  return (
    <Container
      withAuth
      showBottomTabs={false}
      topSafeAreaViewColor="white"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <View className="h-[91px] bg-white px-[22] py-[28px] flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[9px]">
          <AcademicCapIcon
            height={29}
            width={29}
            strokeWidth={1.8}
            stroke={"#040404"}
          />
          <Text className="text-[22px]">شهاداتي</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <Suspense fallback={<CertificateListSkeleton />}>
        <CertificateList />
      </Suspense>
    </Container>
  );
}
