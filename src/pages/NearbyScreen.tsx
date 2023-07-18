import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { BoldText } from "../components/Text/BoldText";
import { AppState } from "../store";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";

export const NearbyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const products = useSelector((state: AppState) => state.product.nearProducts);

  return (
    <View>
      <Header title={"Por perto"} hasBack />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoldText size={24}>Onde você está?</BoldText>

        <TextInput placeholder="Selecione um endereço" />

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },

  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
