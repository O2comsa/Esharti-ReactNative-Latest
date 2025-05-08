import { View } from "../../components/custom/View";
import Container from "../../components/Container";
import {
  AuthFormSwitcher,
  ResetPasswordBottomSheet,
  SignInForm,
  SignUpForm,
} from "../../features/authentication";

import { EshartiIcon } from "../../components/SvgIcons";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SuccessModal from "../../features/authentication/components/SuccessModal";
import { useGlobalSearchParams } from "expo-router";
import { useBottomSheet } from "../../features/bottomSheet";
export default function Auth() {
  const { bottomSheetRef, close, open } = useBottomSheet();

  const [currentForm, setCurrentForm] = useState<string>("signIn");
  const handleFormChange = useCallback(
    (form: "signIn" | "signUp") => [setCurrentForm(form)],
    [currentForm]
  );
  const { passwordChangedSuccessfully } = useGlobalSearchParams();
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  const handleClosingSuccessModal = useCallback(() => {
    setIsSuccessModalVisible(false);
  }, [isSuccessModalVisible]);
  useEffect(() => {
    if (passwordChangedSuccessfully !== undefined) {
      // close reset form bottom sheet
      close();
      // show success modal(password changed succsuflly)
      setIsSuccessModalVisible(true);
    }
  }, [passwordChangedSuccessfully]);

  return (
    <BottomSheetModalProvider>
      <Container
        showBottomTabs={false}
        topSafeAreaViewColor="#F5F5F5"
        bottomSafeAreaViewColor="#FFFBEF"
      >
        <ScrollView
          className="bg-[#FFFBEF] flex-1"
          automaticallyAdjustKeyboardInsets
        >
          <View className="items-center bg-[#F5F5F5] py-[35px]">
            <EshartiIcon />
          </View>
          <View className=" flex-1 p-[31px]">
            <AuthFormSwitcher
              currentForm={currentForm}
              handleFormChange={handleFormChange}
            />
            <View className="">
              {currentForm === "signIn" ? (
                <SignInForm openResetPasswordBottomSheet={open} />
              ) : (
                <SignUpForm />
              )}
            </View>
          </View>
        </ScrollView>
        <ResetPasswordBottomSheet bottomSheetRef={bottomSheetRef} />
        <SuccessModal
          message="تم تغيير كلمة المرور بنجاح!"
          visible={isSuccessModalVisible}
          close={handleClosingSuccessModal}
        />
      </Container>
    </BottomSheetModalProvider>
  );
}
