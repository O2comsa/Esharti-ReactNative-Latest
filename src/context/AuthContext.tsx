import { createContext, useEffect, useState } from "react";
import { API } from "../lib/client";
import * as SecureStore from "expo-secure-store";
import useProfile from "../features/account/hooks/useProfile";
import { authRoutes } from "../routes";

export const AuthContext = createContext<AuthProps>({} as AuthProps);

type user = {
  name: string;
  email: string;
  image?: string;
  token: string;
};
type session = {
  user: user | null;
  authenticated: boolean | null;
};
type AuthProps = {
  session: session | null;
  signIn: ({ email, name, image }: user) => void;
  signOut: () => Promise<void>;
};

export const AuthProvider = ({ children }: any) => {
  const { data, error } = useProfile();
  const [session, setSession] = useState<session>({
    user: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      // get the token from the secureStore
      let token = await SecureStore.getItemAsync("token");
      // set default headers
      if (token && data) {
        token = JSON.parse(token);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setSession({
          authenticated: true,
          user: {
            email: data.email,
            name: data.name,
            image: data.profile_picture,
            token: token!!,
          },
        });
      }
      if (error && session.authenticated) {
        signOut();
      }
    };
    loadUser();
  }, [data, error]);

  const signIn = async ({ email, name, token, image }: user) => {
    setSession({
      user: {
        email,
        token,
        name,
        image,
      },
      authenticated: true,
    });
    // set default headers
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // set token to the SecureStore
    await SecureStore.setItemAsync("token", JSON.stringify(token));
  };
  const signOut = async () => {
    // clear the session
    setSession({
      user: null,
      authenticated: null,
    });
    // delete jwt token for secure store
    await SecureStore.deleteItemAsync("token");
    // invalidate the jwt token

    try {
      await API.post(authRoutes.logout);
    } catch (error) {}
    // set default axios Authorization header to empty
    API.defaults.headers.common["Authorization"] = "";
  };

  const value: AuthProps = {
    session,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
