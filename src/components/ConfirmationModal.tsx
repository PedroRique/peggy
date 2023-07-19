import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Button from "./Button";
import { PColors } from '../shared/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ConfirmationModal = ({ visible, question, onConfirm, onCancel }: any) => {


  return (
    <Modal transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.buttonsContainer}>
            <View style={[styles.button, styles.cancelButton]}>
              <Button title='Cancelar' onPress={onCancel} invertedColors/>
            </View>
            <View style={[styles.button, styles.confirmButton]}>
            <Button onPress={onConfirm} title="Confirmar"/>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
//const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
//const handleDeleteConfirm = () => {
  // Lógica para executar a ação de exclusão após a confirmação.
  // Aqui você deve adicionar a lógica específica de exclusão para cada caso.
  //console.log('Exclusão confirmada! Executar ação de exclusão aqui.');
  //setIsConfirmationVisible(false); // Esconde a modal após a confirmação.
//};
//const handleDeleteCancel = () => {
//setIsConfirmationVisible(false); // Esconde a modal se o usuário cancelar a exclusão.
//};
//<TouchableOpacity onPress={() => setIsConfirmationVisible(true)}>
//</TouchableOpacity>
//<ConfirmationModal
//visible={isConfirmationVisible}
//question="Tem certeza que deseja excluir?"
//onConfirm={handleDeleteConfirm}
//onCancel={handleDeleteCancel}
///>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '80%',
  },
  question: {
    fontSize: 18,
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom:12,
  },
  cancelButton: {
    paddingLeft:16,
    
  },
  confirmButton: {
    paddingRight:16,

  },
  button: {
    flex: 1,
    paddingHorizontal: 3,
    borderRadius: 8,
  },
  buttonText: {
    color: PColors.White,
    fontSize: 16,
    
  },
});

export default ConfirmationModal;
