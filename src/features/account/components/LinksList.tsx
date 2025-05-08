import React from "react";
import { View } from "../../../components/custom/View";
import InformationCircleIcon from "../../../assets/icons/InformationCricleIcon.svg";
import ChatAltIcon from "../../../assets/icons/ChatAltIcon.svg";
import ClipboardCheckIcon from "../../../assets/icons/ClipboardCheckIcon.svg";
import LockClosedIcon from "../../../assets/icons/lockClosedIcon.svg";
import CollectionIcon from "../../../assets/icons/CollectionIcon.svg";
import PrimaryColorShareIcon from "../../../assets/icons/PrimaryColorShareIcon.svg";
import LogoutRightIcon from "../../../assets/icons/LogoutRightIcon.svg";
import { Platform, Share } from "react-native";
import LinkCard from "./LinkCard";
import { router } from "expo-router";
import { BookmarkOutlineIcon } from "../../../components/SvgIcons";
import useSettingsList from "../hooks/useListSettingsKeys";
import useAuth from "../../../hooks/useAuth";

const LinksList = ({
  openContactUsBottomSheet,
}: {
  openContactUsBottomSheet: () => void;
}) => {
  const { signOut, session } = useAuth();
  const navigateTo = (path: string, title?: string) => {
    router.push(`/account/${path}?title=${title}`);
  };
  const { data } = useSettingsList();
  const aboutapp = data?.find((item) => item.key === "aboutapp");
  return (
    <View className="bg-white rounded-xl" shadowVariant="small">
      <LinkCard
        Icon={<ClipboardCheckIcon />}
        onPress={() => navigateTo("aboutapp", "عن تطبيق اشارتي")}
        title="عن تطبيق اشارتي"
      />
      <LinkCard
        Icon={<ChatAltIcon />}
        onPress={openContactUsBottomSheet}
        title="تواصل معنا"
      />

      <LinkCard
        Icon={<InformationCircleIcon />}
        onPress={() => navigateTo("Terms", "الشروط والأحكام")}
        title="الشروط والأحكام"
      />
      <LinkCard
        Icon={<LockClosedIcon />}
        onPress={() => navigateTo("privacy", "سياسة الخصوصية")}
        title="سياسة الخصوصية"
      />
      <LinkCard
        Icon={<CollectionIcon />}
        onPress={() => navigateTo("Enterprise_services", "خدمات تطبيق إشارتي")}
        title="خدمات تطبيق إشارتي"
      />
      <LinkCard
        Icon={<PrimaryColorShareIcon />}
        onPress={async () => {
          try {
            await Share.share({
              message:
                Platform.OS === "android"
                  ? aboutapp?.value.slice(0, 99) +
                    "\n" +
                    process.env.EXPO_PUBLIC_URL
                  : aboutapp?.value.slice(0, 99),
              url: process.env.EXPO_PUBLIC_URL as string,
            });
          } catch (error) {
            console.log(error);
          }
        }}
        title="شارك التطبيق الأن"
      />
      {session?.authenticated && (
        <>
          <LinkCard
            Icon={<BookmarkOutlineIcon stroke={"#EBA800"} strokeWidth={1.5} />}
            onPress={() => navigateTo("bookmarks")}
            title="العناصر المحفوظة"
          />
          <LinkCard
            Icon={<LogoutRightIcon />}
            onPress={signOut}
            TextColor="#EF4444"
            IconBgColor="#FFF3F3"
            ChevronLeftIconStroke="#EF4444"
            title="تسجيل الخروج"
          />
        </>
      )}
    </View>
  );
};

export default LinksList;
