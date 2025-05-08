import { useMutation } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { liveSupportRequestProps } from "../../../types/liveSupportRequest";

export const createLiveSupportRequest = async () => {
  const { data } = await API.post(authRoutes.createLiveSupportRequest);
  return data.data;
};

export default function useCreateLiveSupportRequest() {
  return useMutation<liveSupportRequestProps>({
    mutationFn: createLiveSupportRequest,
    gcTime: 0,
  });
}
