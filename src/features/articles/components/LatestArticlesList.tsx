import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import ArticleCard from "./ArticleCard";
import { Text } from "../../../components/custom/Text";
import useLatestArticles from "../hooks/useLatestArticles";

const LatestArticlesList = ({
  showHeader = true,
}: {
  showHeader?: boolean;
}) => {
  const { data: articles } = useLatestArticles();
  return (
    <View>
      {showHeader && (
        <View className="flex-row justify-between bg-[#F5F5F5] items-center mb-2  mx-layout">
          <Text>اخر الموضوعات</Text>
          <TouchableOpacity
            onPress={() => router.push("/articles/")}
            className="flex-row gap-[0.5px]"
          >
            <Text className="text-[#FEC433]">جميع الموضوعات</Text>
            <Feather name="arrow-left" size={24} color="#FEC433" />
          </TouchableOpacity>
        </View>
      )}
      <View className="mx-layout">
        {articles?.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </View>
    </View>
  );
};

export default LatestArticlesList;
