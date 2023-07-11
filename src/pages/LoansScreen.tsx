import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import LoanTile from "../components/LoanTile";
import { BoldText } from "../components/Text/BoldText";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { fetchLoansWithProductInfo } from "../services/loan.service";
import { Colors } from "../shared/Colors";
import { useDispatch } from "react-redux";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";

const Tab = createMaterialTopTabNavigator();

const LoansSection = ({
  title,
  loans,
}: {
  title: string;
  loans: LoanWithInfo[];
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.loansSectionContainer}>
      <BoldText style={styles.sectionTitle}>{title}</BoldText>

      <View style={styles.loansContainer}>
        {loans.map((loan, i) => (
          <LoanTile
            key={i}
            loan={loan}
            onPress={() => {
              dispatch(productSlice.actions.setSelectedProduct(null));
              dispatch(loanSlice.actions.setSelectedLoan(loan));
              navigation.navigate("NewLoanRequest");
            }}
          />
        ))}
      </View>
    </View>
  );
};

const LoansTab = ({ type }: { type: "lender" | "borrower" }) => {
  const [loans, setLoans] = useState<LoanWithInfo[]>([]);
  const [pendingLoans, setPendingLoans] = useState<LoanWithInfo[]>([]);
  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = async () => {
    const result = await fetchLoansWithProductInfo(type);
    setPendingLoans(result.filter((l) => l.status === LoanStatus.PENDING));
    setLoans(result.filter((l) => l.status !== LoanStatus.PENDING));
  };

  return (
    <View style={styles.tabInner}>
      <LoansSection title="Pendente" loans={pendingLoans} />
      <LoansSection title="Ativos" loans={loans} />
    </View>
  );
};

const LendingTab = () => {
  return <LoansTab type="lender" />;
};

const BorrowingTab = () => {
  return <LoansTab type="borrower" />;
};

function LoanTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Emprestando" component={LendingTab} />
      <Tab.Screen name="Pegando Emprestado" component={BorrowingTab} />
    </Tab.Navigator>
  );
}

export default function LoansScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Empréstimos"} />
      <LoanTabs></LoanTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
    backgroundColor: Colors.White,
  },
  scrollContainer: {
    padding: 16,
  },
  tabInner: {
    backgroundColor: Colors.White,
    padding: 16,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 16,
  },
  loansSectionContainer: {
    marginBottom: 24,
  },
  loansContainer: {
    display: "flex",
    gap: 12,
  },
});
