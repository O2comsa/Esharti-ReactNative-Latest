import { apiRoutes } from "../../../routes";
import { articleProps } from "../../../types/article";
import { API } from "../../../lib/client";
import { useQuery } from "@tanstack/react-query";

export const fetchLatestArticles = async () => {
  const { data } = await API.get(apiRoutes.getLatestArticles);
  return data.data;
};

export default function useLatestArticles() {
  return useQuery<articleProps[]>({
    queryKey: ["LatestArticles"],
    queryFn: fetchLatestArticles,
    refetchOnMount: false,
  });
}
