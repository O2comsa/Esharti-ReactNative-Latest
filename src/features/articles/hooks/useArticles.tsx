import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const fetchArticles = async (pageParam: number) => {
  const response = await API.get(apiRoutes.getArticles(pageParam));
  const data = response.data.data;
  return {
    results: data,
    next: data.current_page === data.last_page ? undefined : pageParam + 1,
  };
};

export default function useArticles() {
  return useSuspenseInfiniteQuery({
    queryKey: ["articles"],
    queryFn: ({ pageParam = 1 }) => fetchArticles(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
