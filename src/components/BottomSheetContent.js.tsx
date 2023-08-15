import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { PColors } from '../shared/Colors';
import { TextInput } from './Input';

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
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose, options, onSelect, selectedOptions, searchable = false }) => {
  const [searchText, setSearchText] = useState('');

  const handleOptionPress = (selectedOption: Option) => {
    onSelect(selectedOption);
  };

  const filteredOptions = searchable
    ? options.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase()))
    : options;

  return (
    <View style={styles.container}>
      {searchable && (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Pesquisar..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: '-20.7px',
    left: '-20.7px',
    right: '-20.7px',
    maxHeight: '300px',
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  optionButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    textAlign:'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  selectedOptionButton: {
    backgroundColor: PColors.LightGrey,
    alignItems: 'center',
  },
  optionLine: {
    height: 0.2, 
    width: '80%', 
    backgroundColor: 'gray', 
    position: 'absolute',
    top: '0%', 
  },
  optionText: {
    fontSize: 16,
    alignItems: 'center',
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
  },
});

export default BottomSheetContent;
