import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

interface Button {
  value: string;
  label: string;
}

interface SegmentedButtonProps {
  buttons: Button[];
}

const SegmentedButton: React.FC<SegmentedButtonProps> = ({ buttons }) => {
  const [value, setValue] = useState('');

  const onButtonPress = (buttonValue: string) => {
    setValue(buttonValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={onButtonPress}
        buttons={buttons.map((button) => ({
          value: button.value,
          label: button.label,
        }))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'blue', // Cor de fundo para o botão selecionado
    borderColor: 'blue', // Cor da borda do botão selecionado (opcional)
  },
});

export default SegmentedButton;
