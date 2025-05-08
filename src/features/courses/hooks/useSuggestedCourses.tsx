import { useSuspenseQuery } from "@tanstack/react-query";
import { apiRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { courseProps } from "../../../types/course";

export const fetchSuggestedCourses = async () => {
  const { data } = await API.get(apiRoutes.getCoursesList(1));
  return data.data.data;
};

export default function useSuggestedCourses() {
  return useSuspenseQuery<courseProps[]>({
    queryKey: ["suggestedCourses"],
    queryFn: fetchSuggestedCourses,
    gcTime: 0,
  });
}
