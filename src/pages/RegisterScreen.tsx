import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { createUser } from "../services/user.service";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackTypes } from "../../App";
import { PColors } from "../shared/Colors";
const Login = require("../../assets/images/Logo/peggy-logo.png");

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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
      navigation.navigate("Main");
    } else {
      console.log("Credenciais inválidas");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.passwordContainer}>
            <TextInput
              label="E-mail"
              style={styles.input}
              placeholder="Insira seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TextInput
            label="Senha"
            style={styles.input}
            placeholder="Insira sua senha"
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View>
        <View>
          <Button title="Cadastrar" onPress={() => registerUser()} />
        </View>
        <BoldText style={[styles.forgotText, styles.center]}>
          Já possui uma conta?
        </BoldText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <BoldText
            style={[styles.underlineText, styles.center, styles.forgotText]}
          >
            Fazer login
          </BoldText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: PColors.White,
    height: "100%",
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
  passwordContainer: {
    position: "relative",
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
