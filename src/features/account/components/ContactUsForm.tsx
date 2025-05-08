import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "../../../components/custom/Text";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftWhiteIcon } from "../../../components/SvgIcons";
import { FC, useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import { BottomSheetControllerInput } from "../../bottomSheet";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../lib/client";
import { apiRoutes } from "../../../routes";
import { router } from "expo-router";
import useAuth from "../../../hooks/useAuth";

const ContactUsValidator = z.object({
  name: z
    .string({ required_error: "الرجاء إدخال الاسم" })
    .min(3, { message: "الاسم يجب ان يتكون من 3 احرف على الأقل" }),
  email: z
    .string({ required_error: "الرجاء إدخال البريد الالكتروني" })
    .email({ message: "البريد الالكتروني المدخل غير صحيح" }),
  message: z.string({ required_error: "الرجاء إدخال نص الرسالة" }),
});

type ContactUsCredentials = z.infer<typeof ContactUsValidator>;

type contactUsProps = {
  closeContactUsBottomSheet: () => void;
};

const ContactUsForm: FC<contactUsProps> = ({ closeContactUsBottomSheet }) => {
  const { session } = useAuth();
  const formData = new FormData();

  const [files, setFiles] = useState<any[]>([]);

  const handleFiles = (uploadedFile: any) => {
    setFiles((prev) => [...prev, uploadedFile]);
  };

  const handleDeleteFile = (fileUri: any) => {
    setFiles((prev) => prev.filter((file) => file.uri !== fileUri));
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ContactUsCredentials>({
    resolver: zodResolver(ContactUsValidator),
    mode: "onSubmit",
  });

  const {
    mutate: contactUsHandler,
    error,
    isPending,
    status,
  } = useMutation({
    mutationFn: async ({ name, email, message }: ContactUsCredentials) => {
      if (!session?.authenticated) {
        formData.append("name", name);
        formData.append("email", email);
      }
      formData.append("message", message);
      files.map((asset, index) => {
        formData.append(`files[${index}]`, asset);
      });
      try {
        const { data } = await API.post(apiRoutes.contactUs, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        return data;
      } catch (error: any) {
        throw new Error(error?.response?.data?.errors);
      }
    },
    onSuccess: () => {
      closeContactUsBottomSheet();
      router.setParams({ contactUsStatus: "success" });
    },
  });

  useEffect(() => {
    if (session?.user) {
      setValue("email", session.user.email);
      setValue("name", session.user.name);
    }
  }, [session?.user]);

  return (
    <View className="space-y-5">
      {!session?.authenticated && (
        <View className="space-y-5">
          <View>
            <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
              البريد الالكتروني
            </Text>
            <BottomSheetControllerInput
              control={control}
              name={"email"}
              placeholder="name@email.com"
            />
          </View>
          <View>
            <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
              الاسم
            </Text>
            <BottomSheetControllerInput
              control={control}
              name={"name"}
              allowWhiteSpace={true}
              placeholder="عبد الله محمد"
            />
          </View>
        </View>
      )}
      <View>
        <Text className="text-[16px] text-[#525252] mb-2" fontWeight="500">
          اهلا {session?.user?.name}, كيف نقدر نساعدك؟
        </Text>
        <BottomSheetControllerInput
          control={control}
          name={"message"}
          multiline
          allowWhiteSpace={true}
          numberOfLines={4}
          placeholder="نص الرسالة..."
        />
      </View>

      <FileUploader
        handleFiles={handleFiles}
        handleDeleteFile={handleDeleteFile}
      />

      <View className="mt-[22px]">
        <TouchableOpacity
          disabled={isPending}
          onPress={handleSubmit((data) => contactUsHandler(data))}
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
                ارسل الأن
              </Text>
              <ArrowLeftWhiteIcon />
            </View>
          )}
        </TouchableOpacity>
        {error && <Text>{error.message}</Text>}
      </View>
    </View>
  );
};

export default ContactUsForm;
