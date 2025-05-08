import { View } from "react-native";

import { FC, useCallback, useEffect, useState } from "react";
import OtpCheckForm from "./OtpCheckForm";
import SendPasswordReminderForm from "./SendPasswordReminderForm";

import ChangePasswordForm from "./ChangePasswordForm";

type resetPasswordForm = {
  setBottomSheetTitle: (title: string) => void;
};

const ResetPasswordForm: FC<resetPasswordForm> = ({ setBottomSheetTitle }) => {
  const [activeForm, setActiveForm] = useState<
    "reminder" | "otp" | "changePassword"
  >("reminder");

  useEffect(() => {
    setBottomSheetTitle("استعادة كلمة المرور");
  }, []);

  useEffect(() => {
    if (activeForm === "changePassword") {
      setBottomSheetTitle("ادخل كلمة المرور الجديدة");
    }
  }, [activeForm]);

  const handleActiveFormChange = useCallback(
    (form: "reminder" | "otp" | "changePassword") => {
      setActiveForm(form);
    },
    [activeForm]
  );
  return (
    <View className="">
      <View>
        {activeForm === "reminder" && (
          <SendPasswordReminderForm
            handleActiveFormChange={handleActiveFormChange}
          />
        )}
        {activeForm === "otp" && (
          <OtpCheckForm handleActiveFormChange={handleActiveFormChange} />
        )}
        {activeForm === "changePassword" && <ChangePasswordForm />}
      </View>
    </View>
  );
};

export default ResetPasswordForm;
