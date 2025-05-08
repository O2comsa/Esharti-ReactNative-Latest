import { TouchableOpacity, Share, Platform } from "react-native";
import React, { FC } from "react";
import { usePathname } from "expo-router";
import { ShareIcon } from "./SvgIcons";
type ShareButtonProps = {
  title: string;
  description: string;
  url?: string;
};

const ShareButton: FC<ShareButtonProps> = ({ description, title, url }) => {
  const path = usePathname();
  const Link = `${process.env.EXPO_PUBLIC_URL}share/${path.substring(1)}`;
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          await Share.share({
            message:
              Platform.OS === "android"
                ? title + "\n" + description + "\n" + Link
                : title + "\n" + description,
            url: url ? url : Link,
          });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <ShareIcon />
    </TouchableOpacity>
  );
};

export default ShareButton;
