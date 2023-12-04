// ForgotScreen.js

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { StackTypes } from "../../App";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { sendPasswordResetEmail } from "firebase/auth";
import { PColors } from "../shared/Colors";
import { userSlice } from "../store/slices/user.slice";
import { sendPasswordReset } from "../services/user.service";
import { FontAwesome5 } from "@expo/vector-icons";
import ConfirmationModal from "../components/ConfirmationModal"; // Certifique-se de fornecer o caminho correto

const Login = require("../../assets/images/Logo/peggy-logo.png");

export default function ForgotScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const [email, setEmail] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      console.log("Por favor, insira seu e-mail");
      return;
    }

    setModalVisible(true); // Exibe o modal de confirmação
  };

  const sendPasswordResetAndCloseModal = async () => {
    try {
      await sendPasswordReset(email);
      console.log("E-mail de recuperação de senha enviado com sucesso!");
      setModalVisible(false); 
      navigation.goBack(); 
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={32} color={'#0C6295'} />
        </Pressable>
        <View style={styles.center}>
          <Image source={Login} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.loginContainer}>
          <View>
            <TextInput
              label="E-mail"
              style={styles.input}
              placeholder="Insira seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Button onPress={handleForgotPassword} title="Enviar" />
        </View>
        {/* Adicione o modal aqui */}
        <ConfirmationModal
          visible={isModalVisible}
          question="Deseja enviar o e-mail de recuperação de senha?"
          onConfirm={sendPasswordResetAndCloseModal}
          onCancel={closeModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: PColors.White,
    flex: 1,
  },
  scrollContainer: {
    display: "flex",
    padding: 16,
    height: "100%",
    minHeight: 600,
  },
  center: {
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    width: 140,
    height: 120,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: PColors.White,
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: 10,
  },
  forgotText: {
    color: PColors.Blue,
    marginTop: 20,
  },
  underlineText: {
    textDecorationLine: "underline",
  },
});
