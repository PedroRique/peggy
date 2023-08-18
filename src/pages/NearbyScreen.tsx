import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { BoldText } from "../components/Text/BoldText";
import { AppState } from "../store";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";
import React, { useEffect, useState } from "react";
import DropDown from "react-native-paper-dropdown";
import { formatAddressLabel } from "../services/utils.service";
import { fetchProductCoordinates, fetchProducts } from "../services/product.service"; 
import { Product } from "../models/Product"; 
import { PColors } from "../shared/Colors";
import DropdownButton from "../components/DropdownButton.js";

export const NearbyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const products = useSelector((state: AppState) => state.product.nearProducts);

  const [showMyAddressesDropDown, setShowMyAddressesDropDown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const currentUserData = useSelector((state: AppState) => state.user.userData);

  useEffect(() => {
    fetchProducts ()
      .then((result: any) => {
        dispatch(productSlice.actions.setNearProducts(result));
      })
      .catch((error: any) => {
        console.error("", error);
      });
  }, []);

  return (
    <View style={styles.Container}>
      <Header title={"Por perto"} hasBack />

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.dropdownContainer}>
        <DropdownButton
            label={"Onde você está?"}
            options={
              currentUserData && currentUserData.addresses
                ? currentUserData.addresses.map((address) => ({
                    label: formatAddressLabel(address),
                    onPress: () => {
                      setSelectedAddress(formatAddressLabel(address));
                    },
                  }))
                : []
            }
            placeholder={"Selecione um endereço"}
          />
      </View>
      <View style={styles.center}>
        <View style={styles.products}>
          {products.map((product: Product, i: number) => (
            <ProductCard
              key={i}
              product={product}
              address={selectedAddress}
              onPress={async () => {
                dispatch(loanSlice.actions.setSelectedLoan(null));
                dispatch(productSlice.actions.setSelectedProduct(product));
                navigation.navigate("Product");

                const coordinates = await fetchProductCoordinates(product.uid);
                console.log("Coordinates for product:", coordinates);
              }}
              
            ></ProductCard>
          ))}
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    backgroundColor: PColors.White,
  },
  scrollContainer: {
    padding: 16,
  },
  dropdownContainer: {
    marginTop: 10,
    marginBottom: 16
  },
  center: {

    alignItems:"center",

  },
  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,

  },
});

export default NearbyScreen;
