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
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { StackTypes } from "../../App";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { FirebaseError } from "../models/FirebaseError";
import { signInUser } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { FIREBASE_ERROR_MESSAGES } from "../shared/Constants";
import { userSlice } from "../store/slices/user.slice";
const Login = require("../../assets/images/Logo/peggy-logo.png");

export default function LoginScreen() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation<StackTypes>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (email === "" || password === "") {
      toast.show("Preencha o e-mail e a senha", {
        type: "warning",
      });
      return;
    }

    signInUser({
      email,
      password,
    })
      .then((result) => {
        const { displayName, uid, email, photoURL } = result.user;
        dispatch(
          userSlice.actions.setUserData({
            name: displayName,
            uid,
            email,
            photoURL,
            addresses: [],
            rate: 5,
          })
        );
        navigation.navigate("Main");
      })
      .catch(({ code }: { code: FirebaseError }) => {
        toast.show(FIREBASE_ERROR_MESSAGES[code], {
          type: "danger",
        });
      });
  };

  const handleForgotPassword = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <TextInput
              label="Senha"
              showEyeIcon={true}
              style={styles.input}
              placeholder="Insira sua senha"
              value={password}
              onChangeText={setPassword}
            />

            <BoldText
              style={[styles.forgotPassword, styles.forgotText]}
              onPress={handleForgotPassword}
            >
              Esqueceu a senha?
            </BoldText>
          </View>
        </View>
        <View>
          <View>
            <Button title="Login" onPress={() => loginUser()} />
          </View>
          <BoldText style={[styles.forgotText, styles.center]}>
            Não possui uma conta?
          </BoldText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <BoldText
              style={[styles.underlineText, styles.center, styles.forgotText]}
            >
              Cadastre-se
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
    flex: 1
  },
  scrollContainer: {
    display: 'flex',
    padding: 16,
    height: '100%',
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
    marginVertical: 10,
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
    top: 40,
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
