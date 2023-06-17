import { Text, View, StyleSheet } from "react-native";
import { BiRightArrowAlt, BiMap } from "react-icons/bi";

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleView}>
        <BiMap size={44} color="#00C2FF" />
        <Text style={styles.title}>Por perto</Text>
      </View>

      <BiRightArrowAlt size={50} color="#FF9900" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
