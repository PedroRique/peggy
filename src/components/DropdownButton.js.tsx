import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from 'react-native-modal';

import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";
import BottomSheetContent from "./BottomSheetContent.js";

interface DropdownButtonProps {
  label?: string;
  containerStyle?: ViewStyle;
  options: { label: string; onPress: () => void }[]
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  containerStyle,
  options, 
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <BoldText style={styles.label}>{label}</BoldText>}
      <TouchableOpacity style={styles.input} onPress={toggleBottomSheet}>
        <Text>Selecionar opção</Text>
        <Feather name="chevron-down" size={20} style={styles.icon} />
      </TouchableOpacity>
      <Modal isVisible={isBottomSheetVisible} onBackdropPress={toggleBottomSheet}>
        <BottomSheetContent onClose={toggleBottomSheet} options={options} />
      </Modal>
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
    right: 16
  },
});

export default DropdownButton;
