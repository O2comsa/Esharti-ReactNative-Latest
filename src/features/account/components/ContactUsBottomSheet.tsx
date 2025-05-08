import React, { Ref } from "react";
import ContactUsForm from "./ContactUsForm";
import { BottomSheet, bottomSheetRef } from "../../bottomSheet";
import { ChatAltBlackIcon } from "../../../components/SvgIcons";
import { useLocalSearchParams } from "expo-router";

type ContactUsBottomSheetProps = {
  bottomSheetRef: Ref<bottomSheetRef>;
  closeContactUs: () => void;
  openSuccessModal: (message: string) => void;
};

const ContactUsBottomSheet: React.FC<ContactUsBottomSheetProps> = ({
  bottomSheetRef,
  closeContactUs,
  openSuccessModal,
}) => {
  const { contactUsStatus } = useLocalSearchParams();
  const onModalHide = () => {
    if (contactUsStatus === "success") {
      openSuccessModal(
        "شكرا لتواصلك معنا سيقوم فريقنا بالرد عليك باقرب وقت ممكن"
      );
    }
  };
  return (
    <BottomSheet
      onModalHide={onModalHide}
      bottomSheetRef={bottomSheetRef}
      headerTitle="تواصل معنا"
      headerIcon={<ChatAltBlackIcon />}
    >
      <ContactUsForm closeContactUsBottomSheet={closeContactUs} />
    </BottomSheet>
  );
};

export default ContactUsBottomSheet;
