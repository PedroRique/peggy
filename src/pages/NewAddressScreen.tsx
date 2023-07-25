import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { StackNavigation } from "../../App";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { addAddress } from "../services/user.service";
import { PColors } from "../shared/Colors";

export default function NewAddressScreen() {
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackNavigation, "NewAddress">>();
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [street, setStreet] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(!!street && !!number);
  }, [street, number]);

  const createAddress = async () => {
    addAddress({
      street,
      complement,
      number,
      city: "Rio de Janeiro",
      latitude: null,
      longitude: null,
    })
      .then(() => {
        toast.show("Endereço adicionado com sucesso!", { type: "success" });
        navigation.goBack();
        route.params.onAdd();
      })
      .catch((e) => {
        toast.show("Falha ao criar o endereço.");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo endereço" hasBack hasBorder />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.newProductForm}>
          <TextInput
            label="Endereço"
            placeholder="Digite o endereço"
            value={street}
            onChangeText={setStreet}
          ></TextInput>

          <View style={styles.row}>
            <TextInput
              label="Número"
              placeholder="Digite o número"
              value={number}
              onChangeText={setNumber}
            ></TextInput>
            <TextInput
              label="Complemento"
              placeholder="Digite o complemento"
              value={complement}
              onChangeText={setComplement}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Cadastrar"
          onPress={() => createAddress()}
          onTryPress={() => {
            toast.show("Preencha todos os campos");
          }}
          disabled={!formValid}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 16,
  },
  newProductForm: {
    flex: 1,
  },
  addImageBtn: {
    width: 150,
    height: 150,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: PColors.Blue,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  imageSize: { width: 150, height: 150 },
  footer: {
    padding: 16,
  },
  row: { display: "flex", gap: 12, flexDirection: "row" },
});
