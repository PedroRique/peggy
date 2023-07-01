import { View, StyleSheet, Pressable } from "react-native";
import { BoldText } from "./Text/BoldText";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";

interface HeaderProps {
  title: string;
  hasBack?: boolean;
  onBack?: () => void;
}

export const Header = ({ title, hasBack, onBack }: HeaderProps) => {
  const navigation = useNavigation<StackTypes>();
  return (
    <View style={styles.headerContainer}>
      {hasBack && (
        <Pressable onPress={() => (onBack ? onBack() : navigation.goBack())}>
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
