import { View, StyleSheet, Pressable } from "react-native";
import { BoldText } from "./Text/BoldText";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";

interface HeaderProps {
  title?: string | null;
  hasBack?: boolean;
  hasBorder?: boolean;
  onBack?: () => void;
  children?: any;
  color?: string;
}

export const Header = ({
  children,
  title,
  hasBack,
  hasBorder,
  onBack,
  color,
}: HeaderProps) => {
  const navigation = useNavigation<StackTypes>();
  return (
    <View style={[styles.headerContainer, hasBorder && styles.hasBorderStyles]}>
      {hasBack && (
        <Pressable onPress={() => (onBack ? onBack() : navigation.goBack())}>
          <FontAwesome5 name="arrow-left" size={32} color={color} />
        </Pressable>
      )}
      <BoldText style={[styles.title, { color }]}>{children || title}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  hasBorderStyles: {
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: "RedHatDisplay",
  },
});
