import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";
import { TextInput } from "../components/Input";
import { addProduct } from "../services/products.service";

export default function NewProductScreen() {
  const [productName, setProductName] = useState("");

  const createProduct = async () => {
    await addProduct(productName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo produto" hasBack />

      <View style={styles.newProductForm}>
        <TextInput
          placeholder="Nome do produto"
          onChangeText={(text) => setProductName(text)}
        ></TextInput>
      </View>
      <Button title="Cadastrar" onPress={() => createProduct()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  newProductForm: {
    flex: 1,
  },
});
