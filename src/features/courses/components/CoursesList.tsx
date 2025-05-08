import CourseCard from "./CourseCard";
import useCourses from "../hooks/useCourses";
import { View } from "react-native";
import { Text } from "../../../components/custom/Text";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const CoursesList = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useCourses();
  const courses = useMemo(
    () => data.pages.flatMap((page) => page.results.data),
    [data]
  );

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <View className="min-h-[2px] bg-[#F5F5F5]">
      <FlashList
        data={courses}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 19, paddingTop: 12 }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TouchableOpacity onPress={loadNext}>
            <Text className="mb-[12px] mt-[10px] text-[14px]">
              دورات مقترحة
            </Text>
          </TouchableOpacity>
        }
        renderItem={({ item, index }) => (
          <CourseCard {...item} index={index} variant="medium" />
        )}
        estimatedItemSize={Number(data.pages.length) * 10}
        onEndReached={loadNext}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default CoursesList;
