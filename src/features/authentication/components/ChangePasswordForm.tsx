import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
import { ArrowLeftWhiteIcon } from "../../../components/SvgIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";
import { router, useLocalSearchParams } from "expo-router";
import {
  changePasswordCredentials,
  changePasswordValidator,
} from "../validators/changePasswordValidator";
import { BottomSheetControllerInput } from "../../bottomSheet";
type otpCheckProps = {};

const ChangePasswordForm: FC<otpCheckProps> = ({}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordCredentials>({
    resolver: zodResolver(changePasswordValidator),
    mode: "onSubmit",
  });

  const { email, token }: { email: string; token: string } =
    useLocalSearchParams();
  const {
    mutate: passwordResetHandler,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({
      password,
      confirmPassword,
    }: changePasswordCredentials) => {
      try {
        const { data } = await API.post(authRoutes.passwordReset, {
          token,
          email,
          password,
          password_confirmation: confirmPassword,
        });
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },

    onSuccess: (data) => {
      router.replace({
        pathname: "/auth/",
        params: { passwordChangedSuccessfully: "true" },
      });
    },
  });
  return (
    <View className="space-y-4">
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          كلمة المرور الجديدة
        </Text>
        <BottomSheetControllerInput
          control={control}
          name={"password"}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#A3A3A3"
        />
      </View>
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          تاكيد كلمة المرور الجديدة
        </Text>
        <BottomSheetControllerInput
          control={control}
          name={"confirmPassword"}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#A3A3A3"
        />
      </View>
      {error && <Text className="text-red-500">{error.message}</Text>}
      <View className="">
        <TouchableOpacity
          disabled={isPending}
          onPress={handleSubmit((data) => passwordResetHandler(data))}
          className="bg-primary rounded-xl px-4 py-3 h-[59px] justify-center"
        >
          {isPending && (
            <ActivityIndicator
              className="items-center"
              size={"small"}
              color={"white"}
            />
          )}
          {!isPending && (
            <View className="flex-row justify-between items-center">
              <Text className="text-wihte text-[18px] text-[#F5F5F5]">
                تأكيد
              </Text>
              <ArrowLeftWhiteIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePasswordForm;
