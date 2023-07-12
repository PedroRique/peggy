import {
  TextInput as ReactTextInput,
  TextInputProps,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "./Text/Text";
import { BoldText } from "./Text/BoldText";
import { Colors } from "../shared/Colors";

export const TextInput = ({
  style,
  value,
  multiline,
  label,
  ...rest
}: React.PropsWithChildren<TextInputProps & { label?: string }>) => (
  <View>
    {label && <BoldText style={styles.label}>{label}</BoldText>}
    <ReactTextInput
      value={value}
      multiline={multiline}
      style={[styles.input, style]}
      {...rest}
    ></ReactTextInput>
    {multiline && <Text style={styles.textLength}>{value?.length}/100</Text>}
  </View>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 32,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  textLength: {
    fontSize: 12,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  label: {
    marginBottom: 4,
  },
});
