import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

export default function useBottomSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const close = useCallback(() => {
    bottomSheetModalRef?.current?.close();
  }, []);
  return { bottomSheetModalRef, open, close };
}
