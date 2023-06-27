import { Text, TextProps } from "react-native";

export const BoldText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => (
  <Text style={[{ fontWeight: "bold" }, style]} {...rest}>
    {children}
  </Text>
);
