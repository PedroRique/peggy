import React from "react";
import { Text, TextProps } from "react-native";

export const BoldText = ({
  size = 16,
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps & { size?: number }>) => (
  <Text
    style={[{ fontWeight: "900", fontFamily: "RedHatDisplay", fontSize: size }, style]}
    {...rest}
  >
    {children}
  </Text>
);
