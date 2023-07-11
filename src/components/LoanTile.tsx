import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { Colors } from "../shared/Colors";
import { STATUS_MESSAGES } from "../shared/Constants";
import { AppState } from "../store";
import { ProductCard } from "./ProductCard";
import { Text } from "./Text/Text";

type LoanTileProps = TouchableOpacityProps & { loan: LoanWithInfo };

export default function LoanTile({ loan, ...rest }: LoanTileProps) {
  const userData = useSelector((state: AppState) => state.user.userData);

  const getSentence = () => {
    const { startDate, endDate, borrower } = loan;
    const borrowerName =
      borrower?.uid === userData?.uid ? "Você" : borrower?.name || "";
    const productName = loan.product?.name || "";

    const getMessage = STATUS_MESSAGES[loan.status];
    const firstSentence = getMessage
      ? getMessage({ borrowerName, productName, startDate, endDate })
      : null;
    const secondSentence =
      loan.status !== LoanStatus.PENDING &&
      loan.status !== LoanStatus.RETURNED ? (
        <>em {"Z"}</>
      ) : null;

    return (
      <>
        {firstSentence && <Text>{firstSentence}</Text>}
        {secondSentence && (
          <Text size={14} style={styles.endDateText}>
            {secondSentence}
          </Text>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity style={styles.tileContainer} {...rest}>
      {loan.product && (
        <ProductCard size={60} product={loan.product} hasShadow={false} />
      )}
      <View style={styles.loanText}>{getSentence()}</View>

      <Pressable onPress={() => {}}>
        <Feather name="arrow-right" color={Colors.Orange} size={24}></Feather>
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
    backgroundColor: Colors.White,
  },
  loanText: {
    flex: 1,
  },
  endDateText: {
    color: Colors.Grey,
  },
});
