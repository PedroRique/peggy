import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "../components/Text/Text";
import { useEffect, useState } from "react";
import { fetchLoans } from "../services/loan.service";
import { Loan } from "../models/Loan";

const Tab = createMaterialTopTabNavigator();

const LendingTab = () => {
  return <Text>Emprestando</Text>;
};

const BorrowingTab = () => {
  return <Text>Pedindo emprestado</Text>;
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
  const [loans, setLoans] = useState<Loan[]>([]);
  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = async () => {
    const result = await fetchLoans();
    setLoans(result);
  };

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
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 16,
  },
});
