import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { certificateProps } from "../../../types/certificate";

export const fetchCertificates = async () => {
  const { data } = await API.get(authRoutes.getCertificates);
  return data.data.data;
};

export default function useCertificates() {
  return useSuspenseQuery<certificateProps[]>({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
    gcTime: 0,
  });
}
