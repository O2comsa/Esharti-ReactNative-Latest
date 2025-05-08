import { View, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { API } from "../../../lib/client";
import { authRoutes } from "../../../routes";
import useAuth from "../../../hooks/useAuth";

type DeleteAccountModalProps = {
  close: () => void;
  visible: boolean;
  showSuccessIcon?: boolean;
  textCenter?: boolean;
  closeEditAccountBottomSheet: () => void;
};

const DeleteAccountModal: FC<DeleteAccountModalProps> = ({
  close,
  visible,
  textCenter = true,
  showSuccessIcon = true,
  closeEditAccountBottomSheet,
}) => {
  const { signOut } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      await API.post(authRoutes.deleteAccount);
    } catch (error: any) {
      console.log(error.response.data);
    } finally {
      close();
      closeEditAccountBottomSheet();
      signOut();
    }
  };

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
          <View className=" bg-red-500 my-3 rounded-full w-14 h-14 justify-center items-center">
            <AntDesign name="warning" size={24} color="white" />
          </View>
        )}
        <Text
          style={{ textAlign: textCenter ? "center" : "auto" }}
          className="text-[15px] text-gray-700"
          fontWeight="500"
        >
          هل أنت متأكد أنك تريد حذف حسابك نهائياً؟
        </Text>
        <View className=" flex flex-row items-center gap-x-2">
          <TouchableOpacity
            onPress={handleDeleteAccount}
            className="bg-red-500 flex-1  rounded-lg p-2 mt-4"
          >
            <Text
              className="text-center text-white  text-[15px]"
              fontWeight="500"
            >
              نعم
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={close}
            className="bg-gray-400 flex-1  rounded-lg p-2 mt-4"
          >
            <Text
              className="text-center text-white  text-[15px]"
              fontWeight="500"
            >
              لا
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
