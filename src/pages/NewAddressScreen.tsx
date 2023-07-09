import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { addAddress } from "../services/user.service";

export default function NewAddressScreen() {
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [street, setStreet] = useState("");

  const createAddress = async () => {
    await addAddress({
      street,
      complement,
      number,
      city: 'Rio de Janeiro',
      latitude: null,
      longitude: null,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo endereço" hasBack hasBorder />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.newProductForm}>
          <TextInput
            label="Endereço"
            placeholder="Digite o endereço"
            onChangeText={setStreet}
          ></TextInput>

          <View style={styles.row}>
            <TextInput
              label="Número"
              placeholder="Digite o número"
              onChangeText={setNumber}
            ></TextInput>
            <TextInput
              label="Complemento"
              placeholder="Digite o complemento"
              onChangeText={setComplement}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Cadastrar" onPress={() => createAddress()} />
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
    borderColor: Colors.Blue,
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
