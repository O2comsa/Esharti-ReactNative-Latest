import { useQuery } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { liveSupportRequestProps } from "../../../types/liveSupportRequest";
import useAuth from "../../../hooks/useAuth";

export const fetchLiveSupportStatus = async () => {
  const { data } = await API.get(authRoutes.getLiveSupportStatus);
  return data.data;
};

export type LiveSupportStatusProps = {
  status: boolean;
  currentRequest: liveSupportRequestProps[];
};

export default function useLiveSupportStatus() {
  const { session } = useAuth();
  return useQuery<LiveSupportStatusProps>({
    queryKey: ["LiveSupportStatus"],
    queryFn: fetchLiveSupportStatus,
    gcTime: 0,
    enabled: !!session?.authenticated,
  });
}
