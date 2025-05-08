import { View } from "react-native";
import React, { FC } from "react";
import { Text } from "../../../components/custom/Text";

export type ViewProps = View["props"];

type BadgeProps = {
  title: string;
  borderRadius?: number;
  height?: number;
  fontSize?: number;
} & (outlineBadge | withIconBadge);

type outlineBadge = {
  variant: "outline";
  borderColor?: string;
  borderWidth?: number;
};
type withIconBadge = {
  variant: "withIcon";
  backgroundColor?: string;
  textColor?: string;
  IconStoke?: string;
  Icon: any;
};

const Badge = (props: BadgeProps) => {
  if (props.variant === "outline") {
    const { title, borderColor, borderRadius, borderWidth, height, fontSize } =
      props;
    return (
      <View
        style={{
          borderWidth: borderWidth ? borderWidth : 1,
          borderColor: borderColor ? borderColor : "#D1D1D1",
          borderRadius: borderRadius ? borderRadius : 20,
          height: height ? height : 24,
        }}
        className="h-[24px] px-2 justify-center items-center"
      >
        <Text
          fontWeight="500"
          style={{ fontSize: fontSize ? fontSize : 12, color: "#525252" }}
        >
          {title}
        </Text>
      </View>
    );
  }
  // badge variant is withIcon
  const { Icon, backgroundColor, textColor, title, borderRadius, IconStoke } =
    props;
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "black",
        borderRadius: borderRadius ? borderRadius : 20,
      }}
      className="h-[24px] flex-row justify-center items-center space-x-1 pl-1 pr-2"
    >
      <Icon stroke={IconStoke ? IconStoke : "#F5F5F5"} />
      <Text
        style={{ color: textColor ? textColor : "white", fontSize: 12 }}
        fontWeight="500"
      >
        {title}
      </Text>
    </View>
  );
};

export default Badge;
