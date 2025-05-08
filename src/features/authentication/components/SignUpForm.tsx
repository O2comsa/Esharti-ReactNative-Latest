import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ControllerInput from "./ControllerInput";
import { Text } from "../../../components/custom/Text";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import {
  SignUpCredentials,
  SignUpValidator,
} from "../validators/SignUpValidator";
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

const SignUpForm = () => {
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
    mutationFn: async ({
      email,
      password,
      name,
      national_id,
      mobile,
    }: SignUpCredentials) => {
      try {
        let device_token: string | null = null;
        const permission = await useNotificationUserPermission();
        if (permission) {
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          device_token = token;
        }
        const { data } = await API.post(authRoutes.register, {
          email,
          password,
          name,
          national_id: national_id || null,
          device_token,
          mobile,
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
  } = useForm<SignUpCredentials>({
    resolver: zodResolver(SignUpValidator),
    mode: "onSubmit",
  });

  return (
    <MotiView
      from={{ translateX: 200, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: "timing", duration: 500 }}
      className="mt-[42px]"
    >
      <View className="flex-row gap-x-[9px] justify-center items-center mb-6">
        <MyAccountIcon
          stroke={"#040404"}
          strokeWidth={2}
          width={28}
          height={28}
        />
        <Text className="text-[24px]">تسجيل حساب جديد</Text>
      </View>
      <View className="mt-5">
        <Text fontWeight="500" className="mb-1 text-neutral-900">
          الاسم كامل
        </Text>

        <ControllerInput
          name="name"
          allowWhiteSpace={true}
          control={control}
          placeholder="الاسم رباعي باللغة العربية"
          placeholderTextColor="gray"
        />
      </View>
      <View className="mt-5">
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
          رقم الجوال
        </Text>
        <ControllerInput
          name="mobile"
          control={control}
          placeholder="05xxxxxxxx"
          placeholderTextColor="gray"
        />
      </View>
      <View className="mt-5">
        <Text fontWeight="500" className="mb-1 text-neutral-900">
          رقم الهوية الوطنية{" "}
          <Text className="text-xs text-gray-400">(إختياري)</Text>
        </Text>
        <ControllerInput
          name="national_id"
          control={control}
          keyboardType="numeric"
          maxCharacters={10}
          placeholder="اضف رقم الهوية الوطنية لطباعته على الشهادة"
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
      <View className="mt-5">
        <Text fontWeight="500" className="mb-1 text-neutral-900">
          تأكيد كلمة المرور
        </Text>
        <ControllerInput
          name="confirmPassword"
          control={control}
          secureTextEntry
          placeholder="**************"
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity
        disabled={isPending}
        onPress={handleSubmit((data) => loginHandler(data))}
        className="mt-5 bg-primary py-3 px-5 rounded-lg"
      >
        {isPending ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text className="text-center text-[16px] text-white" fontWeight="500">
            تسجيل حساب جديد
          </Text>
        )}
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

export default SignUpForm;
