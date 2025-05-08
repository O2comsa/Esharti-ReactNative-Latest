import { apiRoutes } from "../../../routes";
import { articleProps } from "../../../types/article";
import { API } from "../../../lib/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const fetchArticleById = async (id: string) => {
  const { data } = await API.get(apiRoutes.getSingleArticle(id));
  return data.data;
};

export default function useSingleArticle(id: string) {
  return useSuspenseQuery<articleProps>({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id),
  });
}
