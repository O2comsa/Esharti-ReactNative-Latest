import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

export default function useBottomSheet() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const close = useCallback(() => {
    bottomSheetRef?.current?.close();
  }, []);
  return { bottomSheetRef, open, close };
}
