import { View, Text } from "react-native";
import React from "react";
import SkeletonPlaceholder from "./custom/SkeletonPlaceholder";
import { SuggestedCoursesSkeleton } from "../features/courses";
import { ArticlesSkeleton } from "../features/articles";

const HomeScreenSkeleton = () => {
  return (
    <View className="mt-[21px]">
      <View className="mx-layout ">
        <SkeletonPlaceholder
          borderRadius={16}
          height={178}
          backgroundColor="#EEEEEE"
        />
      </View>
      <View className="mt-3 mx-layout ">
        <SkeletonPlaceholder
          borderRadius={16}
          height={111}
          backgroundColor="#EEEEEE"
        />
      </View>
      <View className="mt-4">
        <SuggestedCoursesSkeleton />
      </View>
      <View>
        <ArticlesSkeleton />
      </View>
    </View>
  );
};

export default HomeScreenSkeleton;
