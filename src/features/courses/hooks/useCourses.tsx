import { API } from "../../../lib/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { apiRoutes } from "../../../routes";
import useAuth from "../../../hooks/useAuth";

export const fetchCourses = async (pageParam: number) => {
  const response = await API.get(apiRoutes.getCoursesList(pageParam));
  const data = response.data.data;
  return {
    results: data,
    next: data.current_page === data.last_page ? undefined : pageParam + 1,
  };
};

export default function useCourses() {
  const { session } = useAuth();
  return useSuspenseInfiniteQuery({
    queryKey: ["courses", session?.authenticated],
    queryFn: ({ pageParam = 1 }) => fetchCourses(pageParam),
    initialPageParam: 1,
    gcTime: 0,
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
