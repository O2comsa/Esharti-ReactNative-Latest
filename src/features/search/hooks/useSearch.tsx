import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useQuery } from "@tanstack/react-query";
import { searchProps } from "../../../types/search";

export const fetchSearchResults = async (query: string) => {
  const { data } = await API.get(apiRoutes.search(query));
  return data.data;
};

export default function useSearch(query: string) {
  return useQuery<searchProps>({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
  });
}
