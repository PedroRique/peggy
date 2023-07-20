import { ScrollView, StyleSheet } from "react-native";
import { Product } from "../models/Product";
import { ProductCard } from "./ProductCard";
import { useDispatch } from "react-redux";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";

export const ProductHorizontalList = ({
  products,
  showDistance = false,
  hasTrash = false,
}: {
  products?: Product[];
  showDistance?: boolean;
  hasTrash?: boolean;
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  return (
    <ScrollView contentContainerStyle={styles.nearbyProducts} horizontal>
      {products &&
        products?.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            onPress={() => {
              dispatch(loanSlice.actions.setSelectedLoan(null));
              dispatch(productSlice.actions.setSelectedProduct(product));
              navigation.navigate("Product");
            }}
            showDistance={showDistance}
            hasTrash={hasTrash}
            style={{
              marginRight: 12,
            }}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nearbyProducts: {
    gap: 12,
    padding: 16,
  },
});
