import { Text, View, StyleSheet, ScrollView } from "react-native";
import { BiRightArrowAlt, BiMap } from "react-icons/bi";
import NearbyProduct from "../components/NerbyProduct";

const NearbyTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleView}>
        <BiMap size={44} color="#00C2FF" />
        <Text style={styles.title}>Por perto</Text>
      </View>

      <BiRightArrowAlt size={50} color="#FF9900" />
    </View>
  );
};

const CategoriesTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Categorias</Text>
      <BiRightArrowAlt size={50} color="#FF9900" />
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <NearbyTitle />

      <ScrollView style={styles.nearbyProducts} horizontal>
        <View style={styles.nearbyProduct}>
          <NearbyProduct />
        </View>
      </ScrollView>
      <CategoriesTitle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 8,
  },
  nearbyProducts: {
    paddingVertical: 16,
    gap: 12,
  },
  nearbyProduct: {
    marginRight: 12,
  },
});
