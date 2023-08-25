import { useNavigation } from "@react-navigation/native";
import { isBefore, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Masks } from "react-native-mask-input";
import DropDown from "react-native-paper-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { Rate } from "../components/Rate";
import { BoldText } from "../components/Text/BoldText";
import { Text } from "../components/Text/Text";
import { Address } from "../models/Address";
import { LoanRequest, LoanStatus, LoanWithInfo } from "../models/Loan";
import { UserData } from "../models/UserData";
import { createLoan, updateLoanStatus } from "../services/loan.service";
import { getRate } from "../services/rating.service";
import { fetchUserData } from "../services/user.service";
import { formatAddressLabel, getDateObject } from "../services/utils.service";
import { AppState } from "../store";
import React from "react";
import DropdownButton from "../components/DropdownButton.js";
import CalendarDrop from "../components/Calendar";

export default function NewLoanRequestScreen() {
  const toast = useToast();
  const navigation = useNavigation<StackTypes>();
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
  const [sentence, setSentence] = useState(<></>);
  const [formValid, setFormValid] = useState(false);
  const [rate, setRate] = useState<number>();

  useEffect(() => {
    getLenderUserData();
    getProductRate();
  }, []);

  const getProductRate = async () => {
    const rate = await getRate(product?.ratings);
    setRate(rate);
  };

  useEffect(() => {
    const startDateObject = getDateObject(startDate);
    const endDateObject = getDateObject(endDate);

    setFormValid(
      !!address &&
        !!startDate &&
        !!endDate &&
        !!pickUpTime &&
        !!giveBackTime &&
        !!startDateObject &&
        !!endDateObject &&
        startDate.length == 10 &&
        endDate.length == 10 &&
        pickUpTime.length == 5 &&
        giveBackTime.length == 5 &&
        !isBefore(startDateObject, startOfDay(new Date())) &&
        !isBefore(endDateObject, startDateObject)
    );
  }, [address, startDate, endDate, pickUpTime, giveBackTime]);

  useEffect(() => {
    if (loan) {
      setStartDate(loan.startDate);
      setEndDate(loan.endDate);
      setPickUpTime(loan.pickUpTime);
      setGiveBackTime(loan.giveBackTime);
      setAddress(loan.address);
    }
  }, [loan]);

  useEffect(() => {
    getSentence(loan);
  }, [lenderUserData]);

  const getLenderUserData = async () => {
    const result = await fetchUserData(product?.userId);
    setLenderUserData(result);
  };

  const onUpdateStatus = async (status: LoanStatus) => {
    return await updateLoanStatus(loan?.uid || "", status, product?.uid!);
  };

  const onPickUp = () => {
    console.log("fluxo de entrega");
  };

  const onGiveBack = () => {
    console.log("fluxo de devolução");
  };

  const onCreate = () => {
    const req: LoanRequest = {
      address,
      endDate,
      giveBackTime,
      pickUpTime,
      borrowerUserId: FIREBASE_AUTH.currentUser?.uid || "",
      lenderUserId: product?.userId || "",
      productId: product?.uid || "",
      startDate,
    };

    createLoan(req, product)
      .then(() => {
        navigation.navigate("Loans", { initialTab: "borrow" });
        toast.show("Solicitação feita com sucesso!", { type: "success" });
      })
      .catch(() => {
        toast.show("Ocorreu um erro na solicitação de empréstimo", {
          type: "danger",
        });
      });
  };

  const isLoanRequest = () => {
    return borrowerUserData && borrowerUserData.uid !== currentUserData?.uid;
  };

  const sentenceMap = {
    [LoanStatus.PENDING]: isLoanRequest()
      ? "Empreste para"
      : "Quero pegar emprestado de",
    [LoanStatus.ACCEPTED]: `Empréstimo aprovado ${
      isLoanRequest() ? "para" : "por"
    }`,
    [LoanStatus.DENIED]: `Empréstimo negado ${isLoanRequest() ? "a" : "por"}`,
    [LoanStatus.PROGRESS]: isLoanRequest()
      ? "Emprestando para"
      : "Pegando emprestado de",
    [LoanStatus.CANCELED]: "Empréstimo cancelado por",
    [LoanStatus.RETURNED]: isLoanRequest()
      ? "Emprestou para"
      : "Pegou emprestado de",
  };

  const getSentence = (loan: LoanWithInfo | null) => {
    let sentenceTxt = "Quero pegar emprestado de";
    let name: string | null | undefined = lenderUserData?.name;

    if (loan) {
      name = isLoanRequest()
        ? borrowerUserData?.name
        : loan.status === LoanStatus.CANCELED
        ? "Você"
        : lenderUserData?.name;

      sentenceTxt = sentenceMap[loan.status];
    }

    setSentence(
      <Text size={24}>
        {sentenceTxt} <BoldText size={24}>{name}</BoldText>
      </Text>
    );
  };

  const getButtons = () => {
    if (!loan || !loan.uid) {
      return (
        <View style={{ flex: 1 }}>
          <Button title="Solicitar" onPress={onCreate} disabled={!formValid} />
        </View>
      );
    }

    const isTodayPickUpDate = true;
    const isTodayGiveBackDate = true;

    const { status } = loan;

    if (status === LoanStatus.PENDING) {
      if (isLoanRequest()) {
        return (
          <>
            <View style={{ flex: 1 }}>
              <Button
                title="Negar"
                onPress={() => onUpdateStatus(LoanStatus.DENIED)}
                outlined
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Aceitar"
                onPress={() => onUpdateStatus(LoanStatus.ACCEPTED)}
              />
            </View>
          </>
        );
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Button
              title="Cancelar"
              onPress={() => onUpdateStatus(LoanStatus.CANCELED)}
            />
          </View>
        );
      }
    }

    if (status === LoanStatus.ACCEPTED && isTodayPickUpDate) {
      const buttonTitle = isLoanRequest() ? "Entregar" : "Receber";
      return (
        <View style={{ flex: 1 }}>
          <Button
            title={buttonTitle}
            onPress={() => onUpdateStatus(LoanStatus.PROGRESS)}
          />
        </View>
      );
    }

    if (status === LoanStatus.PROGRESS && isTodayGiveBackDate) {
      const buttonTitle = isLoanRequest() ? "Receber" : "Devolver";
      return (
        <View style={{ flex: 1 }}>
          <Button
            title={buttonTitle}
            onPress={() => onUpdateStatus(LoanStatus.RETURNED)}
          />
        </View>
      );
    }

    return null;
  };

  const hourMask = [/\d/, /\d/, ":", /\d/, /\d/];

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalhes" hasBack hasBorder />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sentence}

        {product && (
          <View style={styles.productSummary}>
            <ProductCard product={product} size={60} hasName={false} />
            <BoldText size={24} numberOfLines={2}>
              {product?.name}
            </BoldText>
            <Rate value={rate} />
          </View>
        )}

        <View style={styles.loanForm}>
            <DropdownButton
            label={"Buscar e devolver em"}
            placeholder={"Selecione um endereço"}
            options={
            lenderUserData && lenderUserData.addresses
              ? lenderUserData.addresses.map((address: Address) => ({
                  label: formatAddressLabel(address),
                  onPress: () => {
                    setAddress(formatAddressLabel(address)); 
                  },
                }))
                  : []
              }
              editable={!loan}
              />

          <View style={styles.row}>
            <View style={{ flex: 2 }}>
            <CalendarDrop
            label="Pegar no dia" 
            placeholder="DD/MM/YYYY"              
            isVisible={false} 
            editable={!loan}
            value={startDate} 
            onClose={function (): void {
              throw new Error("Function not implemented.");
            } } 
            onSelectDate={function (date: string): void {
              throw new Error("Function not implemented.");
            }} 
          />          
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                label="as"
                placeholder="00:00"
                value={pickUpTime}
                editable={!loan}
                selectTextOnFocus={!loan}
                onChangeText={setPickUpTime}
                mask={hourMask}
              ></TextInput>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 2 }}>
            <CalendarDrop        
              label="Devolver no dia" 
              placeholder="DD/MM/YYYY"              
              isVisible={false} 
              editable={!loan}
              value={endDate}
              onChangeText={setEndDate}
              
              onClose={function (): void {
                throw new Error("Function not implemented.");
              } } onSelectDate={function (date: string): void {
                throw new Error("Function not implemented.");
              } }              ></CalendarDrop>

            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                label="as"
                placeholder="00:00"
                value={giveBackTime}
                editable={!loan}
                selectTextOnFocus={!loan}
                onChangeText={setGiveBackTime}
                mask={hourMask}
              ></TextInput>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View
          style={{ flex: 1, display: "flex", flexDirection: "row", gap: 12 }}
        >
          {getButtons()}
        </View>
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