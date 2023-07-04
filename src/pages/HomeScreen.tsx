import { FontAwesome5 } from "@expo/vector-icons";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import CategoryBanner from "../components/CategoryBanner";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import NearbyProduct from "../components/NerbyProduct";
import { Product } from "../models/Product";
import { fetchCategories } from "../services/categories.service";
import { fetchProducts } from "../services/products.service";
import { categoriesSlice } from "../store/categories";

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
  const categories = useSelector((state: any) => state.categories);
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>();
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    getCategories();
    getProducts();
    getCurrentPosition();
  }, []);

  const getCategories = async () => {
    const result = await fetchCategories();
    dispatch(categoriesSlice.actions.setCategories(result));
  };

  const getProducts = async () => {
    const result = await fetchProducts();
    setProducts(result);
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition((info) =>
      setCurrentPosition({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header>Vamos emprestar!</Header>
      <Pressable
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <TextInput placeholder="O que você precisa, Pedro?" />
      </Pressable>
      <View>
        <NearbyTitle />
        <ScrollView style={styles.nearbyProducts} horizontal>
          {products?.map((product, i) => (
            <View key={i} style={styles.nearbyProduct}>
              <NearbyProduct
                product={product}
                onPress={() => {
                  navigation.navigate("Product");
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <View>
        <CategoriesTitle />
        <ScrollView style={styles.categoriesList}>
          <View style={styles.category}>
            {categories?.map((category: any, i: any) => (
              <CategoryBanner key={i} category={category} />
            ))}
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
    flex: 1,
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
