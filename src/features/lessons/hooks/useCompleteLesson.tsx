import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";

export default function useCompleteLesson(id: string, course_id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API.get(authRoutes.completeLesson(id));
        await API.get(authRoutes.viewLesson(id));
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["lessons", course_id] });
    },
  });
}
