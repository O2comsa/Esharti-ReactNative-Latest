import { Image } from "expo-image";
import { View } from "../../../../components/custom/View";
import { Text } from "../../../../components/custom/Text";
import { courseProps } from "../../../../types/course";
import BadgeCheckIcon from "../../../../assets/icons/BadgeCheckIcon.svg";
import CashIcon from "../../../../assets/icons/CashIcon.svg";
import Badge from "../Badge";

type LargeCourseCardProps = {} & courseProps;

const LargeCourseCard = ({
  image,
  title,
  description,
  price,
  free,
  subscribed,
}: LargeCourseCardProps) => {
  return (
    <View shadowVariant="small" className="bg-white rounded-xl mb-6">
      <Image
        source={{ uri: image }}
        className="h-[194px] w-full rounded-t-xl"
      />
      <View className="pt-[15px] px-3">
        <Text className="text-[20px]">{title}</Text>
        <Text fontWeight="400" className="text-[#525252] mt-2">
          {description}
        </Text>
        <View className="flex-row items-center gap-2 mt-[20px] mb-[35px]">
          {!subscribed && (
            <View>
              <Badge
                variant="withIcon"
                Icon={CashIcon}
                title={`${price} ريال`}
              />
            </View>
          )}
          {subscribed && (
            <View>
              <Badge
                variant="withIcon"
                backgroundColor="#E7FFF9"
                textColor="#25B896"
                Icon={BadgeCheckIcon}
                title={"انت مشترك في هذه الدورة"}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LargeCourseCard;
