import React, { Ref } from "react";
import EditAccountForm from "./EditAccountForm";
import {
  ArrowLeftWhiteIcon,
  ChatAltBlackIcon,
} from "../../../components/SvgIcons";
import { BottomSheet } from "../../bottomSheet";
import { useLocalSearchParams } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native";
import { View } from "../../../components/custom/View";
import { Text } from "../../../components/custom/Text";
import DeleteAccountModal from "./DeleteAccountModal";

type EditAccountBottomSheetProps = {
  bottomSheetRef: Ref<BottomSheetModal>;
  closeEditAccountBottomSheet: () => void;
  openSuccessModal: (message: string) => void;
};

const EditAccountBottomSheet: React.FC<EditAccountBottomSheetProps> = ({
  bottomSheetRef,
  openSuccessModal,
  closeEditAccountBottomSheet,
}) => {
  const { editProfileStatus } = useLocalSearchParams();
  const onModalHide = () => {
    if (editProfileStatus === "success") {
      openSuccessModal("تم تحديث المعلومات بنجاح");
    }
  };
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const handleDeleteAccountModalOpen = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteAccountModalClose = () => {
    setDeleteModalVisible(false);
  };

  return (
    <BottomSheet
      onModalHide={onModalHide}
      headerTitle="تعديل بيانات الحساب"
      headerIcon={<ChatAltBlackIcon />}
      bottomSheetRef={bottomSheetRef}
    >
      <EditAccountForm
        closeEditAccountBottomSheet={closeEditAccountBottomSheet}
      />

      <DeleteAccountModal
        visible={isDeleteModalVisible}
        closeEditAccountBottomSheet={closeEditAccountBottomSheet}
        close={handleDeleteAccountModalClose}
      />

      <TouchableOpacity
        onPress={handleDeleteAccountModalOpen}
        className=" bg-red-500 rounded-xl px-4 py-3 h-[59px] -mt-6 justify-center"
      >
        <Text className="text-wihte text-center text-[18px] text-[#F5F5F5]">
          حذف الحساب
        </Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};

export default EditAccountBottomSheet;
