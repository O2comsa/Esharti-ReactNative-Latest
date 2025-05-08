import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "../../../components/custom/Text";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftWhiteIcon } from "../../../components/SvgIcons";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";
import useProfile from "../hooks/useProfile";
import { FC, useEffect } from "react";
import { router } from "expo-router";
import { BottomSheetControllerInput } from "../../bottomSheet";
import useAuth from "../../../hooks/useAuth";
import validator from "validator";

const EditProfileValidator = z
  .object({
    name: z
      .string()
      .regex(/^[\u0600-\u06FF\s]+$/, {
        message: "يجب ان يكون الاسم باللغة العربية",
      })
      .optional()
      .refine((value) => !value || value.trim().length >= 3, {
        message: "يجب أن يتكون الاسم على الأقل من 3 أحرف",
      }),
    password: z
      .string()
      .optional()
      .refine((value) => !value || value.trim().length >= 6, {
        message: "يجب أن يتكون طول كلمة المرور على الأقل من 6 أحرف",
      }),
    confirmPassword: z.string().optional(),
    national_id: z
      .string()
      .min(10, {
        message: "رقم الهوية الوطنية يجب ان يتكون من 10 خانات",
      })
      .optional(),
  })
  .superRefine(({ confirmPassword, password, name }, ctx) => {
    if (password && !confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "الرجاء إعادة كتابة كلمة المرور",
      });
    }
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "كلمة المرور غير متطابقة",
      });
    }
  });

type ProfileCredentials = z.infer<typeof EditProfileValidator>;

type editAccountFormProps = {
  closeEditAccountBottomSheet: () => void;
};

const EditAccountForm: FC<editAccountFormProps> = ({
  closeEditAccountBottomSheet,
}) => {
  const { refetch, data: profile } = useProfile();
  const { session } = useAuth();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileCredentials>({
    resolver: zodResolver(EditProfileValidator),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name);

      console.log("Profile info", profile);
    }
  }, [session?.user]);

  const {
    mutate: editAccountHandler,
    error,
    isPending,
    status,
  } = useMutation({
    mutationFn: async ({ name, password, national_id }: ProfileCredentials) => {
      try {
        const { data } = await API.post(
          authRoutes.updateProfile,
          { name, password, national_id },
          {
            headers: {
              Authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: (data) => {
      refetch();
      closeEditAccountBottomSheet();
      router.setParams({ editProfileStatus: "success" });
    },
  });

  return (
    <View className="space-y-5">
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          الاسم
        </Text>
        <BottomSheetControllerInput
          name={"name"}
          allowWhiteSpace={true}
          placeholder="الاسم"
          control={control}
        />
      </View>

      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          رقم الهوية الوطنية
        </Text>
        <BottomSheetControllerInput
          name={"national_id"}
          allowWhiteSpace={true}
          keyboardType="numeric"
          maxCharacters={10}
          placeholder="اضف رقم الهوية الوطنية لطباعته على الشهادة"
          control={control}
        />
      </View>

      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          كلمة المرور الجديدة
        </Text>
        <BottomSheetControllerInput
          name={"password"}
          placeholder="*******************"
          secureTextEntry
          control={control}
        />
      </View>
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          تأكيد كلمة المرور الجديدة
        </Text>
        <BottomSheetControllerInput
          name={"confirmPassword"}
          placeholder="*******************"
          secureTextEntry
          control={control}
        />
      </View>
      {status === "success" && (
        <Text className="text-green-500 text-[16px] ">
          تم تغيير المعلومات بنجاح
        </Text>
      )}
      <View className="pt-[22px]">
        <TouchableOpacity
          disabled={isPending}
          onPress={handleSubmit((data) => editAccountHandler(data))}
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
                حفظ البيانات
              </Text>
              <ArrowLeftWhiteIcon />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text>{error?.message}</Text>
    </View>
  );
};

export default EditAccountForm;
