import { View, Text, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";
import { MotiView, useDynamicAnimation } from "moti";
type Props = {
  currentForm: string;
  handleFormChange: (form: "signIn" | "signUp") => void;
};

const AuthFormSwitcher: FC<Props> = ({ currentForm, handleFormChange }) => {
  const [viewWidth, setViewWidth] = useState(0);

  const state = useDynamicAnimation(() => ({
    translateX: 0,
  }));
  const handleLayout = (event: any) => {
    setViewWidth(event.nativeEvent.layout.width);
  };
  return (
    <View className="flex-row justify-center ">
      <View
        onLayout={handleLayout}
        className="flex-row items-center bg-neutral-200 rounded-lg relative"
      >
        <MotiView
          state={state}
          transition={{ type: "timing", duration: 500 }}
          className="bg-[#FEC432] absolute z-10  h-[57px] w-[50%] rounded-lg"
        />
        <TouchableOpacity
          onPress={() => {
            currentForm !== "signIn" && handleFormChange("signIn");
            state.animateTo({ translateX: 0 });
          }}
          className="py-4 px-[18px] z-20"
        >
          <Text
            className={`text-[20px]  ${
              currentForm === "signIn" ? "text-[#040404]" : "text-[#525252]"
            }`}
          >
            تسجيل دخول
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            currentForm !== "signUp" && handleFormChange("signUp");
            state.animateTo({ translateX: -viewWidth / 2 });
          }}
          className="  py-4 px-[18px] z-20"
        >
          <Text
            className={`text-[20px]  ${
              currentForm === "signUp" ? "text-[#040404]" : "text-[#525252]"
            }`}
          >
            حساب جديد
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthFormSwitcher;
