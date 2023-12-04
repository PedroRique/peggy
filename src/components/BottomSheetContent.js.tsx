import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { PColors } from '../shared/Colors';
import { Feather } from '@expo/vector-icons';
import CustomTextInput from './CustomTextInput';
import Button from './Button';

interface Option {
  label: string;
  onPress: () => void;
}

interface BottomSheetContentProps {
  onClose: () => void;
  options: Option[]; 
  onSelect: (option: Option) => void;
  selectedOptions: Option[];
  searchable?: boolean;
  title: string;
  onApply: string[];
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose, options, onSelect, selectedOptions, searchable = false, title, onApply }) => {
  const [searchText, setSearchText] = useState('');

  const handleOptionPress = (selectedOption: Option) => {
    onSelect(selectedOption);
  };

  const handleApplyButtonPress = () => {
    onClose();
  };

  const handleCustomTextInputApply = () => {
    if (searchText !== '') {
      const newOption: Option = { label: searchText, onPress: () => {} };
      onSelect(newOption);
    }
  };

  const filteredOptions = searchable
    ? options.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase()))
    : options;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={30} color={PColors.Black} />
        </TouchableOpacity>
      </View>
      {searchable && (
        <View style={styles.searchContainer}>
          <CustomTextInput
            placeholder="Buscar"
            value={searchText}
            onChangeText={setSearchText}
            onApply={handleCustomTextInputApply} 
          />
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(option)}
            style={[
              styles.optionButton,
              selectedOptions.some(selectedOption => selectedOption.label === option.label) && styles.selectedOptionButton,
            ]}
          >
            <View style={styles.optionLine} />
            <Text style={styles.optionText}>{option.label}</Text>
            {selectedOptions.some(selectedOption => selectedOption.label === option.label) && (
              <Feather name="check" size={24} color={PColors.Orange} style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedOptions && (
        <View style={styles.footer}>
          <Button onPress={handleApplyButtonPress} title='Aplicar' />
      </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: -20.7, 
    left: -20.7,
    right: -20.7, 
    maxHeight: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:16,
    paddingVertical:26,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: PColors.Black,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  optionButton: {
    flexDirection: 'row', 
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 0,
    
  },
  selectedOptionButton: {
    alignItems: 'center',
  },
  optionLine: {
    height: 0.2, 
    width: '80%', 
    backgroundColor: PColors.LightGrey,
    position: 'absolute',
    top: '100%', 
  },
  optionText: {
    fontSize: 24,
    color: PColors.Black,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  searchContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems:'center',
    
  },
  searchInput: {
    width: '90%'
  },
  applyButton: {
    backgroundColor: PColors.Orange,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    padding: 16,
  },
});

export default BottomSheetContent;
