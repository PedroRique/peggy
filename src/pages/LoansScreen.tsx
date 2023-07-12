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
import { Text } from "../components/Text/Text";

const Tab = createMaterialTopTabNavigator();

const LoansSection = ({
  title,
  emptyText,
  loans,
}: {
  title: string;
  emptyText: string;
  loans: LoanWithInfo[];
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.loansSectionContainer}>
      <BoldText style={styles.sectionTitle}>{title}</BoldText>

      <View style={styles.loansContainer}>
        {loans && loans.length ? (
          loans.map((loan, i) => (
            <LoanTile
              key={i}
              loan={loan}
              onPress={() => {
                dispatch(productSlice.actions.setSelectedProduct(null));
                dispatch(loanSlice.actions.setSelectedLoan(loan));
                navigation.navigate("NewLoanRequest");
              }}
            />
          ))
        ) : (
          <Text color={Colors.Grey}>{emptyText}</Text>
        )}
      </View>
    </View>
  );
};

const LoansTab = ({ type }: { type: "lender" | "borrower" }) => {
  const [otherLoans, setOtherLoans] = useState<LoanWithInfo[]>([]);
  const [progreesLoans, setProgressLoans] = useState<LoanWithInfo[]>([]);
  const [pendingLoans, setPendingLoans] = useState<LoanWithInfo[]>([]);
  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = async () => {
    try {
      const result = await fetchLoansWithProductInfo(type);
      let groups: Record<string, LoanWithInfo[]> = {
        pending: [],
        progress: [],
        other: [],
      };
      const groupedLoans = result.reduce((accumulator, loan) => {
        if (loan.status === LoanStatus.PENDING) {
          accumulator.pending.push(loan);
        } else if (
          loan.status === LoanStatus.PROGRESS ||
          loan.status === LoanStatus.ACCEPTED
        ) {
          accumulator.progress.push(loan);
        } else {
          accumulator.other.push(loan);
        }
        return accumulator;
      }, groups);

      setPendingLoans(groupedLoans.pending);
      setProgressLoans(groupedLoans.progress);
      setOtherLoans(groupedLoans.other);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.tabInner}>
      <LoansSection
        title="Pendente"
        emptyText="Nenhum empréstimo pendente."
        loans={pendingLoans}
      />
      <LoansSection
        title="Ativos"
        emptyText="Nenhum empréstimo em progresso."
        loans={progreesLoans}
      />
      <LoansSection
        title="Histórico"
        emptyText="Nenhum empréstimo no histórico."
        loans={otherLoans}
      />
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
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Colors.Orange,
        },
      }}
    >
      <Tab.Screen name="Emprestando" component={LendingTab} />
      <Tab.Screen name="Pegando Emprestado" component={BorrowingTab} />
    </Tab.Navigator>
  );
}

export default function LoansScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Empréstimos"} hasBorder />
      <LoanTabs></LoanTabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
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
