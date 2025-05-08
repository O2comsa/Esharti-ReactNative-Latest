import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Container from "../../components/Container";
import { View } from "../../components/custom/View";
import { ArrowLeftIcon, BookmarkOutlineIcon } from "../../components/SvgIcons";
import { Text } from "../../components/custom/Text";
import BoomarksScreen from "../../components/BoomarksScreen";
import { Suspense } from "react";
import BookmarkedSkeleton from "../../features/courses/components/BookmarkedSkeleton";
export default function bookmarks() {
  return (
    <Container
      withAuth
      showBottomTabs={false}
      topSafeAreaViewColor="white"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <View className="h-[91px] bg-white px-[22] py-[28px] flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-[9px]">
          <BookmarkOutlineIcon stroke={"#040404"} strokeWidth={1.8} />
          <Text className="text-[22px]">العناصر المحفوظة</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <Suspense fallback={<BookmarkedSkeleton />}>
        <BoomarksScreen />
      </Suspense>
    </Container>
  );
}
