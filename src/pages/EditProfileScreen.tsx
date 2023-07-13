import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { StackTypes } from "../../App";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { signInUser } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { userSlice } from "../store/slices/user.slice";
import { Header } from "../components/Header";
import { Text } from "../components/Text/Text";
const Login = require("../../assets/images/Logo/peggy-logo.png");

export default function EditProfileScreen() {
  const [bioText, setBioText] = useState('');

  const handleBioTextChange = (text:any) => {
    if (text.length <= 100) {
      setBioText(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Editar Perfil" hasBack hasBorder />
      <View style={styles.inputContainer}>
        <View>
          <View>
          <TextInput
            label="Nome"
            style={styles.input}
            placeholder="Insira seu nome"
          />
          </View>
          <View>
          <TextInput
            label="Sobre você"
            style={styles.bioInput}
            multiline={true}
            placeholder="Gostaria de compartilhar um pouco sobre quem você é?"
            value={bioText}
            onChangeText={handleBioTextChange}
          />
          </View>

      
        </View>
        <Button title="Salvar" onPress={function (): void {
          throw new Error("Function not implemented.");
        } }></Button>
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
  inputContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop:16,
  },
  input: {

  },
  bioInput: {
    paddingBottom:100,

    resizeMode: "contain",
  },
});
