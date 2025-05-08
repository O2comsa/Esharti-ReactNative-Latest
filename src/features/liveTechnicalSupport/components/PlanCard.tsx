import { FC } from "react";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { MotiView } from "moti";
import { planProps } from "../../../types/plan";

type PlanCardProps = {
  isSelected: boolean;
} & planProps;

const PlanCard: FC<PlanCardProps> = ({
  title,
  description,
  isSelected,
  credit,
}) => {
  return (
    <View
      shadowVariant="medium"
      className={`bg-white rounded-xl  relative 
    `}
    >
      {isSelected && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 500, type: "spring" }}
          className=" absolute top-0 right-0 bottom-0 border-2 rounded-xl h-full w-full border-primary"
        />
      )}
      <View className="p-4">
        <Text className="text-primary">{title}</Text>
        <Text className="text-[20px] text-[#404040]">{credit} دقيقة</Text>
        <Text className="text-[18px] text-[#525252] mt-5" fontWeight="400">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default PlanCard;
