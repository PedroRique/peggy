import React, { useState } from "react";
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
  invertedColors?: boolean;
}

export default function Button({
  onPress,
  title = "Save",
  loadingText = "Enviando",
  outlined,
  disabled = false,
  loading,
  invertedColors = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.defaultButton,
        styles.button,
        outlined && styles.outlinedButton,
        disabled && styles.disabledButton,
        invertedColors && styles.invertedButton,
      ]}
      onPress={() => (disabled ? null : onPress())}
    >
      <Text
        style={[
          styles.text,
          outlined && styles.outlinedText,
          invertedColors && styles.invertedText,
        ]}
      >
        {loading ? loadingText : title}
      </Text>

      {loading && <ActivityIndicator color={PColors.White} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    height: 48
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
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
  invertedButton: {
    backgroundColor: PColors.White,
    borderColor: PColors.Blue,
    borderWidth: 2,
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
  invertedText: {
    color: PColors.Blue,
  },
});
