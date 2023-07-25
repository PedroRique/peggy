import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { StackTypes } from "../../App";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { createUser } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { userSlice } from "../store/slices/user.slice";
const Login = require("../../assets/images/Logo/peggy-logo.png");

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const registerUser = async () => {
    if (name === "" || email === "" || password === "") {
      console.log("Preencha nome, email e senha");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      console.log("Por favor, insira um e-mail válido");
      return;
    }

    const result = await createUser({
      name,
      email,
      password,
    });

    if (result !== null && result !== undefined) {
      console.log("Cadastro bem-sucedido");
      dispatch(
        userSlice.actions.setUserData({
          name,
          email,
          uid: "",
          photoURL: null,
          addresses: [],
          rate: 0,
        })
      );
    } else {
      console.log("Credenciais inválidas");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.center}>
          <Image source={Login} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.loginContainer}>
          <View>
            <TextInput
              label="Nome"
              style={styles.input}
              placeholder="Insira seu nome"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              label="E-mail"
              style={styles.input}
              placeholder="Insira seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              label="Senha"
              style={styles.input}
              placeholder="Insira sua senha"
              showEyeIcon={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <View>
          <View>
            <Button title="Cadastrar" onPress={registerUser} />
          </View>
          <BoldText style={[styles.forgotText, styles.center]}>
            Já possui uma conta?
          </BoldText>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <BoldText
              style={[styles.underlineText, styles.center, styles.forgotText]}
            >
              Fazer login
            </BoldText>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 20,
    marginVertical: 4,
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
