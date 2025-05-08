import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { TouchableOpacity } from "react-native";
import VideoCameraIcon from "../../../assets/icons/VideoCameraIcon.svg";
import { router } from "expo-router";
import { useSettingsList } from "../../account";

const NoAuthLiveSupportCard = ({}) => {
  const { data: settings } = useSettingsList();

  const reviewStatus = settings?.find((item) => item.key === "review_status");
  if (reviewStatus?.value !== "0") return null;
  return (
    <View
      shadowVariant="medium"
      className="py-6 px-[26px] h-[111px] justify-between mx-layout mt-[12px] bg-[#F5F5F5] rounded-2xl border border-[#D1D1D1]"
    >
      <View className="flex-row justify-between w-full">
        <View className="flex-row items-center space-x-[5px]">
          <VideoCameraIcon />
          <Text className="text-base">الدعم الفني المباشر</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/liveTechnicalSupport")}
          className="bg-[#040404] px-4 py-1 rounded-lg min-w-[80px]"
        >
          <Text fontWeight="500" className="text-[12px] text-white">
            اشترك الآن
          </Text>
        </TouchableOpacity>
      </View>
      <Text fontWeight="400" className="w-[205] text-[13px] text-neutral-700">
        هذه الخدمة تسمح لك بالاتصال الفوري والمباشر مع مترجمي لغة إشارة متخصصين
      </Text>
    </View>
  );
};

export default NoAuthLiveSupportCard;
