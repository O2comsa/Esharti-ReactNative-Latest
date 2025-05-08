import { useMutation } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { router } from "expo-router";

export default function useLiveEventPayment(liveEvent_id: number) {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API.post(authRoutes.buyLiveEvent, {
          liveEvent_id,
        });
        return data.data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: (data) => {
      router.push({
        pathname: "/payment",
        params: {
          paymentUri: data?.responseResult?.payment_url,
          navigatedFrom: "liveEvent",
          id: liveEvent_id,
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
