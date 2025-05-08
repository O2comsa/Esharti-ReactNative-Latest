import Container from "../../components/Container";
import { ScrollView, TouchableOpacity } from "react-native";
import { View } from "../../components/custom/View";
import { Text } from "../../components/custom/Text";

import {
  ContactUsBottomSheet,
  EditAccountBottomSheet,
  LinksList,
  ProfileCard,
  SocialLinks,
} from "../../features/account";
import { useBottomSheet } from "../../features/bottomSheet";
import { AcademicCapIcon, UserIcon } from "../../components/SvgIcons";
import { router } from "expo-router";
import SuccessModal from "../../features/authentication/components/SuccessModal";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
export default function Account() {
  const { session } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const closeModal = () => {
    setIsModalVisible(false);
    setMessage("");
    router.setParams({ contactUsStatus: "", editProfileStatus: "" });
  };

  const openSuccessModal = (message: string) => {
    setIsModalVisible(true);
    setMessage(message);
  };
  const {
    open: openEditAccount,
    bottomSheetRef: EditAccountBottomSheetRef,
    close: closeEditAccount,
  } = useBottomSheet();
  const {
    open: openContactUs,
    bottomSheetRef: ContactUsBottomSheetRef,
    close: closeContactUs,
  } = useBottomSheet();

  return (
    <>
      <Container>
        <View className="h-[91px] bg-white px-[22] py-[28px]">
          <View className="flex-row items-center gap-x-[9px]">
            <UserIcon
              height={29}
              width={29}
              strokeWidth={1.8}
              stroke={"#040404"}
            />
            <Text className="text-[22px]">حسابي</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-5 flex-1 space-y-[16px] h-full bg-[#F5F5F5]">
            {session?.authenticated && (
              <>
                <ProfileCard openEditAccountBottomSheet={openEditAccount} />
                <TouchableOpacity
                  onPress={() => router.push("/certificates")}
                  className="bg-primary rounded-xl mt-[16px] py-[14px] px-[32px] flex-row items-center justify-center space-x-[9px] "
                >
                  <AcademicCapIcon
                    stroke={"white"}
                    strokeWidth={1.5}
                    height={28}
                    width={28}
                  />
                  <Text className="text-white text-[18px] ">شهاداتي</Text>
                </TouchableOpacity>
              </>
            )}
            <View>
              <LinksList openContactUsBottomSheet={openContactUs} />
            </View>
            <SocialLinks />
          </View>
        </ScrollView>
      </Container>
      {isModalVisible && (
        <SuccessModal
          key={"successModal"}
          visible={isModalVisible}
          message={message}
          close={closeModal}
        />
      )}
      <EditAccountBottomSheet
        closeEditAccountBottomSheet={closeEditAccount}
        openSuccessModal={openSuccessModal}
        bottomSheetRef={EditAccountBottomSheetRef}
      />
      <ContactUsBottomSheet
        bottomSheetRef={ContactUsBottomSheetRef}
        openSuccessModal={openSuccessModal}
        closeContactUs={closeContactUs}
      />
    </>
  );
}
