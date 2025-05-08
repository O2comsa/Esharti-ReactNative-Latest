import { FlashList } from "@shopify/flash-list";
import useArticles from "../hooks/useArticles";
import ArticleCard from "./ArticleCard";
const DictionaryList = () => {
  const { data, hasNextPage, fetchNextPage, refetch } = useArticles();

  const articles = data.pages.flatMap((page) => page.results.data);

  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <FlashList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 21, paddingTop: 28 }}
        keyExtractor={(item) => item.id}
        data={articles}
        renderItem={({ item }) => <ArticleCard {...item} />}
        onEndReached={loadNext}
        estimatedItemSize={10}
        onEndReachedThreshold={0.2}
      />
    </>
  );
};

export default DictionaryList;
