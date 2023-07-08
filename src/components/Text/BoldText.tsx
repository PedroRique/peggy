import { Text, TextProps } from "react-native";

export const BoldText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => (
  <Text
    style={[{ fontWeight: "900", fontFamily: "RedHatDisplay" }, style]}
    {...rest}
  >
    {children}
  </Text>
);
