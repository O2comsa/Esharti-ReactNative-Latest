import { View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { Text } from "./custom/Text";
import {
  MyAccountIcon,
  NotificationBillRedIcon,
  NotificationIcon,
  SearchIcon,
} from "./SvgIcons";
import useNotification from "../hooks/useNotification";
import useAuth from "../hooks/useAuth";
interface TopBarProps {
  openNotificationBottomSheet: () => void;
}

const TopBar = ({ openNotificationBottomSheet }: TopBarProps) => {
  const { session } = useAuth();
  const { data } = useNotification();
  const user = session?.user;
  return (
    <View className="flex-row justify-between items-center mt-[14px] mx-[22px]">
      <View className="flex-row items-center gap-[6px]">
        {user?.image ? (
          <Image
            source={{
              uri: user?.image,
            }}
            className="h-10 w-10 rounded-full"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <View className="bg-[#FEC432] w-[31px] h-[31px] rounded-full"></View>
        )}
        <Text className=" text-sm ">
          {user ? "اهلاً " + user.name : "يا اهلاً وسهلاً"}
        </Text>
      </View>
      <View className="flex-row gap-3 items-center">
        <TouchableOpacity onPress={() => router.push("/search")}>
          <SearchIcon width={22} height={22} />
        </TouchableOpacity>
        {user ? (
          <TouchableOpacity onPress={openNotificationBottomSheet}>
            {data && data.some((item) => item.read_at === null) ? (
              <NotificationBillRedIcon />
            ) : (
              <NotificationIcon
                stroke={"#404040"}
                strokeWidth={1.5}
                width={22}
                height={22}
              />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.push("/auth/")}>
            <MyAccountIcon stroke={"#040404"} strokeWidth={1.5} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TopBar;
