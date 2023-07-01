import { View, StyleSheet, Pressable } from "react-native";
import { BoldText } from "./Text/BoldText";
import { FontAwesome5 } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  hasBack?: boolean;
  onBack?: () => void;
}

export const Header = ({ title, hasBack, onBack }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {hasBack && onBack && (
        <Pressable onPress={() => onBack()}>
          <FontAwesome5 name="arrow-left" size={32} color="#000" />
        </Pressable>
      )}
      <BoldText style={styles.title}>{title}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  title: {
    fontSize: 32,
  },
});
