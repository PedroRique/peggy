import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";
import { LoanWithInfo, LoanStatus } from "../models/Loan";
import { PColors } from "../shared/Colors";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";
import LoanTile from "./LoanTile";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";

export const LoansSection = ({
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
          <Text color={PColors.Grey}>{emptyText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
