import { Pressable, StyleSheet } from "react-native";
import { Text } from "./Text/Text";
import { Colors } from "../shared/Colors";

export interface ButtonProps {
  onPress: () => void;
  title: string;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
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
    width: '100%',
    backgroundColor: Colors.Blue,
  },
  text: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
