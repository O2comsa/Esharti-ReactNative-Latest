import { Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CloseIcon, PlusIcon } from "../../../components/SvgIcons";
import { Text } from "../../../components/custom/Text";
import { View } from "../../../components/custom/View";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { DocumentPickerAsset } from "expo-document-picker";
import ReactNativeModal from "react-native-modal";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export const getFileInfo = async (fileURI: string) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

export const isLessThanTheMB = (
  fileSize: number,
  smallerThanSizeMB: number
) => {
  const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
  return isOk;
};

const FileUploader = ({
  handleFiles,
  handleDeleteFile,
}: {
  handleFiles: (uploadedFile: any) => void;
  handleDeleteFile: (fileUri: any) => void;
}) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<
    DocumentPickerAsset[]
  >([]);
  const [uploadedImages, setUploadedImages] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [error, setError] = useState<null | string>(null);
  const [isSelectMediaTypeVisible, setIsSelectMediaTypeVisible] =
    useState<boolean>(false);

  const pickDocument = async () => {
    const results = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword"],
    });
    if (!results.assets) return;
    const document = results.assets[0];
    const fileInfo = await getFileInfo(document.uri);
    // @ts-ignore
    const isLt1MB = isLessThanTheMB(fileInfo.size, 1);
    if (!isLt1MB) {
      setError("حجم الملف أكبر من واحد ميغابايت");
      return;
    }

    setUploadedDocuments((prev) => [...prev, document]);
    setIsSelectMediaTypeVisible(false);
    const file = {
      name: document.name,
      uri: document.uri,
      type: document.mimeType,
      size: document.size,
    };
    handleFiles(file);
  };
  const fetchImageFromUri = async (uri: string) => {
    try {
      const response = await axios.get(uri, { responseType: "blob" });
      return response.data._data;
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error; // You might want to handle the error appropriately in your application
    }
  };

  const pickImage = async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });
    if (results.canceled) return;
    const img: any = await fetchImageFromUri(results.assets[0].uri);

    // check whether the image extention is supported or not
    const imageExtention = img.type.split("/")[1];
    const supportedExtensions = ["jpg", "jpeg", "png"];
    if (!supportedExtensions.includes(imageExtention.toLowerCase())) {
      setError("صيغة الصورة هذه غير مدعومة للاسف.");
      setIsSelectMediaTypeVisible(false);
      return;
    }
    // chekc whether the image size is less than 1mb
    // @ts-ignore
    const isLt1MB = isLessThanTheMB(img.size, 1);
    if (!isLt1MB) {
      setError("حجم الملف أكبر من واحد ميغابايت");
      setIsSelectMediaTypeVisible(false);
      return;
    }
    setUploadedImages((prev) => [...prev, results.assets[0]]);
    const newImageUri =
      "file:///" + results.assets[0].uri.split("file:/").join("");
    const file = {
      name: newImageUri.split("/").pop(),
      uri: newImageUri,
      type: img.type,
      size: img.size,
    };
    setIsSelectMediaTypeVisible(false);

    handleFiles(file);
  };

  return (
    <>
      <View className="mt-5">
        <Text fontWeight="500" className="text-[16px] text-[#525252] mb-2">
          المرفقات
        </Text>
        <View className="flex-row flex-wrap gap-[10px]">
          {uploadedImages?.map((image, index) => (
            <View key={image.uri} className=" relative">
              <TouchableOpacity
                onPress={() => {
                  handleDeleteFile(image.uri);
                  setUploadedImages((prev) =>
                    prev.filter((file) => file.uri !== image.uri)
                  );
                }}
                className=" absolute z-50 -top-2 -right-2 bg-[#EBA800] rounded-full"
              >
                <MaterialCommunityIcons name="minus" size={22} color="white" />
              </TouchableOpacity>
              <Image
                source={{ uri: image.uri }}
                style={{
                  borderRadius: 12,
                  height: 60,
                  width: 60,
                  borderWidth: 1,
                  borderColor: "#D1D1D1",
                }}
              />
            </View>
          ))}
          {uploadedDocuments?.map((document) => (
            <View
              key={document.uri}
              className="h-[60px] w-[60px] border border-[#D1D1D1] rounded-xl items-center justify-center relative"
            >
              <TouchableOpacity
                onPress={() => {
                  handleDeleteFile(document.uri);
                  setUploadedDocuments((prev) =>
                    prev.filter((file) => file.uri !== document.uri)
                  );
                }}
                className=" absolute  z-50 -top-2 -right-2 bg-[#EBA800] rounded-full"
              >
                <MaterialCommunityIcons name="minus" size={22} color="white" />
              </TouchableOpacity>
              <Ionicons
                name="ios-document-text-outline"
                size={33}
                color="#EBA800"
              />
            </View>
          ))}
          {uploadedImages.length + uploadedDocuments.length < 3 && (
            <TouchableOpacity
              onPress={() => {
                setError(null);
                setIsSelectMediaTypeVisible(true);
              }}
              className="border border-[#D1D1D1] rounded-xl h-[60px] w-[60px] items-center justify-center"
            >
              <PlusIcon />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text className="text-red-500 mt-2">{error}</Text>}
      </View>
      <ReactNativeModal
        onBackdropPress={() => setIsSelectMediaTypeVisible(false)}
        isVisible={isSelectMediaTypeVisible}
        className="flex-1 m-0 justify-center"
      >
        <View className="bg-white h-32 m-14 rounded-xl relative ">
          <TouchableOpacity
            onPress={() => setIsSelectMediaTypeVisible(false)}
            className=" absolute p-3 right-0 z-10"
          >
            <CloseIcon />
          </TouchableOpacity>
          <View className="flex-row justify-center items-center h-full space-x-6">
            {/** upload images only **/}
            <TouchableOpacity
              onPress={pickImage}
              className="rounded-full bg-[#FFFBEF] p-4"
            >
              <Entypo name="images" size={35} color="#EBA800" />
            </TouchableOpacity>
            {/** upload files only **/}
            <TouchableOpacity
              onPress={pickDocument}
              className="rounded-full bg-[#FFFBEF] p-4"
            >
              <Ionicons
                name="ios-document-attach-outline"
                size={35}
                color="#EBA800"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default FileUploader;
