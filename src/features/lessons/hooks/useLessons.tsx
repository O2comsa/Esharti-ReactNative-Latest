import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";

import { useSuspenseQuery } from "@tanstack/react-query";
import { lessonProps } from "../../../types/lesson";

export const fetchLessons = async (id: string) => {
  const { data } = await API.get(apiRoutes.getCourseLessons(id));
  return data.data;
};

export default function useLessons(id: string) {
  return useSuspenseQuery<lessonProps[]>({
    queryKey: ["lessons", id],
    queryFn: () => fetchLessons(id),
    refetchOnMount: false,
  });
}
