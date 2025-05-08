import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { View } from "../../../../components/custom/View";
import { Text } from "../../../../components/custom/Text";
import { courseProps } from "../../../../types/course";
import CustomButton from "../CustomButton";
import Badge from "../Badge";
import { useSettingsList } from "../../../account";

type cousreCardProps = {
  showSubscribeButton?: boolean;
} & courseProps;

const MediumCourseCard = ({
  title,
  id,
  price,
  image,
  free,
  description,
  showSubscribeButton = true,
  subscribed,
  lessons_count,
}: cousreCardProps) => {
  const { data: settings } = useSettingsList();

  const reviewStatus = settings?.find((item) => item.key === "review_status");
  return (
    <View
      shadowVariant="small"
      className=" py-[14px] px-[16px] bg-white rounded-lg mb-[14px]"
    >
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/courses/[id]",
            params: { id: id.toString() },
          })
        }
      >
        <View className="flex-row  items-center space-x-[17px]">
          <View>
            <Image
              source={{ uri: image }}
              className="w-[54px] h-[54px] rounded-lg"
            />
          </View>
          <View className="flex-col gap-y-[10px] flex-shrink">
            <View className="flex-row items-center space-x-2">
              {reviewStatus?.value === "0" && (
                <View>
                  <Badge
                    variant="outline"
                    fontSize={10}
                    title={free ? "مجاناً" : price.toString() + " ريال"}
                  />
                </View>
              )}
              <View>
                <Badge
                  variant="outline"
                  fontSize={10}
                  title={lessons_count + " دروس"}
                />
              </View>
            </View>
            <Text numberOfLines={1} className="text-[18px] text-[#181818] ">
              {title}
            </Text>
          </View>
        </View>
        <Text
          numberOfLines={2}
          className="mt-[17px] mb-[22px] text-[13px] text-[#525252]"
          fontWeight="400"
        >
          {description}
        </Text>
        {showSubscribeButton && (
          <CustomButton
            size="medium"
            subscribed={subscribed}
            showLeftArrowIcon
            className=" bg-primary w-[96px] text-xl"
            onPress={() =>
              router.push({
                pathname: "/courses/[id]",
                params: { id: id.toString() },
              })
            }
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MediumCourseCard;
