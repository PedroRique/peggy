import { Image, StyleSheet, View } from "react-native";
import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";
const coin = require("../../assets/images/coin.png");

export const PriceTag = ({ price = 0 }: { price?: number }) => {
  return (
    <View style={styles.priceTag}>
      <Image source={coin} style={styles.coinIcon} />
      <BoldText size={24}>{price}<Text>/dia</Text></BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  priceTag: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: PColors.LightOrange,
  },
  coinIcon: {
    width: 30,
    height: 30,
  },
});
