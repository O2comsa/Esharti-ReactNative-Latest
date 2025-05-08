import { TouchableOpacity, View } from "react-native";
import { Text } from "./custom/Text";
import { FC } from "react";
import { notificationProps } from "../types/notification";
import { router } from "expo-router";
import { useMarkNotificationAsRead } from "../hooks/useNotification";

type NotificationCardProps = {
  closeNotificationBottomSheet: () => void;
} & notificationProps;

const NotificationCard: FC<NotificationCardProps> = ({
  data,
  id,
  closeNotificationBottomSheet,
}) => {
  const { body, related_id, related_type, title } = data;
  const { mutate: markNotificationAsRead } = useMarkNotificationAsRead(id);
  const onPress = async () => {
    try {
      markNotificationAsRead();
    } catch (error) {
      console.log(error);
    } finally {
      closeNotificationBottomSheet();
    }
    if (related_id === undefined || related_id === undefined) return;
    if (related_type === "course") {
      router.push({ pathname: "/courses/[id]", params: { id: related_id } });
    }
    if (related_type === "dictionary") {
      router.push({ pathname: "/dictionary/[id]", params: { id: related_id } });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full py-[15px] rounded-lg border items-center border-solid border-[#D1D1D1] bg-[#F5F5F5] mb-2"
    >
      <View className="items-center w-[215px]">
        <View className="flex-row items-center space-x-2">
          <Text className="text-[#303030]">{title}</Text>
        </View>
        <Text
          fontWeight="400"
          className="text-center text-[#B3B3B3] text-[12px]"
        >
          {body}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
