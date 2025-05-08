import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../lib/client";

export default function useBookmark(
  id: string,
  variant: "course" | "lesson" | "article" | "dictionary"
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API.get(`${variant}/bookmark/${id}`);
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: async (data) => {
      queryClient.setQueryData([variant, id], (prevData: any) => {
        if (prevData) {
          return {
            ...prevData,
            bookmarked: !prevData.bookmarked,
          };
        }
        return prevData;
      });
      queryClient.refetchQueries({ queryKey: [`bookmarked${variant}`] });
    },
  });
}
