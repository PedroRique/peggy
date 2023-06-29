import { FontAwesome } from "@expo/vector-icons";
import { BoldText } from "./Text/BoldText";
import { StyleSheet } from "react-native";

export const Rating = ({ color }: { color: string }) => {
  return (
    <BoldText style={[styles.ratingTextSize, { color }]}>
      4.7 <FontAwesome name="star" size={24} color={color} />
    </BoldText>
  );
};

const styles = StyleSheet.create({
  ratingTextSize: {
    fontSize: 32,
  },
});
