import { View } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";

type LessonCardProps = {
  id: number;
  title: string;
};

const LessonCard: FC<LessonCardProps> = ({ id, title }) => {
  return (
    <View className="p-[12px] rounded-lg border border-[#D1D1D1] ">
      <Text className="text-[16px]" fontWeight="500">
        {title}
      </Text>
    </View>
  );
};

export default LessonCard;
