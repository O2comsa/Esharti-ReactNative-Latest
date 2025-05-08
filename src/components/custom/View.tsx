import { View as DefaultView } from "react-native";

export type ViewProps = DefaultView["props"];

const shadowVariants = {
  default: {},
  small: {
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOpacity: 1,
  },
  medium: {
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 40,
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowOpacity: 1,
  },
};

interface ViewComponentProps extends ViewProps {
  shadowVariant?: "default" | "small" | "medium"; // Making shadowVariant optional
}

export function View({
  style,
  shadowVariant,
  ...otherProps
}: ViewComponentProps): JSX.Element {
  const shadowStyle = shadowVariant ? shadowVariants[shadowVariant] : {};

  return <DefaultView style={[shadowStyle, style]} {...otherProps} />;
}
