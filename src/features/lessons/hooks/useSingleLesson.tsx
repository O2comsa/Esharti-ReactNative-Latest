import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { lessonProps } from "../../../types/lesson";

export const fetchLessonById = async (id: string) => {
  const { data } = await API.get(apiRoutes.getSingleLesson(id));
  return data.data;
};

export default function useSingleLesson(id: string) {
  return useSuspenseQuery<lessonProps>({
    queryKey: ["lesson", id],
    queryFn: () => fetchLessonById(id),
    refetchOnMount: false,
  });
}
