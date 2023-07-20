import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Botao {
  label: string;
  icon: "edit" | "log-out" | "user" | "settings";
  action: () => void;
}

interface ModalMoreProps {
  botoes: Botao[];
  modalVisible: boolean;
  toggleModal: () => void;
}

export const ModalMore = ({ botoes, modalVisible, toggleModal }: ModalMoreProps) => {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={toggleModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalInner}>
            {botoes.map((botao, index) => (
              <TouchableOpacity key={index} onPress={() => {
                toggleModal();
                botao.action();
              }}>
                <View style={styles.optionsButton}>
                  <Feather name={botao.icon} size={24} color="black" />
                  <Text>{botao.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalInner: {
    display: "flex",
    gap: 12,
  },
  optionsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
