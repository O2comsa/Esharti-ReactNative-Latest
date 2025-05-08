import DictionaryCard from "./DictionaryCard";
import useDictionaries from "../hooks/useDictionaries";
import { FlashList } from "@shopify/flash-list";
import { Text } from "../../../components/custom/Text";
import { View } from "../../../components/custom/View";
import { useMemo } from "react";
const DictionaryList = ({}) => {
  const { data, hasNextPage, fetchNextPage } = useDictionaries();

  const dictionaries = useMemo(
    () => data.pages.flatMap((page) => page.results.data),
    [data]
  );

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <View className="min-h-[2px] bg-[#F5F5F5]">
      <FlashList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 19, paddingTop: 12 }}
        keyExtractor={(item) => item.id}
        data={dictionaries}
        ListHeaderComponent={
          <Text className="mb-[12px] mt-[10px] text-[14px]">
            القواميس المقترحة
          </Text>
        }
        renderItem={({ item }) => <DictionaryCard {...item} />}
        onEndReached={loadNext}
        estimatedItemSize={10}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default DictionaryList;
