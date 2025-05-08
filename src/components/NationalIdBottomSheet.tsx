import React, { Ref, useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import {
  BottomSheet,
  BottomSheetControllerInput,
  bottomSheetRef,
} from "../features/bottomSheet";
import { Text } from "./custom/Text";
import useProfile from "../features/account/hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authRoutes } from "../routes";
import { ArrowLeftWhiteIcon } from "./SvgIcons";
import { API } from "../lib/client";

type bottomSheetModalProps = {
  bottomSheetRef: Ref<bottomSheetRef>;
  closeNationalIdBottomSheet: () => void;
  openNationalIdBottomSheet: () => void;
};

const NationalIdValidator = z.object({
  national_id: z
    .string({ required_error: "الرجاء إدخال رقم الهوية الوطنية" })
    .min(10, {
      message: "رقم الهوية الوطنية يجب ان يتكون من 10 خانات",
    }),
});

type NationalIdCredentials = z.infer<typeof NationalIdValidator>;

const NationalIdBottomSheet: React.FC<bottomSheetModalProps> = ({
  bottomSheetRef,
  closeNationalIdBottomSheet,
  openNationalIdBottomSheet,
}) => {
  const { data } = useProfile();
  useEffect(() => {
    if (data?.national_id === null || data?.national_id === "undefined") {
      openNationalIdBottomSheet();
    }
  }, [data?.national_id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NationalIdCredentials>({
    resolver: zodResolver(NationalIdValidator),
    mode: "onSubmit",
  });
  const queryClient = useQueryClient();
  const [nationalId, setNationalId] = useState<any>(null);
  const {
    mutate: nationalIdHandler,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({ national_id }: NationalIdCredentials) => {
      try {
        const { data } = await API.post(authRoutes.updateProfile, {
          national_id,
        });
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], (prevData: any) => {
        if (prevData) {
          return {
            ...prevData,
            national_id: nationalId,
          };
        }
        return prevData;
      });
      closeNationalIdBottomSheet();
    },
  });
  if (data?.national_id) return null;

  return (
    <BottomSheet
      closeable={false}
      enableHeaderBottomBorder={false}
      bottomSheetRef={bottomSheetRef}
      headerTitle="تحديث رقم الهوية الوطنية"
    >
      <View className=" space-y-4">
        <Text fontWeight="500" className="mb-1 text-neutral-900">
          للمتابعة يرجى تحديث رقم الهوية الوطنية
        </Text>
        <BottomSheetControllerInput
          control={control}
          keyboardType="numeric"
          name={"national_id"}
          maxCharacters={10}
          placeholder="0123456789"
        />
        <TouchableOpacity
          disabled={isPending}
          onPress={handleSubmit((data) => {
            nationalIdHandler(data);
            setNationalId(data.national_id);
          })}
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
              <Text className="text-wihte text-[18px] text-[#F5F5F5]">حفظ</Text>
              <ArrowLeftWhiteIcon />
            </View>
          )}
        </TouchableOpacity>
        {error && <Text>{error.message}</Text>}
      </View>
    </BottomSheet>
  );
};

export default NationalIdBottomSheet;
