import { FC, useEffect, useState } from "react";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import VideoCameraIcon from "../../../assets/icons/VideoCameraIcon.svg";
import { router } from "expo-router";
import { QuestionMarkCircleIcon } from "../../../components/SvgIcons";
import useLiveSupportStatus from "../hooks/useLiveSupportStatus";
import useCreateLiveSupportRequest from "../hooks/useCreateLiveSupportRequest";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";
import { liveSupportRequestProps } from "../../../types/liveSupportRequest";
import useProfile from "../../account/hooks/useProfile";
import useMyPlans from "../hooks/useMyPlan";
import SuccessModal from "../../authentication/components/SuccessModal";
import { useSettingsList } from "../../account";

const LiveTechnicalSupportCard = ({}) => {
  const { data: settings } = useSettingsList();

  const reviewStatus = settings?.find((item) => item.key === "review_status");
  if (reviewStatus?.value !== "0") return null;

  const { data: liveSupport, refetch } = useLiveSupportStatus();

  const { data: profile } = useProfile();
  const { data: myPlans } = useMyPlans();
  const [liveSupportRequestStatus, setLiveSupportRequestStatus] =
    useState<liveSupportRequestProps | null>(null);

  const {
    mutate: createLiveSupportRequest,
    data: liveTechnicalSupportRequest,
  } = useCreateLiveSupportRequest();

  useEffect(() => {
    if (liveTechnicalSupportRequest) {
      setLiveSupportRequestStatus(liveTechnicalSupportRequest);
    }
  }, [liveTechnicalSupportRequest]);

  useEffect(() => {
    if (!liveTechnicalSupportRequest?.id) return;
    const pollingInterval = setInterval(async () => {
      try {
        const {
          data: { data },
        } = await API.get(
          authRoutes.showLiveSupport(liveTechnicalSupportRequest?.id!!)
        );
        // If the status is accepted clear the interval
        if (data.status === "is-pending") {
          clearInterval(pollingInterval);
          return setLiveSupportRequestStatus(data);
        }
        if (data.status === "canceled") {
          clearInterval(pollingInterval);
          return setLiveSupportRequestStatus(null);
        }
        setLiveSupportRequestStatus(data);
      } catch (error) {
        console.error("Error polling live support request:", error);
      }
    }, 5000); // 5 seconds
    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(pollingInterval);
  }, [liveTechnicalSupportRequest?.id]);

  const subscribed = myPlans[0]?.purchased;
  const onPress = () => {
    if (!subscribed) {
      router.push("/liveTechnicalSupport");
    }
    if (liveSupport?.currentRequest && liveSupportRequestStatus === null) {
      if (liveSupport.currentRequest[0]?.user_id === profile?.id) {
        return setLiveSupportRequestStatus(liveSupport.currentRequest[0]);
      }
    }

    if (subscribed && liveSupportRequestStatus === null) {
      createLiveSupportRequest();
    }

    if (liveSupportRequestStatus?.status === "in-progress") {
      const { meeting_info } = liveSupportRequestStatus;
      if (meeting_info) {
        router.push({
          pathname: "/zoom",
          params: {
            meetingId: meeting_info.meeting_id,
            meetingPassword: meeting_info.encrypted_password,
          },
        });
      } else {
        refetch();
      }
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };
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
          disabled={subscribed ? liveSupport?.status === false : undefined}
          onPress={onPress}
          className="bg-[#040404] px-4 py-1 rounded-lg min-w-[80px]"
        >
          {liveSupportRequestStatus === null && (
            <Text fontWeight="500" className="text-[12px] text-white">
              {subscribed ? "اتصل بمترجم فوري" : " اشترك الآن"}
            </Text>
          )}
          {liveSupportRequestStatus?.status === "waiting" && (
            <ActivityIndicator size={"small"} color={"white"} />
          )}
          {liveSupportRequestStatus?.status === "in-progress" && (
            <Text fontWeight="500" className="text-[12px] text-white">
              ادخل الاجتماع الآن
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {!subscribed && (
        <Text fontWeight="400" className="w-[205] text-[13px] text-neutral-700">
          هذه الخدمة تسمح لك بالاتصال الفوري والمباشر مع مترجمي لغة إشارة
          متخصصين
        </Text>
      )}
      {subscribed && (
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-[#525252] text-[10px]" fontWeight="500">
              متبقي لديك {myPlans[0].credit} دقائق
            </Text>
          </View>
          <View className="flex-row items-center gap-x-1">
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              className="h-[20px] bg-[#FFFBEF] rounded-[20px] pr-2 pl-[5px] flex-row items-center gap-x-1"
            >
              <QuestionMarkCircleIcon />
              <Text className="text-[10px] text-primary" fontWeight="500">
                الدعم الفني
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <SuccessModal
        textCenter={false}
        message={
          settings?.find((item) => item.key === "plan-page-description")
            ?.value || ""
        }
        visible={isModalVisible}
        close={closeModal}
        showSuccessIcon={false}
      />
    </View>
  );
};

export default LiveTechnicalSupportCard;
