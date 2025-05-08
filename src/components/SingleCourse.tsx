import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LessonList, useLessons } from "../features/lessons";
import {
  ArrowLeftIcon,
  WhiteAcademicCapIcon,
  WhiteArrowLeftIcon,
} from "./SvgIcons";
import { router, usePathname } from "expo-router";
import Bookmark from "./Bookmark";
import ShareButton from "./ShareButton";
import { useSettingsList } from "../features/account";
import { CourseCard, useSingleCourse } from "../features/courses";
import useCoursePayment from "../features/courses/hooks/useCoursePayment";
import useAuth from "../hooks/useAuth";
import PurchaseAgreementModal from "./PurchaseAgreementModal";
const SingleCourse = ({ courseId }: { courseId: string }) => {
  const { data: course, isLoading, refetch, error } = useSingleCourse(courseId);

  const [showAgreement, setShowAgreement] = React.useState(false);

  const { data: lessons, refetch: refetchLessons } = useLessons(courseId);

  const { data } = useSettingsList();

  const appStatus = data?.find((item) => item.key === "appStatus");
  const reviewStatus = data?.find((item) => item.key === "review_status");

  const path = usePathname();
  const { session } = useAuth();
  useEffect(() => {
    const allCompleted = lessons.every((lesson) => lesson.completed);
    if (allCompleted && course.completed === false) {
      refetch();
      refetchLessons();
    }
  }, [lessons]);

  const { mutate: paymentHandler, isPending } = useCoursePayment(
    Number(courseId)
  );

  const onPress = async () => {
    // if not authenticated navigate the user to login screen
    if (!session?.authenticated) {
      return router.push({
        pathname: "/auth/",
        params: { navigatedFrom: path },
      });
    }
    // if payment is disabled don't do anything
    if (appStatus?.value === "0") return null;

    setShowAgreement(true);
  };
  return (
    <View className="flex-1 justify-between">
      <View className="flex-row items-center justify-between  my-[23px] mx-[18px]">
        <View className="flex-row items-center gap-[10px]">
          <View>
            <Bookmark
              id={String(course?.id)}
              variant="course"
              bookmarked={course?.bookmarked}
            />
          </View>
          <View>
            <ShareButton
              description={course?.description}
              title={course?.title}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => router.replace("/courses/")}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEnabled={!isLoading}
        showsVerticalScrollIndicator={false}
        className="mx-[18px]"
      >
        <CourseCard variant="large" {...course} />

        {!isLoading && (
          <LessonList courseId={courseId} subscribed={course?.subscribed} />
        )}
      </ScrollView>

      {!course?.subscribed && appStatus?.value === "1" && (
        <TouchableOpacity
          disabled={isPending}
          onPress={onPress}
          className=" w-full "
        >
          <View className="mx-[18px]  bg-primary h-[59px] justify-center  px-4 rounded-xl">
            {isPending ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <View className="flex-row justify-between items-center ">
                <Text className="text-[18px]">اشترك الآن</Text>
                <ArrowLeftIcon />
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
      {course?.subscribed && (
        <TouchableOpacity
          disabled={!course.completed}
          onPress={() => router.push("/certificates")}
          className=""
        >
          <View
            style={{ backgroundColor: course?.completed ? "black" : "#B3B3B3" }}
            className="mx-[18px] flex-row justify-between bg-black h-[59px] items-center  px-4 rounded-xl"
          >
            <View className="flex-row items-center gap-3">
              <WhiteAcademicCapIcon />
              <Text className="text-[18px] text-[#F5F5F5]">
                احصل على شهادة إكمال الدورة
              </Text>
            </View>
            <WhiteArrowLeftIcon />
          </View>
        </TouchableOpacity>
      )}
      <PurchaseAgreementModal
        visible={showAgreement}
        close={() => setShowAgreement(false)}
        navigateToPurchase={() => {
          setShowAgreement(false);
          paymentHandler();
        }}
      />
    </View>
  );
};

export default SingleCourse;
