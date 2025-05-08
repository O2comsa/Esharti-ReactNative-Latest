import { View, TouchableOpacity } from "react-native";
import React, { FC, ReactNode } from "react";
import { Text } from "../../../components/custom/Text";
import ChevronLeftIcon from "../../../assets/icons/ChevronLeftIcon.svg";
type LinkCardProps = {
  title: string;
  Icon: ReactNode;
  TextColor?: string;
  ChevronLeftIconStroke?: string;
  IconBgColor?: string;
  onPress: () => void;
};

const LinkCard: FC<LinkCardProps> = ({
  title,
  Icon,
  onPress,
  ChevronLeftIconStroke = "#404040",
  TextColor = "#000",
  IconBgColor = "#FFFBEF",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-3 flex-row justify-between items-center border-b border-[#F5F5F5]"
    >
      <View className="flex-row items-center space-x-3">
        <View
          style={{ backgroundColor: IconBgColor }}
          className=" p-[11px] rounded-[46px]"
        >
          {Icon}
        </View>
        <Text
          style={{ color: TextColor }}
          className="text-[16px]"
          fontWeight="500"
        >
          {title}
        </Text>
      </View>
      <ChevronLeftIcon stroke={ChevronLeftIconStroke} />
    </TouchableOpacity>
  );
};

export default LinkCard;
