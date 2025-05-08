import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useSuspenseQuery } from "@tanstack/react-query";
import { planProps } from "../../../types/plan";

export const fetchPlans = async () => {
  const { data } = await API.get(apiRoutes.getPlans);
  return data.data;
};

export default function usePlans() {
  return useSuspenseQuery<planProps[]>({
    queryKey: ["plans"],
    queryFn: fetchPlans,
    gcTime: 0,
  });
}
