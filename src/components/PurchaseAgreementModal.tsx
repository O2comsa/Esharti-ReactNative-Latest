import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { FC } from "react";
import Modal from "react-native-modal";
import { Text } from "./custom/Text";
import { useSettingsList } from "../features/account";

type PurchaseAgreementModalProps = {
  close?: () => void;
  visible: boolean;
  navigateToPurchase: () => void;
};

const PurchaseAgreementModal: FC<PurchaseAgreementModalProps> = ({
  close,
  visible,
  navigateToPurchase,
}) => {
  const { data } = useSettingsList();
  const agreementMsg = data?.find((item) => item.key === "agreementMsg");

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
        <ScrollView className="max-h-[300px] ">
          <Text
            style={{ textAlign: "auto" }}
            className="text-[15px] text-gray-700"
            fontWeight="500"
          >
            {agreementMsg?.value || "الرجاء قراءة الشروط والأحكام"}
          </Text>
        </ScrollView>
        <View className="flex-row gap-2">
          <View className="flex-1">
            <TouchableOpacity
              onPress={navigateToPurchase}
              className="bg-primary w-full rounded-lg p-2 mt-4"
            >
              <Text className="text-center  text-[15px]" fontWeight="500">
                موافق
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity
              onPress={close}
              className="bg-gray-500 w-full rounded-lg p-2 mt-4"
            >
              <Text
                className="text-center text-gray-200  text-[15px]"
                fontWeight="500"
              >
                غير موافق
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PurchaseAgreementModal;
