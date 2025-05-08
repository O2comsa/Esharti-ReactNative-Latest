import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
import { ArrowLeftWhiteIcon } from "../../../components/SvgIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authRoutes } from "../../../routes";
import { API } from "../../../lib/client";
import { router } from "expo-router";
import { BottomSheetControllerInput } from "../../bottomSheet";

type passwordReminderFormProps = {
  handleActiveFormChange: (form: "reminder" | "otp") => void;
};
const passwordReminderValidator = z.object({
  email: z
    .string({ required_error: "الرجاء إدخال البريد الإلكتروني" })
    .email({ message: "البريد الإلكتروني غير صالح" }),
});

type passwordReminderCredentials = z.infer<typeof passwordReminderValidator>;

const SendPasswordReminderForm: FC<passwordReminderFormProps> = ({
  handleActiveFormChange,
}) => {
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<passwordReminderCredentials>({
    resolver: zodResolver(passwordReminderValidator),
    mode: "onSubmit",
  });

  const {
    mutate: passwordReminderHandler,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({ email }: passwordReminderCredentials) => {
      try {
        const { data } = await API.post(authRoutes.sendPasswordReminder, {
          email,
        });

        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },

    onSuccess: (data) => {
      router.setParams({ email: getValues("email") });
      handleActiveFormChange("otp");
    },
  });
  return (
    <View>
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          البريد الالكتروني
        </Text>
        <BottomSheetControllerInput
          control={control}
          name={"email"}
          keyboardType="default"
          placeholder="name@email.com"
          placeholderTextColor="#A3A3A3"
        />
      </View>
      <View className="pt-[16px]">
        <TouchableOpacity
          disabled={isPending}
          onPress={handleSubmit((data) => passwordReminderHandler(data))}
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
                ارسال
              </Text>
              <ArrowLeftWhiteIcon />
            </View>
          )}
        </TouchableOpacity>
        {error && <Text className="text-red-500">{error.message}</Text>}
      </View>
    </View>
  );
};

export default SendPasswordReminderForm;
