import { Text as ReactText, TextProps } from "react-native";

export const Text = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => (
  <ReactText
    style={[{ fontFamily: "RedHatDisplay" }, style]}
    {...rest}
  >
    {children}
  </ReactText>
);
