import { useCallback, useState } from "react";
import { View } from "../components/custom/View";
import Container from "../components/Container";
import { SearchHeader, SearchResults } from "../features/search";
export default function Search() {
  const [query, setQuery] = useState<string>("");

  const handleSearchQuery = useCallback(
    (text: string) => {
      setQuery(text);
    },
    [query]
  );

  return (
    <Container
      showBottomTabs={false}
      topSafeAreaViewColor="#FEC432"
      bottomSafeAreaViewColor="#F5F5F5"
    >
      <View className="flex-1 bg-[#F5F5F5]">
        <SearchHeader query={query} handleSearchQuery={handleSearchQuery} />
        <SearchResults query={query} />
      </View>
    </Container>
  );
}
