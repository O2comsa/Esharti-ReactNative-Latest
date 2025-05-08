import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon.svg";
import NewspaperIcon from "../../assets/icons/NewspaperIcon.svg";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

import Container from "../../components/Container";
import { ArticleList, ArticlesSkeleton } from "../../features/articles";
import { View } from "../../components/custom/View";
import { Text } from "../../components/custom/Text";
import { Suspense } from "react";
export default function Articles() {
  return (
    <Container
      showBottomTabs={false}
      topSafeAreaViewColor="white"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <View className="h-[91px] bg-white px-[22] py-[28px] flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[9px]">
          <NewspaperIcon />
          <Text className="text-[22px]">اخر الموضوعات</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <Suspense fallback={<ArticlesSkeleton />}>
        <ArticleList />
      </Suspense>
    </Container>
  );
}
