import { useSuspenseQuery } from "@tanstack/react-query";
import { apiRoutes, authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { courseProps } from "../../../types/course";
import useAuth from "../../../hooks/useAuth";

export const fetchMyCourses = async () => {
  const { data } = await API.get(authRoutes.getMyCourses);
  return data.data.data;
};

export default function useMyCourses() {
  const { session } = useAuth();

  return useSuspenseQuery<courseProps[]>({
    queryKey: ["myCourses", session?.authenticated],
    queryFn: fetchMyCourses,
    gcTime: 0,
  });
}
