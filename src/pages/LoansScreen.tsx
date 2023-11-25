import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
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
  const [progressLoans, setProgressLoans] = useState<LoanWithInfo[]>([]);
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

      //Comentando para voltar com o rating numa próxima release.
      //checkForPendingRates(result);
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
        ((l.type === "receiving" && !l.hasBorrowerRate) ||
          (l.type === "donating" && !l.hasLenderRate))
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
        emptyText="Nenhuma doação pendente."
        loans={pendingLoans}
      />
      <LoansSection
        title="Ativos"
        emptyText="Nenhuma doação em progresso."
        loans={progressLoans}
      />
      <LoansSection
        title="Histórico"
        emptyText="Nenhuma doação no histórico."
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
  return <LoansTab type="donating" />;
};

const BorrowingTab = () => {
  return <LoansTab type="receiving" />;
};

function LoanTabs() {
  const route = useRoute<RouteProp<StackNavigation, "Loans">>();

  return (
    <Tab.Navigator
      initialRouteName={
        route.params?.initialTab === "receiving" ? "Recebendo" : "Doando"
      }
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: PColors.Orange,
        },
      }}
    >
      <Tab.Screen name="Doando" component={LendingTab} />
      <Tab.Screen name="Recebendo" component={BorrowingTab} />
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
  },
});
