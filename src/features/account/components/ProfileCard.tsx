import { View } from "../../../components/custom/View";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "../../../components/custom/Text";
import SquarePencilIcon from "../../../assets/icons/SquarePencilIcon.svg";
import { FC } from "react";
import EditProfilePicture from "./EditProfilePicture";
import useProfile from "../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";

type ProfileCardProps = {
  openEditAccountBottomSheet: () => void;
};
const ProfileCard: FC<ProfileCardProps> = ({ openEditAccountBottomSheet }) => {
  const { data } = useProfile();
  console.log(data);
  const { session } = useAuth();
  const user = session?.user;

  return (
    <View
      className="rounded-xl relative bg-white h-[180px]"
      shadowVariant="small"
    >
      <TouchableOpacity
        onPress={openEditAccountBottomSheet}
        className=" absolute top-[17px] left-[16px] z-10 bg-[#F5F5F5] p-[6px] rounded-full"
      >
        <SquarePencilIcon />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center">
        <EditProfilePicture>
          {user?.image ? (
            <Image
              source={{
                uri: user.image,
              }}
              className="h-[61px] w-[61px] rounded-full"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <View className="bg-[#FEC432] w-[61px] h-[61px] rounded-full"></View>
          )}
        </EditProfilePicture>
        <View className="items-center mt-3">
          <Text className="text-[18px]">{user?.name}</Text>
          <Text className="text-[16px] text-[#525252]" fontWeight="400">
            {user?.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
