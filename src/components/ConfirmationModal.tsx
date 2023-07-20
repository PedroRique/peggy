import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Button from "./Button";
import { PColors } from '../shared/Colors';

const ConfirmationModal = ({ visible, question, onConfirm, onCancel }: any) => {


  return (
    <Modal transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.buttonsContainer}>
            <View style={[styles.button, styles.cancelButton]}>
              <Button title='Cancelar' onPress={onCancel} outlined/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PColors.Transparent,
  },
  modal: {
    backgroundColor: PColors.White,
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
