import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { LoanWithInfo } from "../models/Loan";
import { Colors } from "../shared/Colors";
import { ProductCard } from "./ProductCard";
import { Text } from "./Text/Text";
import { BoldText } from "./Text/BoldText";

type LoanTileProps = TouchableOpacityProps & { loan: LoanWithInfo };

export default function LoanTile({ loan, ...rest }: LoanTileProps) {
  return (
    <TouchableOpacity style={styles.tileContainer} {...rest}>
      {loan.product && (
        <ProductCard size={60} product={loan.product} hasShadow={false} />
      )}
      <View style={styles.loanText}>
        <Text weight="700">
          {loan.product?.name} está com{" "}
          <BoldText>{loan.borrower?.name}</BoldText>
        </Text>
        <Text size={14} style={styles.endDateText}>
          até {loan.endDate}
        </Text>
      </View>

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
