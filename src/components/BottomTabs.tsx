import { Pressable, View } from "react-native";
import React from "react";
import HomeIcon from "../assets/icons/HomeIcon.svg";
import CoursesIcon from "../assets/icons/CoursesIcon.svg";
import DictionaryIcon from "../assets/icons/DictionaryIcon.svg";
import MyAccountIcon from "../assets/icons/MyAccountIcon.svg";
import { Text } from "./custom/Text";
import { Svg } from "react-native-svg";
import { router, usePathname } from "expo-router";

const Tabs = [
  {
    id: 1,
    name: "الرئيسية",
    Icon: HomeIcon,
    pathname: "/",
    isIndexPage: false,
  },
  {
    id: 2,
    name: "الدورات",
    Icon: CoursesIcon,
    pathname: "/courses",
    isIndexPage: true,
  },
  {
    id: 3,
    name: "القاموس",
    Icon: DictionaryIcon,
    pathname: "/dictionary",
    isIndexPage: true,
  },
  {
    id: 4,
    name: "حسابي",
    Icon: MyAccountIcon,
    pathname: "/account",
    isIndexPage: true,
  },
];
export type SvgProps = Svg["props"];

type BottomTab = {
  id: number;
  name: string;
  Icon: any;
  pathname: any;
  isIndexPage: boolean;
};

const BottomTab = ({ id, name, Icon, pathname, isIndexPage }: BottomTab) => {
  const currentPath = usePathname();

  const path = isIndexPage ? `${pathname}/` : pathname;

  return (
    <Pressable
      onPress={() => router.replace(path)}
      className="flex-col space-y-1 items-center"
    >
      <Icon
        width={24}
        height={22}
        stroke={currentPath === pathname ? "black" : "#D1D1D1"}
        strokeWidth={1.5}
      />
      <Text
        style={{ color: currentPath === pathname ? "black" : "#D1D1D1" }}
        className="text-[12px]"
      >
        {name}
      </Text>
    </Pressable>
  );
};

const BottomTabs = () => {
  return (
    <View
      className="h-[82px] px-[40px] flex-row justify-between items-center bg-white"
      style={{
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOffset: { width: 0, height: -9 },
        shadowRadius: 20,
        shadowOpacity: 1,
      }}
    >
      {Tabs.map((tab) => (
        <BottomTab key={tab.id} {...tab} />
      ))}
    </View>
  );
};

export default BottomTabs;
