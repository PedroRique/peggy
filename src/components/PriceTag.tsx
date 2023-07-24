import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";
const coin = require("../../assets/images/coin.png");

export const PriceTag = ({
  price = 0,
  balance = 0,
}: {
  price?: number;
  balance?: number;
}) => {
  const backgroundColor = balance < price ? PColors.RedTransparent : PColors.LightOrange;
  const color = balance < price ? PColors.Red : PColors.Black;
  return (
    <View style={[styles.priceTag, { backgroundColor }]}>
      <Image source={coin} style={styles.coinIcon} />
      <BoldText size={24} style={{ color }}>
        {price}
        <Text>/dia</Text>
      </BoldText>
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
  },
  coinIcon: {
    width: 30,
    height: 30,
  },
});
