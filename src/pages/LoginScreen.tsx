import React, { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText } from "../components/Text/BoldText";
import { userSlice } from "../store/slices/user.slice";
import Button from "../components/Button";
import { signInUser } from "../services/user.service";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";
const Login = require("../../assets/images/Logo/peggy-logo.png");

export default function LoginScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation<StackTypes>()
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const loginUser = async () => {
    if (email === "" || password === "") {
      console.log("Preencha o email e a senha");
      return;
    }

    const result = await signInUser({
      email,
      password,
    });

    if (result) {
      const { displayName, uid, email, photoURL } = result.user;
      dispatch(
        userSlice.actions.setProfile({
          name: displayName,
          uid,
          email,
          photoURL,
          rate: 5,
        })
      );
      console.log("Login bem-sucedido");
      navigation.navigate("Main")
    } else {
      console.log("Credenciais inválidas");
    }
  };

  const handleForgotPassword = () => {
    
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Image source={Login} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.loginContainer}>
        <View>
          <View>
            <BoldText style={styles.title}>E-mail</BoldText>
            <TextInput
              style={styles.input}
              placeholder="Insira seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <BoldText style={styles.title}>Senha</BoldText>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Insira sua senha"
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={setPassword}
              />
              <Feather
                name={secureTextEntry ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
                style={styles.icon}
                onPress={toggleSecureEntry}
              />
            </View>
            <BoldText style={[styles.forgotPassword, styles.forgotText]} onPress={handleForgotPassword}>
              Esqueceu a senha?
            </BoldText>
          </View>
        </View>
      </View>
      <View>
        <View>
          <Button title="Login" onPress={() => loginUser()} />
        </View>
        <BoldText style={[styles.forgotText, styles.center]}>
          Não possui uma conta?
        </BoldText>
        <BoldText style={[styles.underlineText, styles.center, styles.forgotText]}>
          Cadastre-se 
        </BoldText>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  center: {
    alignItems: "center",
    textAlign:"center",
  },
  logo: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#fff",
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
    color: "#00C2FF",
    marginTop:20,
  },
  underlineText: {
    textDecorationLine: "underline",
  },
});
