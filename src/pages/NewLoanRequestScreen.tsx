import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Text } from "../components/Text/Text";
import { Address } from "../models/Address";
import { UserData } from "../models/UserData";
import { createLoan, updateLoanStatus } from "../services/loan.service";
import { fetchUserData } from "../services/user.service";
import { formatAddressLabel } from "../services/utils.service";
import { AppState } from "../store";
import { LoanStatus } from "../models/Loan";

export default function NewLoanRequestScreen() {
  const loan = useSelector((state: AppState) => state.loan.selectedLoan);
  const product = useSelector(
    (state: AppState) =>
      state.product.selectedProduct || state.loan.selectedLoan?.product
  );
  const borrowerUserData = useSelector(
    (state: AppState) => state.loan.selectedLoan?.borrower
  );
  const currentUserData = useSelector((state: AppState) => state.user.userData);

  const [showDropDown, setShowDropDown] = useState(false);
  const [lenderUserData, setLenderUserData] = useState<UserData>();
  const [address, setAddress] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [giveBackTime, setGiveBackTime] = useState("");

  useEffect(() => {
    getLenderUserData();
  }, []);

  useEffect(() => {
    if (loan) {
      setStartDate(loan.startDate);
      setEndDate(loan.endDate);
      setPickUpTime(loan.pickUpTime);
      setGiveBackTime(loan.giveBackTime);
      setAddress(loan.address);
    }
  }, [loan]);

  const getLenderUserData = async () => {
    const result = await fetchUserData(product?.userId);
    setLenderUserData(result);
  };

  const onUpdateStatus = async (status: LoanStatus) => {
    return await updateLoanStatus(loan?.uid || "", status);
  };

  const onCreate = async () => {
    await createLoan({
      address,
      endDate,
      giveBackTime,
      pickUpTime,
      borrowerUserId: FIREBASE_AUTH.currentUser?.uid || "",
      lenderUserId: product?.userId || "",
      productId: product?.uid || "",
      startDate,
    });
  };

  const isLoanRequest = () => {
    return borrowerUserData && borrowerUserData.uid !== currentUserData?.uid;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalhes" hasBack hasBorder />

      <ScrollView style={styles.scrollContainer}>
        <Text size={24}>
          {isLoanRequest() ? "Empreste" : "Pegue emprestado"}{" "}
          {isLoanRequest() ? "para" : "de"}{" "}
          <BoldText size={24}>
            {isLoanRequest() ? borrowerUserData?.name : lenderUserData?.name}
          </BoldText>
        </Text>

        {product && (
          <View style={styles.productSummary}>
            <ProductCard product={product} size={60} hasName={false} />
            <BoldText size={24} numberOfLines={2}>
              {product?.name}
            </BoldText>
            <Rating value={4.7} />
          </View>
        )}

        <View style={styles.loanForm}>
          <View style={styles.row}>
            <TextInput
              label="De:"
              placeholder="DD/MM/YYYY"
              value={startDate}
              editable={!loan}
              selectTextOnFocus={!loan}
              onChangeText={setStartDate}
            ></TextInput>
            <TextInput
              label="Até:"
              placeholder="DD/MM/YYYY"
              value={endDate}
              editable={!loan}
              selectTextOnFocus={!loan}
              onChangeText={setEndDate}
            ></TextInput>
          </View>

          <View style={{ marginBottom: 32 }}>
            <BoldText>Buscar e devolver em:</BoldText>
            <DropDown
              label={"Selecione um endereço"}
              mode={"outlined"}
              visible={!loan && showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={address}
              setValue={(addressLabel) => {
                setAddress(addressLabel);
              }}
              list={
                lenderUserData && lenderUserData.addresses
                  ? lenderUserData.addresses.map((address: Address) => ({
                      label: formatAddressLabel(address),
                      value: formatAddressLabel(address),
                    }))
                  : []
              }
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Buscar as:"
              placeholder="00:00"
              value={pickUpTime}
              editable={!loan}
              selectTextOnFocus={!loan}
              onChangeText={setPickUpTime}
            ></TextInput>
            <TextInput
              label="Devolver as:"
              placeholder="00:00"
              value={giveBackTime}
              editable={!loan}
              selectTextOnFocus={!loan}
              onChangeText={setGiveBackTime}
            ></TextInput>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {loan && loan.uid ? (
          <>
            {loan.status === LoanStatus.PENDING && (
              <>
                {isLoanRequest() ? (
                  <>
                    <Button
                      title="Negar"
                      onPress={() => onUpdateStatus(LoanStatus.DENIED)}
                      outlined
                    />
                    <Button
                      title="Aceitar"
                      onPress={() => onUpdateStatus(LoanStatus.ACCEPTED)}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      title="Cancelar"
                      onPress={() => onUpdateStatus(LoanStatus.CANCELED)}
                    />
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Button title="Solicitar" onPress={onCreate} />
        )}
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
    display: "flex",
    flexDirection: "row",
    gap: 12,
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    padding: 16,
  },
});
