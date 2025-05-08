import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const fetchDictionaries = async (pageParam: number) => {
  const response = await API.get(apiRoutes.getDictionaryList(pageParam));
  const data = response.data.data;
  return {
    results: data,
    next: data.current_page === data.last_page ? undefined : pageParam + 1,
  };
};

export default function useDictionaries() {
  return useSuspenseInfiniteQuery({
    queryKey: ["Dictionaries"],
    queryFn: ({ pageParam = 1 }) => fetchDictionaries(pageParam),
    initialPageParam: 1,
    gcTime: 0,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
