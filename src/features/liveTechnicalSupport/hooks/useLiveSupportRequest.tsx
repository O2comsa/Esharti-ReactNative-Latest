import { useQuery } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { liveSupportRequestProps } from "../../../types/liveSupportRequest";

export const fetchLiveSupportRequest = async (id: number) => {
  const { data } = await API.get(authRoutes.showLiveSupport(id));
  return data.data;
};

export default function useLiveSupportRequest(id: number) {
  return useQuery<liveSupportRequestProps>({
    queryKey: ["LiveSupportRequest", id],
    queryFn: () => fetchLiveSupportRequest(id),
    refetchInterval: (data) =>
      data.state.data?.status === "waiting" ? 10000 : undefined,
    enabled: !!id,
  });
}
