import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { courseProps } from "../../../types/course";
import { FC } from "react";

const Badge = ({ title }: { title: string }) => {
  return (
    <View className=" py-[2px] px-[10px] rounded-[20px] border border-[#D1D1D1]">
      <Text fontWeight="500" className="text-[10px] text-[#595959]">
        {title}
      </Text>
    </View>
  );
};

const SuggestedCourseCard: FC<courseProps> = ({
  title,
  duration,
  price,
  free,
  id,
}) => {
  return (
    <View
      shadowVariant="small"
      className="h-[168px] w-[142px] flex justify-between items-start py-3 px-[10px] mr-2 bg-white  rounded-lg"
    >
      <View className="flex-row gap-1">
        <View>
          <Badge title={free ? "مجاناً" : price + " ريال"} />
        </View>
        <View>
          <Badge title={duration} />
        </View>
      </View>
      <View>
        <Text numberOfLines={2} className="text-[16px] text-[#181818]">
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/courses/[id]", params: { id } })
        }
        className="bg-[#F5F5F5] rounded-lg px-[12px] py-[6px]"
      >
        <Text fontWeight="500" className="text-[#040404] text-[10px]">
          اشترك الأن
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuggestedCourseCard;
