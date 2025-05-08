import { TextInput } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon.svg";
import SearchIcon from "../../../assets/icons/SearchIcon.svg";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
type Props = {
  query: string;
  handleSearchQuery: (text: string) => void;
};

const SearchHeader = ({ query, handleSearchQuery }: Props) => {
  return (
    <View className="flex-col justify-between py-6 px-[19px] bg-[#FEC432] h-[162px]">
      <View className="flex-row items-center justify-between">
        <Text className="text-[20px] text-[#040404]">ابحث في تطبيق اشارتي</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon
            height={24}
            width={24}
            stroke={"#040404"}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
      <View
        shadowVariant="medium"
        className="bg-white h-[48px] relative flex-row space-x-3 items-center rounded-xl px-4 overflow-hidden"
      >
        <SearchIcon
          height={20}
          width={20}
          stroke={"#404040"}
          strokeWidth={1.5}
        />

        <TextInput
          autoFocus
          value={query}
          onChangeText={handleSearchQuery}
          style={{
            writingDirection: "rtl",
            fontSize: 16,
            fontFamily: "IBMPlexSansArabic400",
            textAlign: "right",
            width: "100%",
          }}
          placeholderTextColor={"#B3B3B3"}
          placeholder="ابحث عن موضوع، دورة، او دليل ارشادي..."
        />
      </View>
    </View>
  );
};

export default SearchHeader;
