import React, { Ref, useCallback, useState } from "react";

import ResetPasswordForm from "./ResetPasswordForm";
import { BottomSheet, bottomSheetRef } from "../../bottomSheet";

type EditAccountBottomSheetProps = {
  bottomSheetRef: Ref<bottomSheetRef>;
};

const ResetPasswordBottomSheet: React.FC<EditAccountBottomSheetProps> = ({
  bottomSheetRef,
}) => {
  const [bottomSheetTitle, setBottomSheetTitle] = useState(
    "استعادة كلمة المرور"
  );
  const handleBottomSheetTitleChange = useCallback(
    (title: string) => {
      setBottomSheetTitle(title);
    },
    [bottomSheetTitle]
  );

  return (
    <BottomSheet bottomSheetRef={bottomSheetRef} headerTitle={bottomSheetTitle}>
      <ResetPasswordForm setBottomSheetTitle={handleBottomSheetTitleChange} />
    </BottomSheet>
  );
};

export default ResetPasswordBottomSheet;
