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
import { BoldText } from "../components/Text/BoldText";
import DropDown from "react-native-paper-dropdown";
import { Address } from "../models/Address";
import { createLoan } from "../services/loan.service";

export default function NewLoanRequestScreen() {
  const selectedProduct = useSelector(
    (state: AppState) => state.product.selectedProduct
  );
  const profile: UserData | null = useSelector(
    (state: AppState) => state.user.profile
  );
  const [showDropDown, setShowDropDown] = useState(false);
  const [userData, setUserData] = useState<UserData>();
  const [address, setAddress] = useState('');

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [giveBackTime, setGiveBackTime] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const result = await fetchUserData(selectedProduct?.userId);
    setUserData(result);
  };

  const onSubmit = async () => {
    await createLoan({
      address: address || '',
      endDate,
      giveBackTime,
      pickUpTime,
      receiverId: profile?.uid || '',
      senderId: selectedProduct?.userId || '',
      startDate,
    })
  }

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
              onChangeText={setEndDate}
            ></TextInput>
          </View>

          <View style={{ marginBottom: 32 }}>
            <BoldText>Buscar e devolver em:</BoldText>
            <DropDown
              label={"Selecione um endereço"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={address}
              setValue={setAddress}
              list={
                userData && userData.addresses
                  ? userData.addresses.map((address: Address) => ({
                      label: `${address.street} ${address.number}, ${address.complement} - ${address.city}`,
                      value: address.street,
                    }))
                  : []
              }
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Buscar as:"
              placeholder="00:00"
              onChangeText={setPickUpTime}
            ></TextInput>
            <TextInput
              label="Devolver as:"
              placeholder="00:00"
              onChangeText={setGiveBackTime}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Solicitar" onPress={onSubmit} />
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
