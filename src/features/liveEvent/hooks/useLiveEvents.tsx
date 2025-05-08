import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useSuspenseQuery } from "@tanstack/react-query";
import { liveEventProps } from "../../../types/liveEvent";

export const fetchLiveEvents = async () => {
  const { data } = await API.get(apiRoutes.getLiveEvents);
  return data.data;
};

export default function useLiveEvents() {
  return useSuspenseQuery<liveEventProps[]>({
    queryKey: ["liveEvents"],
    queryFn: fetchLiveEvents,
    gcTime: 0,
  });
}
