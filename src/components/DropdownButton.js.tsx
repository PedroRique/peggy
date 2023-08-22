import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from 'react-native-modal';
import { Text } from "./Text/Text";
import BottomSheetContent from "./BottomSheetContent.js";
import { BoldText } from "./Text/BoldText";
import { PColors } from "../shared/Colors";

interface Option {
  label: string;
  onPress: () => void;
}

interface DropdownButtonProps {
  label?: string;
  containerStyle?: ViewStyle;
  options: Option[];
  multiSelect?: boolean;
  searchable?: boolean;
  placeholder?: string;
  editable?: boolean;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  containerStyle,
  options,
  multiSelect = false,
  searchable = false,
  editable= true,
  placeholder = "Selecionar opção(s)",
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const handleOptionPress = (selectedOption: Option) => {
    if (multiSelect) {
      const isSelected = selectedOptions.some(option => option.label === selectedOption.label);
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter(option => option.label !== selectedOption.label));
      } else {
        setSelectedOptions([...selectedOptions, selectedOption]);
      }
    } else {
      setSelectedOptions([selectedOption]);
      selectedOption.onPress();
      if (!multiSelect) {
        toggleBottomSheet();
      }
    }
  };
  const placeholderColor = selectedOptions.length > 0 ? PColors.Black : PColors.Grey; 
  const selectedTextColor = PColors.Black;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <BoldText style={styles.label}>{label}</BoldText>}
      <TouchableOpacity
        style={[
          styles.input,
          multiSelect && styles.inputWithIcon,

        ]}
        onPress={editable ? toggleBottomSheet : undefined} 
      >
        <Text style={[styles.selectedOptionsText, { color: placeholderColor }]}>
          {multiSelect && selectedOptions.length > 0
            ? selectedOptions.map(option => option.label).join(", ")
            : selectedOptions.length > 0
            ? selectedOptions[0].label
            : placeholder}
        </Text>
        <Feather name="chevron-down" size={20} style={styles.icon} />
      </TouchableOpacity>
      <Modal isVisible={isBottomSheetVisible} onBackdropPress={toggleBottomSheet}>
        <BottomSheetContent
          onClose={toggleBottomSheet}
          options={options}
          onSelect={handleOptionPress}
          selectedOptions={selectedOptions}
          searchable={searchable}
          title={label || ""} 
          onApply={[]}        
          />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  inputWithIcon: {
    paddingRight: 48,
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
    fontSize: 16,
  },
  selectedOptionsText: {
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: 16,
    right: 16,
    marginLeft: 48,
  },
});

export default DropdownButton;
