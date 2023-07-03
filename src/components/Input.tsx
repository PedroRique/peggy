import {
  TextInput as ReactTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

export const TextInput = ({
  style,
  ...rest
}: React.PropsWithChildren<TextInputProps>) => (
  <ReactTextInput style={[styles.input, style]} {...rest}></ReactTextInput>
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 32,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});
