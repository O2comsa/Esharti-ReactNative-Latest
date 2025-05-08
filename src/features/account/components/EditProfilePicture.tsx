import { View, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { WhiteCameraIcon } from "../../../components/SvgIcons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import useProfile from "../hooks/useProfile";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";
import SuccessModal from "../../authentication/components/SuccessModal";
import ErrorModal from "../../authentication/components/ErrorModal";

type EditProfilePictureProps = {
  children: React.ReactNode;
};

const EditProfilePicture: FC<EditProfilePictureProps> = ({ children }) => {
  const { data, refetch } = useProfile();

  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);
  const fetchImageFromUri = async (uri: string) => {
    try {
      const response = await axios.get(uri, { responseType: "blob" });
      return response.data._data;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const pickImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
    });
    if (results.canceled) return;
    const img: any = await fetchImageFromUri(results.assets[0].uri);
    console.log(results.assets[0]);
    const newImageUri =
      "file:///" + results.assets[0].uri.split("file:/").join("");
    const file = {
      name: newImageUri.split("/").pop(),
      uri: newImageUri,
      type: img.type,
      size: img.size,
    };
    const formData = new FormData();
    formData.append("profile_picture", file as any);
    formData.append("national_id", data?.national_id as any);

    try {
      await API.post(authRoutes.updateProfile, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSuccessModalVisible(true);
      refetch();
    } catch (error) {
      setIsErrorModalVisible(true);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };
  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={pickImage}
        className="h-[61px] w-[61px] rounded-full relative justify-center items-center"
      >
        {children}
        <View className="absolute z-50">
          <WhiteCameraIcon />
        </View>
      </TouchableOpacity>
      <SuccessModal
        message="تم تغيير الصورة الشخصية بنجاح"
        visible={isSuccessModalVisible}
        close={handleSuccessModalClose}
      />
      <ErrorModal
        error="حدث خطاً ما يرجى المحاولة مرة أخرى"
        visible={isErrorModalVisible}
        close={handleErrorModalClose}
      />
    </>
  );
};

export default EditProfilePicture;
