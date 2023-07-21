import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MenuAction } from "./Header";

interface ModalMoreProps {
  botoes: MenuAction[];
}

export const ModalMore = ({ botoes }: ModalMoreProps) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalInner}>
        {botoes.map((botao, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              botao.action();
            }}
          >
            <View style={styles.optionsButton}>
              <Feather name={botao.icon as any} size={24} color="black" />
              <Text>{botao.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
