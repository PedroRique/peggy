import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Product } from "../models/Product";
import { fetchProductsByCategory } from "../services/product.service";
import { AppState } from "../store";

export default function CategoryScreen() {
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
          <Header hasBack color="#fff">
            <Rating color="#fff" />
          </Header>
        </View>
      </ImageBackground>

      <View style={styles.categoryBody}>
        <BoldText style={styles.categoryTitle}>
          <Feather
            name={selectedCategory?.icon as any}
            color={"#00C2FF"}
            size={32}
          ></Feather>
          {selectedCategory?.name}
        </BoldText>

        <View style={styles.products}>
          {products.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              style={{ minWidth: "calc(50% - 6px)" }}
            ></ProductCard>
          ))}
        </View>
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
    paddingHorizontal: 16,
  },
  categoryBody: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  categoryTitle: {
    fontSize: 32,
    marginBottom: 16,
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
