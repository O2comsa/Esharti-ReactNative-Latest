import { Linking, View } from "react-native";
import {
  YoutubeIcon,
  IndeedIcon,
  SnapchatIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
} from "../../../components/SvgIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import useSettingsList from "../hooks/useListSettingsKeys";

const SocialLinks = () => {
  const socialMediaPlatforms = [
    { key: "youtube", icon: <YoutubeIcon /> },
    { key: "twitter", icon: <XIcon /> },
    { key: "x", icon: <XIcon /> },
    { key: "snapchat", icon: <SnapchatIcon /> },
    { key: "facebook", icon: <FacebookIcon /> },
    { key: "indeed", icon: <IndeedIcon /> },
    { key: "instagram", icon: <InstagramIcon /> },
  ];

  const { data } = useSettingsList();

  const socialMediaAccounts = data?.filter(
    (item) =>
      socialMediaPlatforms.some((platform) => platform.key === item.key) &&
      item.value !== null
  );

  return (
    <View className="flex-row items-center justify-center mt-[41px] mb-[21px] space-x-[38px]">
      {socialMediaAccounts?.map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => Linking.openURL(item.value)}
        >
          {
            socialMediaPlatforms.find((platform) => platform.key === item.key)
              ?.icon
          }
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SocialLinks;
