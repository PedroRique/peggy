import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { StackTypes } from "../../App";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { BoldText } from "./Text/BoldText";
import { ModalMore } from "./ModalMore";




interface HeaderProps {
  title?: string | null;
  hasBack?: boolean;
  hasBorder?: boolean;
  hasMore?: boolean;
  onBack?: () => void;
  children?: any;
  color?: string;
}

export const Header = ({
  children,
  title,
  hasBack,
  hasBorder,
  hasMore,
  onBack,
  color,
}: HeaderProps) => {
  const navigation = useNavigation<StackTypes>();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const botoes: Botao[] = [
    {
      label: 'Editar Perfil',
      icon: 'edit',
      action: () => {
        toggleModal();
        navigation.navigate("EditProfile");
      },
    },
    {
      label: 'Logout',
      icon: 'log-out',
      action: () => {
        toggleModal();
        signOut(FIREBASE_AUTH);
      },
    },
  ];

  return (
    <View style={[styles.headerContainer, hasBorder && styles.hasBorderStyles]}>
      {hasBack && (
        <Pressable onPress={() => (onBack ? onBack() : navigation.goBack())}>
          <Feather name="arrow-left" size={32} color={color} />
        </Pressable>
      )}
      <BoldText style={[styles.title, { color }]}>{children || title}</BoldText>
      {hasMore && botoes && botoes.length > 0 && (
        <TouchableOpacity onPress={toggleModal}>
          <Feather
            name="more-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
      {hasMore && botoes && botoes.length > 0 && (
        <ModalMore
          botoes={botoes}
          modalVisible={modalVisible}
          toggleModal={toggleModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  hasBorderStyles: {
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: "RedHatDisplay",
  },

  rowContainer: {
    alignItems: "center",
  },

});
