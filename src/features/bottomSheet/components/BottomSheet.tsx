import { TouchableOpacity } from "react-native";
import React, { FC, ReactElement, ReactNode, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../../../components/custom/Text";
import { CloseIcon } from "../../../components/SvgIcons";
import { View } from "../../../components/custom/View";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

type BottomSheetProps = {
  bottomSheetRef: any;
  children: ReactNode;
  headerTitle: string;
  headerIcon?: ReactElement;
  enableHeaderBottomBorder?: boolean;
  closeable?: boolean;
  onModalHide?: () => void;
};

const BottomSheet: FC<BottomSheetProps> = ({
  children,
  headerTitle,
  headerIcon,
  onModalHide,
  enableHeaderBottomBorder = true,
  bottomSheetRef,
  closeable = true,
}) => {
  const { top, bottom } = useSafeAreaInsets();

  const closeBottomSheet = useCallback(() => {
    if (closeable) {
      bottomSheetRef?.current?.close();
    }
  }, [closeable]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={closeable ? "close" : "none"}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      enableDynamicSizing
      index={0}
      topInset={top}
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={closeable}
      style={{ direction: "rtl" }}
      android_keyboardInputMode="adjustPan"
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleComponent={() => (
        <View
          className={`p-[20px] flex-row items-center justify-between  ${
            enableHeaderBottomBorder && "border-b border-[#F3F3F3]"
          }`}
        >
          <View className="flex-row items-center gap-x-[10px]">
            {headerIcon && headerIcon}
            <Text className="text-[18px] text-[#222]" fontWeight="500">
              {headerTitle}
            </Text>
          </View>
          <TouchableOpacity onPress={closeBottomSheet}>
            <CloseIcon width={18} height={20} />
          </TouchableOpacity>
        </View>
      )}
      onDismiss={onModalHide}
    >
      {/**** Header ****/}

      <BottomSheetScrollView contentContainerStyle={{ padding: 22 }}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
export default BottomSheet;
