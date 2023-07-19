import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigation } from "../../App";
import { Header } from "../components/Header";
import { LoansSection } from "../components/LoansList";
import { LoanRatingModal } from "../modals/LoanRatingModal";
import { LoanStatus, LoanType, LoanWithInfo } from "../models/Loan";
import { fetchLoansWithProductInfo } from "../services/loan.service";
import { groupLoansBySection } from "../services/utils.service";
import { PColors } from "../shared/Colors";

const Tab = createMaterialTopTabNavigator();

const LoansTab = ({ type }: { type: LoanType }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loanToRate, setLoanToRate] = useState<LoanWithInfo | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [otherLoans, setOtherLoans] = useState<LoanWithInfo[]>([]);
  const [progreesLoans, setProgressLoans] = useState<LoanWithInfo[]>([]);
  const [pendingLoans, setPendingLoans] = useState<LoanWithInfo[]>([]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getLoans();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getLoans();
  }, []);

  const getLoans = async () => {
    try {
      const result = await fetchLoansWithProductInfo(type);

      checkForPendingRates(result);
      const groupedLoans = groupLoansBySection(result);

      setPendingLoans(groupedLoans.pending);
      setProgressLoans(groupedLoans.progress);
      setOtherLoans(groupedLoans.other);
    } catch (error) {
      console.error(error);
    }
  };

  const checkForPendingRates = (result: LoanWithInfo[]) => {
    const toRateLoans = result.filter(
      (l) =>
        l.status === LoanStatus.RETURNED &&
        ((l.type === "borrow" && !l.hasBorrowerRate) ||
          (l.type === "lend" && !l.hasLenderRate))
    );
    if (toRateLoans.length) {
      setLoanToRate(toRateLoans[0]);
      setShowRatingModal(true);
    }
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.tabInner}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
      {loanToRate && (
        <Modal
          isVisible={showRatingModal}
          onBackdropPress={hideRatingModal}
          onDismiss={hideRatingModal}
        >
          <LoanRatingModal loan={loanToRate} onClose={hideRatingModal} />
        </Modal>
      )}
    </ScrollView>
  );
};

const LendingTab = () => {
  return <LoansTab type="lend" />;
};

const BorrowingTab = () => {
  return <LoansTab type="borrow" />;
};

function LoanTabs() {
  const route = useRoute<RouteProp<StackNavigation, "Loans">>();

  return (
    <Tab.Navigator
      initialRouteName={
        route.params?.initialTab === "borrow"
          ? "Pegando Emprestado"
          : "Emprestando"
      }
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: PColors.Orange,
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
    backgroundColor: PColors.White,
  },
  scrollContainer: {
    padding: 16,
  },
  tabInner: {
    backgroundColor: PColors.White,
    padding: 16,
    flex: 1,
  },
});
