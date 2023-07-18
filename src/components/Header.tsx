import { View, StyleSheet, Pressable, TouchableOpacity, Modal, Text } from "react-native";
import { BoldText } from "./Text/BoldText";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

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

  return (
    <View style={[styles.headerContainer, hasBorder && styles.hasBorderStyles]}>
      {hasBack && (
        <Pressable onPress={() => (onBack ? onBack() : navigation.goBack())}>
          <FontAwesome5 name="arrow-left" size={32} color={color} />
        </Pressable>
      )}
      <BoldText style={[styles.title, { color }]}>{children || title}</BoldText>
      {hasMore && (
        <TouchableOpacity onPress={toggleModal}>
          <Feather name="more-vertical" size={24} color="black" style={styles.more} />
        </TouchableOpacity>
      )}
      {hasMore && (
        <Modal visible={modalVisible} transparent>
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={toggleModal}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalInner}>
                <TouchableOpacity  
                onPress={() => {
                navigation.navigate("EditProfileScreen");
          }}>
                <View style={styles.optionsButton}>
                  <Feather name="edit" size={24} color="black" />
                  <Text>Editar perfil</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionsButton}
                  onPress={() => {
                    toggleModal(); 
                    signOut(FIREBASE_AUTH);
                  }}
                >
                  <Feather name="log-out" size={24} color="black" />
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
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
  more: {},
  rowContainer: {
    
    alignItems: "center",

  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position:"absolute",
    right:24,
    top:56,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  modalInner:{
    display:"flex",
    gap:12,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionsButton:{
    flexDirection:"row",
    alignItems:"center",
    gap:12,

    
  },
});
