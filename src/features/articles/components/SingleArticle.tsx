import React from "react";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import { ScrollView, TouchableOpacity } from "react-native";
import Bookmark from "../../../components/Bookmark";
import { ArrowLeftIcon } from "../../../components/SvgIcons";
import { router, useGlobalSearchParams } from "expo-router";
import { Image } from "expo-image";
import useSingleArticle from "../hooks/useSingleArticle";
import ShareButton from "../../../components/ShareButton";

const SingleArticle = () => {
  const { id }: { id: string } = useGlobalSearchParams();

  const { data } = useSingleArticle(id);
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View className="flex-row items-center justify-between mx-[18px] my-[23px]">
        <View className="flex-row items-center gap-[10px]">
          <View>
            <Bookmark
              variant="article"
              id={String(data.id)}
              bookmarked={data?.bookmarked}
            />
          </View>
          <View>
            <ShareButton description={data?.description} title={data?.title} />
          </View>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      </View>
      <View>
        <View className="mx-3">
          <Image
            source={{ uri: data?.image }}
            contentFit="cover"
            className="h-[243px] w-full rounded-xl"
          />
        </View>
        <View className="mt-[18px] mx-[18px]">
          <Text className="text-[24px] text-[#040404]">{data?.title}</Text>
          <Text
            className="mt-[8px] text-[16px] text-[#525252]"
            fontWeight="400"
          >
            {data?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleArticle;
