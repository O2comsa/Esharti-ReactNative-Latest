import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
import { ArrowLeftWhiteIcon } from "../../../components/SvgIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";
import { router, useGlobalSearchParams } from "expo-router";
import { BottomSheetControllerInput } from "../../bottomSheet";

type otpCheckProps = {
  handleActiveFormChange: (form: "reminder" | "otp" | "changePassword") => void;
};
const OtpCheckFormValidator = z.object({
  otp: z
    .string({ required_error: "الرجاء إدخال الكود المرسل لك عبر البريد" })
    .min(4, { message: "يجب أن يتكون طول الكود المرسل لك من 4 ارقام" }),
});

type OtpCheckFormCredentials = z.infer<typeof OtpCheckFormValidator>;

const OtpCheckForm: FC<otpCheckProps> = ({ handleActiveFormChange }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OtpCheckFormCredentials>({
    resolver: zodResolver(OtpCheckFormValidator),
    mode: "onSubmit",
  });

  const { email }: { email: string } = useGlobalSearchParams();
  const {
    mutate: otpHandler,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({ otp }: OtpCheckFormCredentials) => {
      try {
        const { data } = await API.post(authRoutes.verifyToken, {
          token: otp,
          email,
        });
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },

    onSuccess: (data) => {
      router.setParams({ token: getValues("otp") });
      handleActiveFormChange("changePassword");
    },
  });
  return (
    <View>
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          ادخل الكود المرسل لك عبر البريد
        </Text>
        <BottomSheetControllerInput
          control={control}
          name={"otp"}
          maxCharacters={4}
          keyboardType="numeric"
          placeholderTextColor="#A3A3A3"
        />
      </View>
      <View className="pt-[16px]">
        <TouchableOpacity
          disabled={isPending}
          onPress={handleSubmit((data) => otpHandler(data))}
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
        {error && <Text className="text-red-500">{error.message}</Text>}
      </View>
    </View>
  );
};

export default OtpCheckForm;
