import { apiRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { useQuery } from "@tanstack/react-query";
import { dictionaryProps } from "../../../types/dictionary";

export const fetchDictionaryById = async (id: string) => {
  const { data } = await API.get(apiRoutes.getSingleDictionary(id));
  return data.data;
};

export default function useSingleDictionary(id: string) {
  return useQuery<dictionaryProps>({
    queryKey: ["dictionary", id],
    queryFn: () => fetchDictionaryById(id),
    gcTime: 0,
  });
}
