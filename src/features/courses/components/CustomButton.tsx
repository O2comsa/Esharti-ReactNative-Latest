import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "../../../components/custom/Text";
import SmallArrowLeftIcon from "../../../assets/icons/SmallArrowLeftIcon.svg";

export type defaultButtonProps = TouchableOpacity["props"];

type buttonProps = {
  subscribed?: boolean;
  showLeftArrowIcon?: boolean;
  title?: string;
  size: "medium" | "large";
} & defaultButtonProps;

const CustomButton = ({
  subscribed = false,
  showLeftArrowIcon,
  title,
  className,
  size = "medium",
  ...restProps
}: buttonProps) => {
  const buttonClasses = showLeftArrowIcon
    ? " flex-row items-center gap-x-1"
    : "";

  const textClasses =
    size === "medium" ? "text-[10px] text-[#040404]" : "text-[16px]";
  return (
    <TouchableOpacity
      className={`${buttonClasses} rounded-lg px-[12px] bg-[#] py-[6px] ${
        subscribed ? "bg-primary" : "bg-[#F5F5F5]"
      }`}
      {...restProps}
    >
      <Text
        className={textClasses}
        fontWeight={size === "medium" ? "600" : "500"}
      >
        {subscribed ? "شاهد الآن" : "اشترك الآن"}
      </Text>
      {showLeftArrowIcon && <SmallArrowLeftIcon />}
    </TouchableOpacity>
  );
};

export default CustomButton;
