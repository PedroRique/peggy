import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { PColors } from "../shared/Colors";
import { updateEditProfile, fetchCurrentUserData } from "../services/user.service";
import Button from "../components/Button";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused(); // Retorna true quando a tela está em foco

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  // Buscar dados do usuário atual e definir no estado
  const loadUserData = () => {
    fetchCurrentUserData().then((userData) => {
      if (userData) {
        setName(userData.name);
        setBio(userData.bio);
      }
    });
  };

  useEffect(() => {
    // Carrega os dados do usuário toda vez que a tela estiver em foco
    if (isFocused) {
      loadUserData();
    }
  }, [isFocused]);

  const handleSaveProfile = async () => {
    try {
      await updateEditProfile({ name, bio });
      navigation.navigate("Main");
    } catch (error) {
      console.log('Erro ao atualizar o perfil:', error);
    }
  };

  const handleBioTextChange = (text: string) => {
    if (text.length <= 100) {
      setBio(text);
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
              value={name}
              onChangeText={setName}
            />
          </View>
          <View>
            <TextInput
              label="Sobre você"
              style={styles.bioInput}
              multiline={true}
              placeholder="Gostaria de compartilhar um pouco sobre quem você é?"
              value={bio}
              onChangeText={handleBioTextChange}
            />
          </View>
        </View>
        <Button title="Salvar" onPress={handleSaveProfile} />
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
    marginTop: 16,
  },
  input: {},
  bioInput: {
    paddingBottom: 100,
    resizeMode: "contain",
  },
});
