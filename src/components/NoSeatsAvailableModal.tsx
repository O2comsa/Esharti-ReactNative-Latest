import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { View } from "./custom/View";
import { Text } from "./custom/Text";
import { CloseIcon } from "./SvgIcons";

interface NoSeatsAvailableModalProps {
  visible: boolean;
  onClose: () => void;
}

const NoSeatsAvailableModal = ({
  visible,
  onClose,
}: NoSeatsAvailableModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-xl mx-6 p-6 w-[90%]">
          <View className="justify-center items-center mb-4">
            <Text className="text-[20px] text-center" fontWeight="600">
              عذراً، لا يوجد مقعد متاح
            </Text>
          </View>

          <Text className="text-[16px] text-[#525252] mb-6 text-center">
            فضلاً فعل الإشعارات للدورات القادمة
          </Text>

          <TouchableOpacity
            onPress={onClose}
            className="bg-primary py-3 rounded-xl"
          >
            <Text
              className="text-[#000] font-bold text-center text-[16px]"
              fontWeight="500"
            >
              العودة
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NoSeatsAvailableModal;
