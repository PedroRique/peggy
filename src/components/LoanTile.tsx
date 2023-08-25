import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { PColors } from "../shared/Colors";
import { LOAN_TILE_STATUS_MESSAGES } from "../shared/Constants";
import { AppState } from "../store";
import { ProductCard } from "./ProductCard";
import { Text } from "./Text/Text";
import { format } from "date-fns";

type LoanTileProps = TouchableOpacityProps & {
  loan: LoanWithInfo;
};

export default function LoanTile({ loan, ...rest }: LoanTileProps) {
  const userData = useSelector((state: AppState) => state.user.userData);

  const [firstSentence, setFirstSentence] = useState<JSX.Element | null>(<></>);
  const [secondSentence, setSecondSentence] = useState<JSX.Element | null>(
    <></>
  );

  useEffect(() => {
    getSentence();
  }, [userData]);

  const getSentence = () => {
    const { startDate, endDate, borrower, lender } = loan;
    const acceptedOrDenied =
      loan.status === LoanStatus.ACCEPTED || loan.status === LoanStatus.DENIED;
    const name =
      loan.type === "lend"
        ? acceptedOrDenied
          ? "Você"
          : borrower?.name || ""
        : acceptedOrDenied
        ? lender?.name || ""
        : "Você";

    const productName = loan.product?.name || "";

    const getMessage = LOAN_TILE_STATUS_MESSAGES[loan.status];
    const firstSentence = getMessage
      ? getMessage({ borrowerName: name, productName })
      : null;

    
    const startDateFormatted = format(new Date(startDate), 'dd/MM/yyyy');
    const endDateFormatted = format(new Date(endDate), 'dd/MM/yyyy');

    const secondSentence =
      loan.status !== LoanStatus.PENDING &&
      loan.status !== LoanStatus.RETURNED &&
      loan.status !== LoanStatus.PROGRESS ? (
        <>em "Z"</>
      ) : (
        <>
          de {startDateFormatted} até {endDateFormatted}
        </>
      );

    setFirstSentence(firstSentence);
    setSecondSentence(secondSentence);
  };

  return (
    <TouchableOpacity style={styles.tileContainer} {...rest}>
      {loan.product && (
        <ProductCard
          size={60}
          product={loan.product}
          hasShadow={false}
          hasName={false}
        />
      )}
      <View style={styles.loanText}>
        <>
          {firstSentence && <Text>{firstSentence}</Text>}
          {secondSentence && (
            <Text size={14} style={styles.endDateText}>
              {secondSentence}
            </Text>
          )}
        </>
      </View>

      <Pressable onPress={() => {}}>
        <Feather name="arrow-right" color={PColors.Orange} size={24}></Feather>
      </Pressable>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 8,
    overflow: "hidden",
    gap: 12,
    padding: 16,
    backgroundColor: PColors.White,
  },
  loanText: {
    flex: 1,
  },
  endDateText: {
    color: PColors.Grey,
  },
});
