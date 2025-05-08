import { View, Modal, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
import { AntDesign } from "@expo/vector-icons";

type ErrorModalProps = {
  close?: () => void;
  visible: boolean;
  error: string;
};

const ErrorModal: FC<ErrorModalProps> = ({ close, visible, error }) => {
  return (
    <Modal
      style={{ direction: "rtl" }}
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View className=" flex-1 justify-center bg-black/30">
        <View className="bg-white m-8 rounded-md p-5 items-center">
          <View className=" bg-primary my-3 rounded-full w-10 h-10 justify-center items-center">
            <AntDesign name="warning" size={24} color="white" />
          </View>
          <Text
            className="text-[15px] text-gray-700 text-center"
            fontWeight="500"
          >
            {error}
          </Text>
          <TouchableOpacity
            onPress={close}
            className="bg-primary rounded-lg p-2 mt-4 w-full"
          >
            <Text className="text-center text-[15px]" fontWeight="500">
              حسناً
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
