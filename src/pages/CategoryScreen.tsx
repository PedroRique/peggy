import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { BoldText } from "../components/Text/BoldText";
import { Product } from "../models/Product";
import { fetchProductsByCategory } from "../services/product.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";
import React from "react";

export default function CategoryScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const selectedCategory = useSelector(
    (state: AppState) => state.category.selectedCategory
  );

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getUserProducts();
  }, []);

  const getUserProducts = async () => {
    const result = await fetchProductsByCategory(selectedCategory?.id || "");
    setProducts(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.banner}
        source={{ uri: selectedCategory?.imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.bannerInner}>
          <Header hasBack color={PColors.White}></Header>
        </View>
      </ImageBackground>

      <View style={styles.categoryBody}>
        <View style={styles.categoryTitle}>
          <Feather
            name={selectedCategory?.icon as any}
            color={PColors.Blue}
            size={32}
          ></Feather>
          <BoldText size={32}>{selectedCategory?.name}</BoldText>
        </View>

        {products.length > 0 ? (
          <View style={styles.products}>
            {products.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                onPress={() => {
                  dispatch(loanSlice.actions.setSelectedLoan(null));
                  dispatch(productSlice.actions.setSelectedProduct(product));
                  navigation.navigate("Product");
                }}
              ></ProductCard>
            ))}
          </View>
        ) : (
          <View style={styles.noItensCategory}>
            <BoldText>Não há itens ainda para essa categoria </BoldText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  banner: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bannerInner: {
    height: 150,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  categoryBody: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  categoryTitle: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent:"space-evenly"
  },
  noItensCategory: {
    backgroundColor: PColors.LightBlue,
    textAlign:"center",
    borderRadius: 7,
    padding: 16,
    marginTop: 16,
    gap: 6,
    
  },
});
