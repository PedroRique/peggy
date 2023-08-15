import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type BottomSheetContentProps = {
  onClose: () => void;
};

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <TouchableOpacity onPress={onClose}>
        <Text>Fechar</Text>
      </TouchableOpacity>
      {/* Adicione outras opções ou conteúdo aqui */}
    </View>
  );
};

export default BottomSheetContent;
