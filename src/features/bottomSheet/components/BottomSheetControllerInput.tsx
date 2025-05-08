import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Text } from "../../../components/custom/Text";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type ControllerInputProps = {
  keyboardType?: "default" | "numeric" | "email-address";
  control: any;
  name: any;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  multiline?: boolean;
  numberOfLines?: number;
  allowWhiteSpace?: boolean;
  maxCharacters?: number | undefined;
};

const BottomSheetControllerInput: FC<ControllerInputProps> = ({
  control,
  name,
  secureTextEntry = false,
  placeholder,
  placeholderTextColor = "gray",
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  allowWhiteSpace = false,
  maxCharacters = undefined,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <BottomSheetTextInput
            value={value}
            onChangeText={(text) => {
              onChange(allowWhiteSpace ? text : text.replace(/\s/g, ""));
            }}
            autoCapitalize="none"
            onBlur={onBlur}
            maxLength={maxCharacters}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            className={`border px-3 border-[#E5E5E5] rounded-[6px] py-2 text-right h-[43px] ${
              error && "border-red-500"
            }`}
            style={{
              writingDirection: "rtl",
              textAlign: "right",
              borderWidth: 1,
              borderColor: error ? "red" : "#E5E5E5",
              borderRadius: 6,
              padding: 12,
              height: multiline ? 233 : 50,
            }}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
          />
          {error && <Text className="text-red-500">{error.message}</Text>}
        </>
      )}
    />
  );
};

export default BottomSheetControllerInput;
