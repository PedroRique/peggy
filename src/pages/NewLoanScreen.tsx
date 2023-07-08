import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { Text } from "../components/Text/Text";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Rating } from "../components/Rating";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect } from "react";
import { UserData } from "../models/UserData";
import { fetchUserData } from "../services/user.service";
import { TextInput } from "../components/Input";

export default function NewLoanScreen() {
  const selectedProduct = useSelector(
    (state: AppState) => state.product.selectedProduct
  );
  const [userData, setUserData] = useState<UserData>();

  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const result = await fetchUserData(selectedProduct?.userId);
    setUserData(result);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalhes" hasBack hasBorder />

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.commonText}>Pegue emprestado</Text>

        {selectedProduct && (
          <View style={styles.productSummary}>
            <ProductCard product={selectedProduct} size={60} />
            <Text style={styles.commonText} numberOfLines={2}>
              {selectedProduct?.name}
            </Text>
            <Rating value={4.7} />
          </View>
        )}

        <Text style={styles.commonText}>de {userData?.name}</Text>

        <View style={styles.loanForm}>
          <View style={styles.row}>
            <TextInput
              label="De:"
              placeholder="DD/MM/YYYY"
              onChangeText={setStartDate}
            ></TextInput>
            <TextInput
              label="Até:"
              placeholder="DD/MM/YYYY"
              onChangeText={setStartDate}
            ></TextInput>
          </View>
          <TextInput
            label="Buscar e devolver em:"
            placeholder="Selecione um endereço"
            onChangeText={setStartDate}
          ></TextInput>
          <View style={styles.row}>
            <TextInput
              label="Buscar as:"
              placeholder="00:00"
              onChangeText={setStartDate}
            ></TextInput>
            <TextInput
              label="Devolver as:"
              placeholder="00:00"
              onChangeText={setStartDate}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Cadastrar" onPress={() => ({})} />
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
  commonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productSummary: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 16,
  },
  row: { display: "flex", gap: 12, flexDirection: "row" },
  loanForm: {
    marginTop: 32,
  },
  footer: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    padding: 16,
  },
});
