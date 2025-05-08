import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useSuspenseQuery } from "@tanstack/react-query";
import { liveEventProps } from "../../../types/liveEvent";

export const fetchLiveEventById = async (id: string) => {
  const { data } = await API.get(apiRoutes.showEventInfo(id));
  return data.data;
};

export default function useSingleLiveEvent(id: string) {
  return useSuspenseQuery<liveEventProps>({
    queryKey: ["liveEvent", String(id)],
    queryFn: () => fetchLiveEventById(id),
    gcTime: 0,
  });
}
