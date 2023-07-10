import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "../components/Text/Text";

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
