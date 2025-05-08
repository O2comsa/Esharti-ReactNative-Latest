import { useSuspenseQuery } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { myPlanProps } from "../../../types/myPlan";
import useAuth from "../../../hooks/useAuth";

export const fetchMyPlans = async () => {
  const { data } = await API.get(authRoutes.getMyPlans);
  return data.data;
};

export default function useMyPlans() {
  const { session } = useAuth();

  return useSuspenseQuery<myPlanProps[]>({
    queryKey: ["myPlans"],
    queryFn: fetchMyPlans,
    gcTime: 0,
  });
}
