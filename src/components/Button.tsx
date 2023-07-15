import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Text/Text";
import { PColors } from "../shared/Colors";

export interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  outlined?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = "Save", outlined, disabled = false } = props;
  return (
    <TouchableOpacity
      style={[styles.button, outlined && styles.outlinedButton, disabled && styles.disabledButton]}
      onPress={() => disabled ? null : onPress()}
    >
      <Text style={[styles.text, outlined && styles.outlinedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: PColors.Blue,
  },
  outlinedButton: {
    backgroundColor: PColors.White,
    borderColor: PColors.Blue,
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: PColors.White,
  },
  outlinedText: {
    color: PColors.Blue,
  },
});
