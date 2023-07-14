import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Text/Text";
import { PColors } from "../shared/Colors";

export interface ButtonProps {
  onPress: () => void;
  title: string;
  outlined?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = "Save", outlined } = props;
  return (
    <TouchableOpacity
      style={[styles.button, outlined && styles.outlinedButton]}
      onPress={onPress}
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
    flex: 1,
  },
  outlinedButton: {
    backgroundColor: PColors.White,
    borderColor: PColors.Blue,
    borderWidth: 1,
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
