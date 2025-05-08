import { apiRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { courseProps } from "../../../types/course";
import { useSuspenseQuery } from "@tanstack/react-query";

export const fetchCourseById = async (id: string) => {
  const { data } = await API.get(apiRoutes.getSingleCourse(id));
  return data.data;
};

export default function useSingleCourse(id: string) {
  return useSuspenseQuery<courseProps>({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    gcTime: 0,
  });
}
