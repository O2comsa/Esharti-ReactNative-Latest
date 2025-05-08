import { router } from "expo-router";
import { View } from "../../../../components/custom/View";
import { Text } from "../../../../components/custom/Text";
import { courseProps } from "../../../../types/course";
import { FC } from "react";
import CustomButton from "../CustomButton";
import Badge from "../Badge";
import { TouchableOpacity } from "react-native";
import { useSettingsList } from "../../../account";

const SmallCourseCard: FC<courseProps> = ({
  title,
  duration,
  price,
  free,
  id,
  subscribed,
}) => {
  const onPress = () => {
    router.push({
      pathname: "/courses/[id]",
      params: { id: id.toString() },
    });
  };
  const { data: settings } = useSettingsList();

  const reviewStatus = settings?.find((item) => item.key === "review_status");
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        shadowVariant="small"
        className="h-[168px] w-[142px] flex justify-between items-start py-3 px-[10px] mr-2 bg-white  rounded-lg"
      >
        <View className="flex-row gap-1">
          {reviewStatus?.value === "0" && (
            <View>
              <Badge
                height={20}
                variant="outline"
                fontSize={10}
                title={free ? "مجاناً" : price + " ريال"}
              />
            </View>
          )}
        </View>
        <View>
          <Text numberOfLines={2} className="text-[16px] text-[#181818]">
            {title}
          </Text>
        </View>
        <CustomButton
          size="medium"
          subscribed={subscribed}
          showLeftArrowIcon={subscribed ? true : false}
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SmallCourseCard;
