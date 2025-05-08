import { TextInput } from "react-native";
import { Controller } from "react-hook-form";

import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";
type ControllerInputProps = {
  control: any;
  keyboardType?: "default" | "numeric" | "email-address";
  name: any;
  secureTextEntry?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  allowWhiteSpace?: boolean;
  maxCharacters?: number | undefined;
};

const ControllerInput: FC<ControllerInputProps> = ({
  control,
  name,
  secureTextEntry = false,
  placeholder,
  placeholderTextColor = "gray",
  allowWhiteSpace = false,
  keyboardType = "default",
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
          <TextInput
            value={value}
            onChangeText={(text) =>
              onChange(allowWhiteSpace ? text : text.replace(/\s/g, ""))
            }
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxCharacters}
            style={{
              borderWidth: 1,
              borderColor: error ? "red" : "#B3B3B3",
              borderRadius: 6,
              padding: 12,
              writingDirection: "rtl",
              direction: "rtl",
              textAlign: "right",
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
          />
          {error && <Text className="text-red-500">{error.message}</Text>}
        </>
      )}
    />
  );
};

export default ControllerInput;
