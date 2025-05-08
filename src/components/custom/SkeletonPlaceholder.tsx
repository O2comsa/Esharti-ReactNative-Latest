import { View, Text, Dimensions } from "react-native";
import React, { ClassicComponentClass } from "react";
import { MotiView } from "moti";

const DEFAULT_WIDTH = Dimensions.get("screen").width;
const DEFAULT_HEIGHT = 100;

type SkeletonPlaceholderProps = {
  height?: number;
  width?: number;
  borderRadius?: number;
  shimmerColor?: string;
  backgroundColor?: string;
};

const SkeletonPlaceholder = ({
  height,
  width,
  borderRadius,
  backgroundColor,
  shimmerColor,
}: SkeletonPlaceholderProps) => {
  const initalTranslateX = width ? -width * 2 : -DEFAULT_WIDTH * 2;
  const finalTranslateX = width ? width * 2 : DEFAULT_WIDTH * 2;
  return (
    <View
      style={{
        height: height ? height : DEFAULT_HEIGHT,
        width: width ? width : "100%",
        borderRadius: borderRadius ? borderRadius : 10,
        backgroundColor: backgroundColor ? backgroundColor : "#f2f2f2",
      }}
      className={`relative overflow-hidden`}
    >
      <MotiView
        from={{ skewX: "30deg" }}
        animate={{ translateX: [initalTranslateX, finalTranslateX] }}
        transition={{ loop: true, type: "timing", duration: 800 }}
        className=" absolute top-0 bottom-0 h-full w-1/2 "
        style={{
          backgroundColor: shimmerColor
            ? shimmerColor
            : "rgba(255,255,255,0.3)",
        }}
      ></MotiView>
    </View>
  );
};

export default SkeletonPlaceholder;
