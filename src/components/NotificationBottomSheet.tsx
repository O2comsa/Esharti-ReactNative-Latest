import React, { Ref, useMemo } from "react";
import { View } from "react-native";
import NotificationIcon from "../assets/icons/NotificationIcon.svg";
import NotificationCard from "./NotificationCard";
import { BottomSheet, bottomSheetRef } from "../features/bottomSheet";
import useNotification from "../hooks/useNotification";
import { Text } from "./custom/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type bottomSheetModalProps = {
  bottomSheetRef: Ref<bottomSheetRef>;
  close: () => void;
};

const NotificationBottomSheet: React.FC<bottomSheetModalProps> = ({
  bottomSheetRef,
  close,
}) => {
  const { data } = useNotification();
  const { bottom } = useSafeAreaInsets();
  const notifications = useMemo(
    () => data?.filter((notification) => notification.read_at === null),
    [data]
  );
  return (
    <BottomSheet
      enableHeaderBottomBorder={false}
      bottomSheetRef={bottomSheetRef}
      headerTitle="الإشعارات"
      headerIcon={
        <NotificationIcon
          width={17}
          height={18}
          stroke={"#222222"}
          strokeWidth={2}
        />
      }
    >
      {!!notifications?.length ? (
        <View className="w-full ">
          {notifications.map((item) => (
            <NotificationCard
              closeNotificationBottomSheet={close}
              key={item.id}
              {...item}
            />
          ))}
        </View>
      ) : (
        <Text
          className="text-[#B3B3B3] text-[14px] mb-[35px] text-center"
          fontWeight="500"
        >
          ليس لديك اي اشعارات الان
        </Text>
      )}
    </BottomSheet>
  );
};

export default NotificationBottomSheet;
