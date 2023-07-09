import { Text as ReactText, TextProps } from "react-native";

export const Text = ({
  size = 16,
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps & { size?: number }>) => (
  <ReactText
    style={[{ fontFamily: "RedHatDisplay", fontSize: size }, style]}
    {...rest}
  >
    {children}
  </ReactText>
);
