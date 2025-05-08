import { View } from "../../../components/custom/View";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Text } from "../../../components/custom/Text";
import { dictionaryProps } from "../../../types/dictionary";
import { SmallArrowLeftIcon } from "../../../components/SvgIcons";
import { router, usePathname } from "expo-router";
import useDictionaryPayment from "../hooks/useDictionaryPayment";
import { authRoutes } from "../../../routes";
import { useState } from "react";
import { API } from "../../../lib/client";
import { useSettingsList } from "../../account";
import useAuth from "../../../hooks/useAuth";
const Badge = ({ title }: { title: string }) => {
  return (
    <View className="flex-row items-center h-[20px] px-2 space-x-1 rounded-[20px] border border-neutral-300">
      <Text fontWeight="500" className="text-[10px] text-neutral-700">
        {title}
      </Text>
    </View>
  );
};

type dictionaryCardProps = {
  showSubscribeButton?: boolean;
} & dictionaryProps;

const DictionaryCard = ({
  id,
  title,
  image,
  description,
  showSubscribeButton = true,
  is_paid,
  price,
  purchased,
}: dictionaryCardProps) => {
  const { mutate: paymentHandler, isPending } = useDictionaryPayment(
    Number(id)
  );

  const { session } = useAuth();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data } = useSettingsList();

  const appStatus = data?.find((item) => item.key === "appStatus");

  const reviewStatus = data?.find((item) => item.key === "review_status");

  const onPress = async () => {
    if (!session?.authenticated)
      return router.push({
        pathname: "/auth/",
        params: { navigatedFrom: path },
      });

    if (reviewStatus?.value === "1") {
      return router.push({
        pathname: "/dictionary/[id]",
        params: {
          id,
        },
      });
    }

    // if payment is disabled don't do anything
    if (appStatus?.value === "0") return;

    if (is_paid === 1 && purchased === false) {
      paymentHandler();
    }
    if (is_paid === 0 && purchased === false) {
      setIsLoading(true);
      try {
        await API.post(authRoutes.buyDictionary, { dictionary_id: id });
      } finally {
        setIsLoading(false);
        return router.replace({
          pathname: "/paymentSuccess",
          params: {
            navigateTo: "/dictionary/",
            paymentType: "freeDictionaries",
          },
        });
      }
    }

    if (purchased === true) {
      router.push({
        pathname: "/dictionary/[id]",
        params: {
          id,
        },
      });
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        shadowVariant="small"
        className=" py-[14px] px-[16px] bg-white rounded-lg mb-[14px]"
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
                  <Badge title={price ? price + " ريال" : "مجاناً"} />
                </View>
              )}
              {/* {<View>
                <Badge title={"40 دقيقة"} />
              </View>} */}
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

        {showSubscribeButton && reviewStatus?.value === "1" && (
          <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-center px-[12px] py-[6px] bg-primary rounded-lg w-[96px]"
          >
            <Text className="text-[10px]">اقرأ الآن</Text>
          </TouchableOpacity>
        )}

        {showSubscribeButton && reviewStatus?.value === "0" && (
          <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-center px-[12px] py-[6px] bg-primary rounded-lg w-[96px]"
          >
            {isLoading && <ActivityIndicator size="small" color={"white"} />}
            {isPending && <ActivityIndicator size="small" color={"white"} />}
            {!isLoading && !isPending && (
              <Text className="text-[10px]">
                {purchased ? "اقرأ الآن" : "شراء الآن"}
              </Text>
            )}
            {!isLoading && !isPending && <SmallArrowLeftIcon />}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DictionaryCard;
