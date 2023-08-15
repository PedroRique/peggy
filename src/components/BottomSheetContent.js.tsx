import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface BottomSheetContentProps {
  onClose: () => void;
  options: { label: string; onPress: () => void }[]; // Alteramos o tipo das opções
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose, options }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              option.onPress();
              onClose();
            }}
            style={styles.optionButton}
          >
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
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '300px', // Define uma altura máxima para a modal
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 0, // Espaço no final da lista
  },
  optionButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
});

export default BottomSheetContent;
