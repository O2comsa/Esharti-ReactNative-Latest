import {
  View,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import { Text } from "../../../components/custom/Text";
import usePlans from "../hooks/usePlans";
import usePlanPayment from "../hooks/usePlanPayment";
import ErrorModal from "../../authentication/components/ErrorModal";
import { router, usePathname } from "expo-router";
import { planProps } from "../../../types/plan";
import { ArrowLeftIcon } from "../../../components/SvgIcons";
import { useSettingsList } from "../../account";
import useAuth from "../../../hooks/useAuth";

const PlanList = () => {
  const [selectedPlan, setSelectedPlan] = useState<planProps | null>(null);

  const { data } = usePlans();
  const { session } = useAuth();

  const {
    mutate: paymentHandler,
    isPending,
    error,
  } = usePlanPayment(Number(selectedPlan?.id));
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
  };
  useEffect(() => {
    if (error) {
      setIsErrorModalVisible(true);
    }
  }, [error]);

  const { data: settings } = useSettingsList();

  const path = usePathname();

  const appStatus = settings?.find((item) => item.key === "appStatus");

  const onPress = async () => {
    if (!session?.authenticated)
      return router.push({
        pathname: "/auth/",
        params: { navigatedFrom: path },
      });

    if (appStatus?.value === "0") return null;

    paymentHandler();
  };
  return (
    <View>
      <Text className="text-[#525252] text-[18px] px-[3px]">
        {settings?.find((data) => data.key === "plan-page-description")?.value}
      </Text>
      <ErrorModal
        error={"حدث خطاً ما يرجى المعاودة لاحقا"}
        visible={isErrorModalVisible}
        close={closeErrorModal}
      />
      <View className="mt-[34px] flex-1 space-y-3">
        {data?.map((plan) => (
          <Pressable onPress={() => setSelectedPlan(plan)} key={plan.id}>
            <PlanCard {...plan} isSelected={plan.id === selectedPlan?.id} />
          </Pressable>
        ))}
      </View>

      {selectedPlan !== null && (
        <TouchableOpacity
          disabled={isPending}
          onPress={onPress}
          className="bg-primary rounded-xl py-3 px-4 flex-row items-center mt-5 justify-between"
        >
          {!isPending && (
            <Text className=" text-[18px]">
              اشترك الأن {`(${selectedPlan?.price}) ريال`}
            </Text>
          )}
          {isPending && <ActivityIndicator size={"small"} color={"white"} />}
          <ArrowLeftIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlanList;
