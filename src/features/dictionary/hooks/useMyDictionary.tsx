import { useSuspenseQuery } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { dictionaryProps } from "../../../types/dictionary";
import useAuth from "../../../hooks/useAuth";

export const fetchMyDictionary = async () => {
  const { data } = await API.get(authRoutes.getMyDictionary);
  return data.data;
};

export default function useMyDictionary() {
  const { session } = useAuth();

  return useSuspenseQuery<dictionaryProps[]>({
    queryKey: ["myDictionary", session?.authenticated, session?.user?.token],
    queryFn: fetchMyDictionary,
    gcTime: 0,
  });
}
