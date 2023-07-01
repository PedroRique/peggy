import { StyleSheet, TextProps, View } from "react-native";
import { BoldText } from "./BoldText";

export const Chip = ({
  children,
  ...rest
}: React.PropsWithChildren<TextProps>) => {
  return (
    <View style={styles.chipContainer} {...rest}>
      <BoldText style={styles.chipText}>{children}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 7,
  },
  chipText: {
    color: "#444444",
  },
});
