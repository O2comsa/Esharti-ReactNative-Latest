import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { articleProps } from "../../../types/article";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";

const ArticleCard: React.FC<articleProps> = ({
  title,
  id,
  image,
  description,
}) => {
  return (
    <View shadowVariant="small" className="bg-white mb-2 rounded-xl">
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/articles/[id]", params: { id } })
        }
        className="px-2 h-[97px] flex-row space-x-4 items-center "
      >
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          className="h-[83px] w-[83px] rounded-lg"
        />
        <View className="w-[208px]">
          <Text className="text-[14px] text-[#5E5E5E]">{title}</Text>
          <Text
            numberOfLines={2}
            fontWeight="500"
            className="text-[11px] text-[#8E9399]"
          >
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ArticleCard;
