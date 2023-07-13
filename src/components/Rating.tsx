import { FontAwesome } from "@expo/vector-icons";
import { BoldText } from "./Text/BoldText";
import { StyleSheet } from "react-native";
import { PColors } from "../shared/Colors";

export const Rating = ({
  color = PColors.Blue,
  value,
}: {
  color?: string;
  value: number;
}) => {
  return (
    <BoldText style={[styles.ratingTextSize, { color }]} numberOfLines={1}>
      {value} <FontAwesome name="star" size={24} color={color} />
    </BoldText>
  );
};

const styles = StyleSheet.create({
  ratingTextSize: {
    fontSize: 32,
    fontFamily: "RedHatDisplay",
    minWidth: 80,
  },
});
