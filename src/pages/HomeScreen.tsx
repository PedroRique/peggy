import { Feather, FontAwesome5 } from "@expo/vector-icons";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import CategoryTile from "../components/CategoryTile";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { Text } from "../components/Text/Text";
import { Product } from "../models/Product";
import { fetchCategories } from "../services/category.service";
import { fetchProducts } from "../services/product.service";
import { Colors } from "../shared/Colors";
import { AppState } from "../store";
import { categorySlice } from "../store/slices/category.slice";
import { productSlice } from "../store/slices/product.slice";
import { loanSlice } from "../store/slices/loan.slice";

const NearbyTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleView}>
        <Feather name="map-pin" size={24} color={Colors.Blue} />
        <Text style={styles.title}>Por perto</Text>
      </View>

      <FontAwesome5 name="arrow-right" size={32} color={Colors.Orange} />
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
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>();
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    getCategories();
    getProducts();
    getCurrentPosition();
  };

  const getCategories = async () => {
    const result = await fetchCategories();
    dispatch(categorySlice.actions.setCategories(result));
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
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header>Vamos emprestar!</Header>
        <Pressable
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <TextInput placeholder="O que você precisa, Pedro?" />
        </Pressable>

        <NearbyTitle />
        <ScrollView style={styles.nearbyProducts} horizontal>
          {products?.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              onPress={() => {
                dispatch(loanSlice.actions.setSelectedLoan(null));
                dispatch(productSlice.actions.setSelectedProduct(product));
                navigation.navigate("Product");
              }}
              showDistance
              style={{
                marginRight: 12,
              }}
            />
          ))}
        </ScrollView>

        <CategoriesTitle />
        <ScrollView
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesList}
        >
          {categories?.map((category: any, i: any) => (
            <CategoryTile
              key={i}
              category={category}
              onPress={() => {
                dispatch(categorySlice.actions.setSelectedCategory(category));
                navigation.navigate("Category");
              }}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 12,
  },
  titleView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "RedHatDisplay",
    marginLeft: 8,
  },
  nearbyProducts: {
    gap: 12,
    padding: 16,
  },
  categoriesList: {
    display: "flex",
    gap: 16,
  },
});
