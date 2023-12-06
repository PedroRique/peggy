import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { StackTypes } from "../../App";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { ModalMore } from "./ModalMore";
import { BoldText } from "./Text/BoldText";
import { fetchCurrentUserData } from "../services/user.service";
import { userSlice } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";

export interface MenuAction {
  label: string;
  icon: string;
  action: () => void;
}

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

  const showModal = (ev: GestureResponderEvent) => {
    console.log(ev);
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  const dispatch = useDispatch();

  const getProfileInfo = () => {
    getUserData();
  };

  const getUserData = async () => {
    const result = await fetchCurrentUserData();
    dispatch(userSlice.actions.setUserData(result || null));
  };

  const botoes: MenuAction[] = [
    {
      label: "Editar Perfil",
      icon: "edit",
      action: () => {
        hideModal();
        navigation.navigate("EditProfile", {
          onAdd: () => getProfileInfo(),
        });
      },
    },
    {
      label: "Logout",
      icon: "log-out",
      action: () => {
        hideModal();
        signOut(FIREBASE_AUTH);
      },
    },
  ];

  return (
    <View style={[styles.headerContainer, hasBorder && styles.hasBorderStyles]}>
      {hasBack && (
        <Pressable onPress={() => (onBack ? onBack() : navigation.goBack())}>
          <FontAwesome5 name="arrow-left" size={32} color={color} />
        </Pressable>
      )}
      <BoldText style={[styles.title, { color }]}>{children || title}</BoldText>
      {hasMore && botoes && botoes.length > 0 && (
        <TouchableOpacity onPress={showModal}>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      )}
      {hasMore && botoes && botoes.length > 0 && (
        <Modal
          isVisible={modalVisible}
          onBackdropPress={hideModal}
          onDismiss={hideModal}
          style={styles.positionModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
        >
          <ModalMore botoes={botoes} />
        </Modal>
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
  positionModal: {
    position: "absolute",
    right: 20,
    top: 30,
  },
});

