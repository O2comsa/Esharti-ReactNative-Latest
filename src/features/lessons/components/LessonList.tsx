import React from "react";
import LessonCard from "./LessonCard";
import useLessons from "../hooks/useLessons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";

const LessonList = ({
  courseId,
  subscribed,
}: {
  courseId: string;
  subscribed: boolean;
}) => {
  const { data: lessons } = useLessons(courseId);
  const inset = useSafeAreaInsets();
  return (
    <View
      shadowVariant="small"
      className="bg-white rounded-xl w-full "
      style={{ marginBottom: Math.max(inset.bottom, 100) }}
    >
      <View className="p-3">
        <Text className="mb-[20px] text-[16px]">قائمة الدروس</Text>
        {lessons?.map((lesson) => (
          <LessonCard
            key={lesson.id}
            subscribed={subscribed}
            {...lesson}
            course_id={courseId.toString()}
          />
        ))}
      </View>
    </View>
  );
};

export default LessonList;
