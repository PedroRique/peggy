import { Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PColors } from "../shared/Colors";

export interface RatingProps {
  onRate: (rate: number | null) => void;
}

export const Rating = ({ onRate }: RatingProps) => {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    onRate(rate);
  }, [rate]);

  const getColor = (value: number) => {
    if (!rate) return PColors.Grey;

    return value <= rate ? PColors.Blue : PColors.Grey;
  };

  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((value, i) => {
        return (
          <Pressable key={i} onPress={() => setRate(value)}>
            <Octicons
              name="star-fill"
              color={getColor(value)}
              size={48}
            ></Octicons>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
});
