import { API } from "../lib/client";
import { authRoutes } from "../routes";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notificationProps } from "../types/notification";
import useAuth from "./useAuth";

export const fetchNotifications = async () => {
  const { data } = await API.get(authRoutes.getNotifications);
  return data.data;
};

export default function useNotification() {
  const { session } = useAuth();
  return useQuery<notificationProps[]>({
    queryKey: ["Notifications", session?.authenticated],
    queryFn: fetchNotifications,
    gcTime: 0,
    refetchOnMount: false,
  });
}

export function useMarkNotificationAsRead(id: string) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API.get(authRoutes.markAsReadNotification(id));
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(
        ["Notifications", session?.authenticated],
        (prevData: any) => {
          if (prevData) {
            const updatedNotification = prevData.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  read_at: Date.now(),
                };
              }
              return item;
            });
            return updatedNotification;
          }

          return prevData;
        }
      );
    },
  });
}

export async function prefetchNotifications(client: QueryClient) {
  const { session } = useAuth();
  await client.prefetchQuery({
    queryKey: ["Notifications", session?.authenticated],
    queryFn: fetchNotifications,
  });
}
