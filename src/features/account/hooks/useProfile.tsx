import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { useQuery } from "@tanstack/react-query";
import { profileProps } from "../../../types/profile";
import * as SecureStore from "expo-secure-store";

export const fetchProfile = async () => {
  const { data } = await API.get(authRoutes.getProfile);
  return data.data;
};

export const preFetchProfile = async () => {
  // get the jwt token from the secure store
  let token = await SecureStore.getItemAsync("token");
  if (token) {
    token = JSON.parse(token);
    try {
      const { data } = await API.get(authRoutes.getProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    } catch (error) {
      // if error delete the jwt token (if the api responsed with error it's means that the token is invalid)
      await SecureStore.deleteItemAsync("token");
      return null;
    }
  }
  return null;
};

export default function useProfile() {
  return useQuery<profileProps>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}
