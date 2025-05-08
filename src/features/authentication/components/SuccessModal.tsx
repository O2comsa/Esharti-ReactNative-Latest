import { View, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

type ErrorModalProps = {
  close?: () => void;
  visible: boolean;
  message: string;
  showSuccessIcon?: boolean;
  textCenter?: boolean;
};

const SuccessModal: FC<ErrorModalProps> = ({
  close,
  visible,
  message,
  textCenter = true,
  showSuccessIcon = true,
}) => {
  return (
    <Modal
      animationIn="fadeIn"
      onBackdropPress={close}
      backdropOpacity={0.5}
      style={{ margin: 0, justifyContent: "center", direction: "rtl" }}
      animationOut="fadeOut"
      isVisible={visible}
    >
      <View className="bg-white m-8 rounded-md p-5 items-center">
        {showSuccessIcon && (
          <View className=" bg-primary my-3 rounded-full w-10 h-10 justify-center items-center">
            <AntDesign name="check" size={24} color="white" />
          </View>
        )}
        <Text
          style={{ textAlign: textCenter ? "center" : "auto" }}
          className="text-[15px] text-gray-700"
          fontWeight="500"
        >
          {message}
        </Text>
        <TouchableOpacity
          onPress={close}
          className="bg-primary w-full rounded-lg p-2 mt-4"
        >
          <Text className="text-center  text-[15px]" fontWeight="500">
            حسناً
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SuccessModal;
