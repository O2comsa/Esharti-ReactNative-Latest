import { Image, View } from "react-native";
import React, { FC } from "react";
import { lessonProps } from "../../../types/lesson";
import { Text } from "../../../components/custom/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { PrimaryCheckIcon } from "../../../components/SvgIcons";

type lessonCardProps = {
  subscribed: boolean;
  bgColor?: string;
} & lessonProps;

const LessonCard: FC<lessonCardProps> = ({
  course_id,
  id,
  image,
  title,
  subscribed,
  completed,
  bgColor = "#F5F5F5",
}) => {
  return (
    <TouchableOpacity
      disabled={!subscribed}
      style={{ backgroundColor: completed ? "#FFFBEF" : bgColor }}
      onPress={() =>
        router.push({
          pathname: "/lessons/[id]",
          params: { id, course_id: course_id },
        })
      }
      className=" p-2 rounded-xl mb-2 flex-row items-center justify-between"
    >
      <View className=" flex-row items-center gap-x-4 ">
        <Image
          className="h-[50px] w-[50px] rounded-lg"
          source={{ uri: image }}
        />
        <Text
          fontWeight="500"
          className="text-[16px] flex-shrink max-w-[170px] text-[#040404]"
        >
          {title}
        </Text>
      </View>
      {completed && <PrimaryCheckIcon />}
    </TouchableOpacity>
  );
};

export default LessonCard;
