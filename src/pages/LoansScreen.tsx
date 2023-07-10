import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import LoanTile from "../components/LoanTile";
import { BoldText } from "../components/Text/BoldText";
import { LoanWithInfo } from "../models/Loan";
import { fetchLoansWithProductInfo } from "../services/loan.service";
import { Colors } from "../shared/Colors";

const Tab = createMaterialTopTabNavigator();

const LendingTab = () => {
  const [loans, setLoans] = useState<LoanWithInfo[]>([]);
  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = async () => {
    const result = await fetchLoansWithProductInfo("lender");
    setLoans(result);
  };

  return (
    <View style={styles.tabInner}>
      <BoldText style={styles.sectionTitle}>Ativos</BoldText>

      <View style={styles.loansContainer}>
        {loans.map((loan, i) => (
          <LoanTile key={i} loan={loan} />
        ))}
      </View>
    </View>
  );
};

const BorrowingTab = () => {
  const [loans, setLoans] = useState<LoanWithInfo[]>([]);
  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = async () => {
    const result = await fetchLoansWithProductInfo("borrower");
    setLoans(result);
  };

  return (
    <View style={styles.tabInner}>
      <BoldText style={styles.sectionTitle}>Ativos</BoldText>

      <View style={styles.loansContainer}>
        {loans.map((loan, i) => (
          <LoanTile key={i} loan={loan} />
        ))}
      </View>
    </View>
  );
};

function LoanTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Emprestando" component={LendingTab} />
      <Tab.Screen name="Pegando" component={BorrowingTab} />
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
  loansContainer: {
    display: "flex",
    gap: 12,
  },
});
