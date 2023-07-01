import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StackTypes } from "../../App";
import CategoryBanner from "../components/CategoryBanner";
import { Header } from "../components/Header";
import NearbyProduct from "../components/NerbyProduct";
import { SafeAreaView } from "react-native-safe-area-context";

const NearbyTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleView}>
        <FontAwesome5 name="map-marker-alt" size={24} color="#00C2FF" />
        <Text style={styles.title}>Por perto</Text>
      </View>

      <FontAwesome5 name="arrow-right" size={32} color="#FF9900" />
    </View>
  );
};

const CategoriesTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Categorias</Text>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation<StackTypes>();
  return (
    <SafeAreaView style={styles.container}>
      <Header>Vamos emprestar!</Header>
      <Pressable
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="O que você precisa, Pedro?"
        />
      </Pressable>
      <View>
        <NearbyTitle />
        <ScrollView style={styles.nearbyProducts} horizontal>
          <View style={styles.nearbyProduct}>
            <NearbyProduct
              onPress={() => {
                navigation.navigate("Product");
              }}
            />
          </View>
        </ScrollView>
      </View>

      <View>
        <CategoriesTitle />
        <ScrollView style={styles.categoriesList}>
          <View style={styles.category}>
            <CategoryBanner />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    flex: 1
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 32,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
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
  categoriesList: {
    paddingVertical: 16,
  },
  category: {},
});
