import { TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArrowLeftIcon,
} from "./SvgIcons";
import Bookmark from "./Bookmark";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "./custom/View";
import { Text } from "./custom/Text";
import ShareButton from "./ShareButton";
import { useSingleCourse } from "../features/courses";
import {
  LessonVideoPlayer,
  useLessons,
  useSingleLesson,
} from "../features/lessons";

type Props = {};

const SingleLesson = (props: Props) => {
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [canGoNext, setCanGoNext] = useState<boolean>(false);
  const { id, course_id }: { course_id: string; id: string } =
    useLocalSearchParams();
  const { data: course } = useSingleCourse(course_id);
  const { data: lessons } = useLessons(course_id);
  const { data, isLoading } = useSingleLesson(id);

  useEffect(() => {
    if (!course.subscribed) {
      router.replace({ pathname: "/courses/[id]", params: { id: course_id } });
    }
  }, [course]);

  // get current lesson index in lesson array
  const currentLessonIndex = lessons?.findIndex(
    (lesson) => lesson.id === data?.id
  );
  useEffect(() => {
    if (lessons) {
      setCanGoBack(
        lessons?.length > 0 &&
          data !== undefined &&
          currentLessonIndex !== undefined &&
          currentLessonIndex > 0
      );
      setCanGoNext(
        lessons?.length > 0 &&
          data !== undefined &&
          currentLessonIndex !== undefined &&
          currentLessonIndex < lessons.length - 1
      );
    }
  }, [id, data, lessons, currentLessonIndex]);

  const nextLesson = useCallback(() => {
    // Check if the current lesson index is valid
    if (
      currentLessonIndex !== undefined &&
      currentLessonIndex !== -1 &&
      lessons &&
      currentLessonIndex < lessons.length - 1
    ) {
      // Get the next lesson
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = lessons[nextLessonIndex].id;

      // Navigate to the next lesson using expo router
      if (nextLesson) {
        router.setParams({ id: nextLesson.toString() });
      }
    }
  }, [lessons, data, router]);

  const prevLesson = useCallback(() => {
    // Check if the current lesson index is valid
    if (
      currentLessonIndex !== undefined &&
      currentLessonIndex !== -1 &&
      lessons &&
      currentLessonIndex > 0
    ) {
      // Get the previous lesson
      const prevLessonIndex = currentLessonIndex - 1;
      const prevLesson = lessons[prevLessonIndex].id;

      // Navigate to the previous lesson using router.push
      if (prevLesson) {
        router.setParams({ id: prevLesson.toString() }); // Adjust the pathname as needed
      }
    }
  }, [lessons, data, router]);
  return (
    <View>
      <View className="flex-row items-center justify-between  my-[23px] mx-[18px]">
        <View className="flex-row items-center gap-[10px]">
          <View>
            <Bookmark
              bookmarked={data?.bookmarked}
              id={data?.id.toString()}
              variant="lesson"
            />
          </View>
          <ShareButton title={data.title} description="" />
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <View
        shadowVariant="small"
        className="bg-white mx-layout rounded-xl pb-4"
      >
        {!isLoading && data && (
          <LessonVideoPlayer
            completed={data?.completed}
            lessonId={data.id.toString()}
            course_id={data?.course_id.toString()}
            video={data?.video!!}
            posterUri={data?.image}
          />
        )}
        <View className="mt-[19px] px-3">
          <Text className="text-[20px] text-[#040404]">{data?.title}</Text>
          <Text className="text-[#525252]" fontWeight="400">
            خلال هذه الدرس ستتعلم كيفية التعبير عن الحروف الهجائية باستخدام لغة
            الاشارة.
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mx-layout mt-4 space-x-3 ">
        {/**** Next lesson button ****/}
        <TouchableOpacity
          disabled={!canGoNext}
          onPress={nextLesson}
          className="flex-1 flex-shrink-0 flex-row items-center justify-between bg-black rounded-xl py-3 px-4"
        >
          <ArrowCircleRightIcon />
          <Text className="text-[18px] text-[#F5F5F5]">الدرس التالي</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!canGoBack}
          onPress={prevLesson}
          className="flex-1 flex-shrink-0 flex-row items-center justify-between bg-[#D1D1D1] rounded-xl py-3 px-4 "
        >
          {/**** prev lesson button ****/}
          <Text className="text-[18px] text-[#040404]">الدرس السابق</Text>
          <ArrowCircleLeftIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleLesson;
