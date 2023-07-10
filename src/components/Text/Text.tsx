import { Text as ReactText, TextProps } from "react-native";

export const Text = ({
  size = 16,
  weight = "600",
  children,
  style,
  ...rest
}: React.PropsWithChildren<
  TextProps & {
    size?: number;
    weight?:
      | "normal"
      | "bold"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
  }
>) => (
  <ReactText
    style={[
      { fontFamily: "RedHatDisplay", fontSize: size, fontWeight: weight },
      style,
    ]}
    {...rest}
  >
    {children}
  </ReactText>
);
