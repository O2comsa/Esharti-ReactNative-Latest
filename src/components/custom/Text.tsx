import { Text as DefaultText } from "react-native";

export type DefaultTextProps = DefaultText["props"];

interface TextProps extends DefaultTextProps {
  fontWeight?: "400" | "500" | "600";
}

export function Text(props: TextProps) {
  const { fontWeight, style, ...otherProps } = props;
  return (
    <DefaultText
      style={[
        {
          fontFamily: `IBMPlexSansArabic${fontWeight ? fontWeight : "600"}`,
          writingDirection: "rtl",
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
