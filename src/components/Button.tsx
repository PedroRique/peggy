import { StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { PColors } from "../shared/Colors";
import { Text } from "./Text/Text";

export interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  outlined?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  onPress,
  title = "Save",
  loadingText = "Enviando",
  outlined,
  disabled = false,
  loading,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined && styles.outlinedButton,
        disabled && styles.disabledButton,
      ]}
      onPress={() => (disabled ? null : onPress())}
    >
      <Text style={[styles.text, outlined && styles.outlinedText]}>
        {loading ? loadingText : title}
      </Text>

      {loading && <ActivityIndicator color={PColors.White} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 12,
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
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: PColors.White,
  },
  outlinedText: {
    color: PColors.Blue,
  },
});
