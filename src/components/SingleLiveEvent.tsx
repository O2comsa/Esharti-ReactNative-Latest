import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  CashIcon,
  ShareIcon,
  TimeIcon,
} from "./SvgIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { View } from "./custom/View";
import { ActivityIndicator, ScrollView } from "react-native";
import { Badge } from "../features/courses";
import { Text } from "./custom/Text";
import { API } from "../lib/client";
import { authRoutes } from "../routes";
import Moment from "moment";
import ShareButton from "./ShareButton";
import { useSettingsList } from "../features/account";
import useSingleLiveEvent from "../features/liveEvent/hooks/useSingleLiveEvent";
import useLiveEventPayment from "../features/liveEvent/hooks/useLiveEventPayment";
import { InformationCard } from "../features/liveEvent";
import useAuth from "../hooks/useAuth";
import PurchaseAgreementModal from "./PurchaseAgreementModal";
import NoSeatsAvailableModal from "./NoSeatsAvailableModal";

const SingleLiveEvent = () => {
  const { id } = useLocalSearchParams();
  const { data } = useSingleLiveEvent(String(id));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSameOrAfter] = useState(
    Moment(Date.now()).isSameOrAfter(data.event_at)
  );
  const { session } = useAuth();
  const { mutate: paymentHandler, isPending } = useLiveEventPayment(Number(id));

  const [showAgreementModal, setShowAgreementModal] = useState<boolean>(false);
  const [showNoSeatsModal, setShowNoSeatsModal] = useState<boolean>(false);

  const path = usePathname();
  const { data: settings } = useSettingsList();

  const appStatus = settings?.find((item) => item.key === "appStatus");
  const reviewStatus = settings?.find((item) => item.key === "review_status");

  const onPress = async () => {
    if (!session?.authenticated)
      return router.push({
        pathname: "/auth/",
        params: { navigatedFrom: path },
      });

    if (data.purchased && data?.meeting_info) {
      router.push({
        pathname: "/zoom",
        params: {
          meetingId: data.meeting_info.meeting_id,
          meetingPassword: data.meeting_info.encrypted_password,
        },
      });
    }

    if (appStatus?.value === "0") return null;

    if(!data?.is_seat_available) {
      setShowNoSeatsModal(true);
      return;
    }

    if (!data.purchased) setShowAgreementModal(true);
  };

  const handleAgreementAcceptance = async () => {
    setShowAgreementModal(false);

    if (data?.is_paid && data?.purchased === false) {
      paymentHandler();
    }

    if (data?.is_paid === false && data?.purchased === false) {
      setIsLoading(true);
      try {
        await API.post(authRoutes.buyLiveEvent, { liveEvent_id: data?.id });
      } catch (error: any) {
        console.log("Error here", error);
      } finally {
        setIsLoading(false);
        if (!showNoSeatsModal) {
          router.replace({
            pathname: "/paymentSuccess",
            params: {
              navigateTo: `/live-event/${id}`,
              paymentType: "freeLiveEvent",
            },
          });
        }
      }
    }
  };

  const isDisabled = () => {
    if (!data.purchased) return false;
    if (isSameOrAfter && data.meeting_info) {
      return false;
    }
    if (data.meeting_info && !isSameOrAfter) return true;
    if (!data.meeting_info && !isSameOrAfter) return true;
  };

  return (
    <>
      <View className="flex-row items-center justify-between mx-[18px] my-[23px]">
        <View>
          <ShareButton description={data.description} title={data.name} />
        </View>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-[#F5F5F5]">
        <View shadowVariant="small" className="bg-white mx-layout rounded-xl">
          {data?.image ? (
            <Image
              source={{ uri: data?.image }}
              className="h-[194px] w-full rounded-t-xl mb-[15px]"
            />
          ) : (
            <Image
              source={require("../assets/images/LiveEventImage.png")}
              className="h-[194px] w-full rounded-t-xl mb-[15px]"
            />
          )}
          <View className="mx-[12px]">
            <View className="flex-row items-center space-x-[6px] mb-5">
              <View>
                {reviewStatus?.value === "0" && data?.purchased ? (
                  <Badge
                    variant="withIcon"
                    backgroundColor="#E7FFF9"
                    textColor="#25B896"
                    Icon={BadgeCheckIcon}
                    title={"انت مشترك في هذه الدورة"}
                  />
                ) : (
                  <Badge
                    variant="withIcon"
                    Icon={CashIcon}
                    title={data.price ? String(data.price) + " ريال" : "مجاناً"}
                  />
                )}
              </View>
              <View>
                <Badge
                  variant="withIcon"
                  Icon={TimeIcon}
                  title={data?.duration_event}
                />
              </View>
            </View>
            <InformationCard
              presenter={data?.event_presenter}
              date={data?.event_at}
            />
            <View className="mt-5">
              <Text className="text-[20px]">{data?.name}</Text>
              <Text className="text-[#525252]" fontWeight="400">
                {data?.description}
              </Text>
            </View>
            {reviewStatus?.value === "0" && (
              <View className="mt-[32px] mb-[12px]">
                <TouchableOpacity
                  disabled={isDisabled()}
                  onPress={onPress}
                  className={`bg-primary flex-row justify-between items-center rounded-xl py-3 px-4`}
                >
                  {isLoading && (
                    <ActivityIndicator size="small" color={"white"} />
                  )}
                  {isPending && (
                    <ActivityIndicator size="small" color={"white"} />
                  )}
                  {!isLoading && !isPending && (
                    <Text className="text-[16px]" fontWeight="500">
                      {data?.purchased ? "شاهد الآن" : "سجل الآن"}
                    </Text>
                  )}
                  {!isLoading && !isPending && <ArrowLeftIcon />}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <PurchaseAgreementModal
        visible={showAgreementModal}
        close={() => setShowAgreementModal(false)}
        navigateToPurchase={handleAgreementAcceptance}
      />
      <NoSeatsAvailableModal
        visible={showNoSeatsModal}
        onClose={() => setShowNoSeatsModal(false)}
      />
    </>
  );
};

export default SingleLiveEvent;
