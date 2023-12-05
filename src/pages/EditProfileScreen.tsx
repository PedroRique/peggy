import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { StackNavigation, StackTypes } from "../../App";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { updateEditProfile } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { userSlice } from "../store/slices/user.slice";
import DropdownButton from "../components/DropdownButton.js";
import CalendarDrop from "../components/Calendar";


export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const toast = useToast();
  const route = useRoute<RouteProp<StackNavigation, "EditProfile">>();
  const navigation = useNavigation<StackTypes>();
  const userData = useSelector((state: AppState) => state.user.userData);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setName(userData?.name || "");
    setBio(userData?.bio || "");
  }, [userData]);

  const handleSaveProfile = async () => {
    updateEditProfile({ name, bio })
      .then(() => {
        dispatch(userSlice.actions.setNameAndBio({ name, bio }));
        toast.show("Perfil atualizado com sucesso!", {
          type: "success",
        });
        navigation.goBack();
        route.params.onAdd();
      })
      .catch((e) => {
        toast.show("Ocorreu um erro ao tentar atualizar seu perfil", {
          type: "danger",
        });
      });
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
    backgroundColor: PColors.White,
    height: "100%",
  },
  inputContainer: {
    padding: 16,
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
