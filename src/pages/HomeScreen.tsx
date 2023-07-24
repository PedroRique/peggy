import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import CategoryTile from "../components/CategoryTile";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { ProductHorizontalList } from "../components/ProductsHorizontalList";
import { Text } from "../components/Text/Text";
import { Product } from "../models/Product";
import { fetchCategories } from "../services/category.service";
import { fetchProducts } from "../services/product.service";
import { fetchCurrentUserData } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { categorySlice } from "../store/slices/category.slice";
import { userSlice } from "../store/slices/user.slice";

const NearbyTitle = () => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleView}>
        <Feather name="map-pin" size={24} color={PColors.Blue} />
        <Text style={styles.title}>Por perto</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Nearby")}>
        <FontAwesome5 name="arrow-right" size={32} color={PColors.Orange} />
      </TouchableOpacity>
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

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    getCategories();
    getProducts();
    getUserData();
  };

  const getUserData = async () => {
    const result = await fetchCurrentUserData();
    dispatch(userSlice.actions.setUserData(result || null));
  };

  const getCategories = async () => {
    const result = await fetchCategories();
    dispatch(categorySlice.actions.setCategories(result));
  };

  const getProducts = async () => {
    const result = await fetchProducts();
    setProducts(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header>Vamos emprestar!</Header>

        <View style={{ paddingHorizontal: 16 }}>
          <TextInput
            placeholder="O que você precisa, Pedro?"
            onFocus={() => navigation.navigate("Search")}
          />
        </View>

        <NearbyTitle />
        <ProductHorizontalList products={products} showDistance />

        <CategoriesTitle />
        <ScrollView contentContainerStyle={styles.categoriesList}>
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
  scrollContainer: {},
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 12,
    paddingHorizontal: 16,
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
  categoriesList: {
    display: "flex",
    gap: 16,
    paddingHorizontal: 16,
  },
});
