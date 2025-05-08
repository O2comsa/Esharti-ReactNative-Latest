import { View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useSearch from "../hooks/useSearch";
import { CourseCard } from "../../courses";
import { Text } from "../../../components/custom/Text";
import { ArticleCard } from "../../articles";
import { DictionaryCard, DictionarySkeleton } from "../../dictionary";
type Props = {
  query: string;
};

const SearchResults = ({ query }: Props) => {
  if (query.length === 0) return null;
  const debouncedQuery = useDebounce(query, 500);
  const { data, refetch, isFetching, isLoading, isRefetching, isError } =
    useSearch(debouncedQuery);
  useEffect(() => {
    refetch();
  }, [debouncedQuery]);

  const noSearchResults =
    !isRefetching &&
    data?.dictionaries.length === 0 &&
    data.articles.length === 0 &&
    data.courses.length === 0 &&
    data.lessons.length === 0 &&
    debouncedQuery !== "";

  if (isFetching) {
    <DictionarySkeleton />;
  }
  return (
    <ScrollView
      scrollEnabled={!isLoading}
      contentContainerStyle={{ paddingHorizontal: 19, paddingVertical: 20 }}
      className="space-y-[10px]"
    >
      {data?.courses.length !== 0 && !isLoading && (
        <View>
          <Text className="mb-[10px] text-[14px]">دورات</Text>
          {data?.courses.map((course) => (
            <CourseCard
              key={course.id}
              variant="medium"
              showSubscribeButton={false}
              {...course}
            />
          ))}
        </View>
      )}
      {data?.articles.length !== 0 && !isLoading && (
        <View>
          <Text className="mb-[10px] text-[14px]">موضوعات</Text>
          {data?.articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </View>
      )}
      {data?.dictionaries.length !== 0 && !isLoading && (
        <View>
          <Text className="mb-[10px] text-[14px]">ادلة ارشادية</Text>
          {data?.dictionaries.map((dictionary) => (
            <DictionaryCard
              showSubscribeButton={false}
              key={dictionary.id}
              {...dictionary}
            />
          ))}
        </View>
      )}
      {noSearchResults && (
        <Text className="text-center mt-4 text-[17px] text-gray-500">
          لا توجد نتائج بحث
        </Text>
      )}
      {isError && (
        <Text className="text-center mt-4 text-[17px] text-red-500">
          حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.
        </Text>
      )}
    </ScrollView>
  );
};

export default SearchResults;
