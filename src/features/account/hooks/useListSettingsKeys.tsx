import { apiRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { singleSettingsKeyProps } from "../../../types/singleSettingsKey";

export const fetchSettingsKeys = async () => {
  const { data } = await API.get(apiRoutes.getSettingsKeys);
  return data.data;
};

export default function useSettingsList() {
  return useSuspenseQuery<singleSettingsKeyProps[]>({
    queryKey: ["ListSettingsKeys"],
    queryFn: fetchSettingsKeys,
    gcTime: 30 * (60 * 1000), // 10 min
    staleTime: 25 * (60 * 1000), // 10min
  });
}
