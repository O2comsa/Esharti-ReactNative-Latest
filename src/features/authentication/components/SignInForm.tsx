import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import ControllerInput from "./ControllerInput";
import { Text } from "../../../components/custom/Text";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";

import { LoginCredentials, LoginValidator } from "../validators/loginValidator";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyAccountIcon } from "../../../components/SvgIcons";
import { MotiView } from "moti";
import ErrorModal from "./ErrorModal";
import messaging from "@react-native-firebase/messaging";

import useNotificationUserPermission from "../../../hooks/useNotificationUserPermission";
import useAuth from "../../../hooks/useAuth";
type SignInFormProps = {
  openResetPasswordBottomSheet: () => void;
};

const SignInForm: FC<SignInFormProps> = ({ openResetPasswordBottomSheet }) => {
  const { signIn } = useAuth();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const { navigatedFrom } = useLocalSearchParams();

  const closeErrorModal = () => {
    setIsErrorModalVisible(false);
  };
  const {
    mutate: loginHandler,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      try {
        let device_token: string | null = null;
        const permission = await useNotificationUserPermission();
        if (permission) {
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          device_token = token;
        }
        const { data } = await API.post(authRoutes.login, {
          email,
          password,
          device_token,
        });
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },

    onSuccess: (data) => {
      const {
        user: { email, name, profile_picture },
        token,
      } = data.data;
      signIn!({ email, name, token, image: profile_picture });
      if (navigatedFrom !== undefined) {
        //@ts-ignore
        router.replace({
          pathname: navigatedFrom,
          params: { navigatedFrom: undefined },
        });
      } else {
        router.replace("/");
      }
    },
    onError: () => {
      setIsErrorModalVisible(true);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginValidator),
    mode: "onSubmit",
  });
  return (
    <MotiView
      from={{ translateX: -200, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: "timing", duration: 500 }}
      className="mt-[91px]"
    >
      <View className="flex-row gap-x-[9px] justify-center items-center mb-6">
        <MyAccountIcon
          stroke={"#040404"}
          strokeWidth={2}
          width={28}
          height={28}
        />
        <Text className="text-[24px]">تسجيل الدخول</Text>
      </View>
      <View>
        <Text fontWeight="500" className="mb-1 text-neutral-900">
          البريد الإلكتروني
        </Text>

        <ControllerInput
          name="email"
          control={control}
          placeholder="name@email.com"
          placeholderTextColor="gray"
        />
      </View>
      <View className="mt-5">
        <Text fontWeight="500" className="mb-1 text-neutral-900">
          كلمة المرور
        </Text>
        <ControllerInput
          name="password"
          control={control}
          secureTextEntry
          placeholder="**************"
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity onPress={openResetPasswordBottomSheet} className="mt-2">
        <Text className="text-neutral-500" fontWeight="400">
          نسيت كلمة المرور؟
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isPending}
        onPress={handleSubmit((data) => loginHandler(data))}
        className="mt-5 bg-primary py-3 px-5 rounded-lg"
      >
        {isPending ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text className="text-center text-[16px] text-white" fontWeight="500">
            تسجيل الدخول
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isPending}
        onPress={() => {
          if (navigatedFrom !== undefined) {
            //@ts-ignore
            router.replace({
              pathname: navigatedFrom,
              params: { navigatedFrom: undefined },
            });
          } else {
            router.replace("/");
          }
        }}
        className="mt-3 bg-black py-3 px-5 rounded-lg"
      >
        <Text fontWeight="500" className="text-white text-center text-[16px]">
          اكمل بدون تسجيل
        </Text>
      </TouchableOpacity>
      {error && (
        <ErrorModal
          close={closeErrorModal}
          visible={isErrorModalVisible}
          error={error.message}
        />
      )}
    </MotiView>
  );
};

export default SignInForm;
