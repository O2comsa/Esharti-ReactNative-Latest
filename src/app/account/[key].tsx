import { View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";
import Container from "../../components/Container";
import { useSettingsList } from "../../features/account";
import { Text } from "../../components/custom/Text";
import { ArrowLeftIcon } from "../../components/SvgIcons";

const Settings = () => {
  const { key, title }: { key: string; title: string } =
    useGlobalSearchParams();
  const { data } = useSettingsList();

  const currentKey = data?.find((item) => item.key === key);
  return (
    <Container showBottomTabs={false}>
      <View className="flex-row bg-white items-center justify-between px-[18px] py-[23px]">
        <View className="flex-row items-center gap-[10px]">
          <Text className="text-[20px]">{title}</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
        <View className="mx-[18px] my-[23px]">
          <Text
            className="mt-[8px] text-[16px] text-[#525252]"
            fontWeight="400"
          >
            {currentKey?.value}
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;
