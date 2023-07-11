import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { LoanStatus, LoanWithInfo } from "../models/Loan";
import { Colors } from "../shared/Colors";
import { ProductCard } from "./ProductCard";
import { Text } from "./Text/Text";
import { BoldText } from "./Text/BoldText";
import { useSelector } from "react-redux";
import { AppState } from "../store";

type LoanTileProps = TouchableOpacityProps & { loan: LoanWithInfo };

export default function LoanTile({ loan, ...rest }: LoanTileProps) {
  const userData = useSelector((state: AppState) => state.user.userData);

  const getSentence = () => {
    const { startDate, endDate, borrower } = loan;

    const borrowerName =
      borrower?.uid === userData?.uid ? "Você" : borrower?.name;

    let firstSentence = (
      <>
        {loan.product?.name} está com <BoldText>{borrowerName}</BoldText>
      </>
    );
    let secondSentence = <>até {endDate}</>;

    if (loan.status === LoanStatus.PENDING) {
      firstSentence = (
        <>
          <BoldText>{borrowerName}</BoldText> quer pegar emprestado{" "}
          {loan.product?.name}
        </>
      );
      secondSentence = (
        <>
          de {startDate} até {endDate}
        </>
      );
    }

    return (
      <>
        <Text>{firstSentence}</Text>
        <Text size={14} style={styles.endDateText}>
          {secondSentence}
        </Text>
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
