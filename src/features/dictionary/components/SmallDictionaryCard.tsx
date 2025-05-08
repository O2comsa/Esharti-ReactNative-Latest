import { router } from "expo-router";
import { FC } from "react";
import { dictionaryProps } from "../../../types/dictionary";
import { View } from "../../../components/custom/View";
import { Badge } from "../../courses";
import { Text } from "../../../components/custom/Text";
import { TouchableOpacity } from "react-native";
import { SmallArrowLeftIcon } from "../../../components/SvgIcons";

const SmallDictionaryCard: FC<dictionaryProps> = ({ title, id }) => {
  const onPress = () => {
    router.push({
      pathname: "/dictionary/[id]",
      params: {
        id,
      },
    });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        shadowVariant="small"
        className="h-[168px] w-[142px] flex justify-between items-start py-3 px-[10px] mr-2 bg-white  rounded-lg"
      >
        <View className="flex-row gap-1">
          <View>
            <Badge
              height={20}
              variant="outline"
              fontSize={10}
              title={"مشترك"}
            />
          </View>
        </View>
        <View>
          <Text numberOfLines={2} className="text-[16px] text-[#181818]">
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          className="flex-row items-center justify-center gap-x-1 bg-primary px-[12px] py-[6px] rounded-lg"
        >
          <Text className="text-[10px]">اقرأ الآن</Text>
          <SmallArrowLeftIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SmallDictionaryCard;
