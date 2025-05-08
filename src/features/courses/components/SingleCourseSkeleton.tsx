import { View, Text } from "react-native";
import React from "react";
import LargeCourseCardSkeleton from "./LargeCourseCardSkeleton";
import { LessonListSkeleton } from "../../lessons";

type Props = {};

const SingleCourseSkeleton = (props: Props) => {
  return (
    <View className=" mx-layout">
      <LargeCourseCardSkeleton />
      <View className="mt-[24px]">
        <LessonListSkeleton />
      </View>
    </View>
  );
};

export default SingleCourseSkeleton;
