import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { FC } from "react";
import { liveEventProps } from "../../../types/liveEvent";
import { useSettingsList } from "../../account";

const LiveEventCard: FC<liveEventProps> = ({
  description,
  name,
  purchased,
  id,
}) => {
  const { data: settings } = useSettingsList();

  const reviewStatus = settings?.find((item) => item.key === "review_status");

  return (
    <View
      shadowVariant="medium"
      className="bg-primary mt-[23px] mx-layout h-[178px] rounded-2xl overflow-hidden flex justify-between"
    >
      <View className="  px-[27px] pt-[25px] ">
        <View className="flex-row justify-between items-center">
          <Text className="text-[16px] max-w-[190px]">{name}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/live-event/[id]",
                params: { id },
              })
            }
            className="bg-black px-3 py-[6px] rounded-lg"
          >
            {reviewStatus?.value === "0" && (
              <Text
                className="text-center text-[14px] text-white"
                fontWeight="500"
              >
                {purchased ? "شاهد الآن" : "سجل الآن"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Text
          fontWeight="400"
          className=" mt-2 text-left text-[#040404] text-[13px]"
        >
          {description}
        </Text>
      </View>
      <View className="mx-layout">
        <Image
          resizeMode="contain"
          source={require("../../../assets/images/diverse-people-show-sign-language-signs.png")}
          className="w-[288px] h-[full]"
        />
      </View>
    </View>
  );
};

export default LiveEventCard;
