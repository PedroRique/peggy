import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";
import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";

export const TextInput = ({
  style,
  containerStyle,
  value,
  multiline,
  label,
  showEyeIcon = false,
  ...rest
}: React.PropsWithChildren<
  MaskInputProps & {
    label?: string;
    showEyeIcon?: boolean;
    containerStyle?: ViewStyle;
  }
>) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevValue) => !prevValue);
  };

  return (
    <View style={containerStyle}>
      {label && <BoldText style={styles.label}>{label}</BoldText>}
      <View>
        <MaskInput
          value={value}
          multiline={multiline}
          placeholderTextColor={PColors.Grey}
          secureTextEntry={showEyeIcon ? secureTextEntry : false}
          style={[styles.input, showEyeIcon && styles.inputWithIcon, style]}
          {...rest}
        />
        {showEyeIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={toggleSecureTextEntry}
          >
            <Feather
              name={secureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {multiline && <Text style={styles.textLength}>{value?.length}/100</Text>}
    </View>
  );
};

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
  inputWithIcon: {
    paddingRight: 48,
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
  iconContainer: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  icon: {
    opacity: 0.6,
  },
});
