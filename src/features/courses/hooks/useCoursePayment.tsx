import { useMutation } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { router } from "expo-router";

export default function useCoursePayment(course_id: number) {
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await API.post(authRoutes.paidCourseSubscription, {
          course_id,
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
          navigatedFrom: "course",
          id: course_id,
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
