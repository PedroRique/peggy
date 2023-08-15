import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";

interface DropdownButtonProps {
  label?: string;
  containerStyle?: ViewStyle;
  onPress: () => void;
  showArrowDownIcon?: boolean;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  containerStyle,
  onPress,
  showArrowDownIcon = false,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <BoldText style={styles.label}>{label}</BoldText>}
      <TouchableOpacity style={styles.input} onPress={onPress}>
        <Text>Selecionar opção</Text>
        {showArrowDownIcon && (
          <Feather
            name="arrow-down"
            size={24}
            color="gray"
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    marginBottom: 4,
  },
  icon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default DropdownButton;
