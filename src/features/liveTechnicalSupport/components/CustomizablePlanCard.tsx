import { FC } from "react";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { MotiView } from "moti";
import { TextInput, KeyboardAvoidingView } from "react-native";

type PlanCardProps = {
  id: number;
  title: string;
  duration: string;
  description: string;
  isSelected: boolean;
  customizable: boolean;
  handleCustomPlanDuration: (text: string) => void;
};

const CustomizablePlanCard: FC<PlanCardProps> = ({
  title,
  description,
  duration,
  isSelected,
  customizable,
  handleCustomPlanDuration,
  id,
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
        <Text className="text-[20px] text-[#404040]">{duration}</Text>
        <Text className="text-[18px] text-[#525252] mt-5" fontWeight="400">
          {description}
        </Text>
        {isSelected && (
          <KeyboardAvoidingView className=" flex-row mt-[21px]  justify-between items-center">
            <Text fontWeight="500" className="text-[15px]">
              ادخل عدد الدقائق المطلوبة:
            </Text>
            <View className="flex-row items-center space-x-3 justify-between border w-[150px] border-[#D1D1D1] bg-[#F5F5F5] rounded-md py-2 px-3">
              <TextInput
                keyboardType="number-pad"
                onChangeText={handleCustomPlanDuration}
                className="text-right flex-shrink"
                placeholderTextColor={"#B3B3B3"}
                style={{ writingDirection: "rtl", direction: "rtl" }}
                placeholder="(كمثال) ٤٥"
              />
              <View>
                <Text className="text-primary" fontWeight="500">
                  دقيقة
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </View>
  );
};

export default CustomizablePlanCard;
