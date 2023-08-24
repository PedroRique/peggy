import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import DropdownButton from "../components/DropdownButton.js";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import {
  fetchProductCoordinates,
  fetchProducts,
} from "../services/product.service";
import { formatAddressLabel } from "../services/utils.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { loanSlice } from "../store/slices/loan.slice";
import { productSlice } from "../store/slices/product.slice";

export const NearbyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackTypes>();
  const products = useSelector((state: AppState) => state.product.nearProducts);

  const [showMyAddressesDropDown, setShowMyAddressesDropDown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const currentUserData = useSelector((state: AppState) => state.user.userData);

  useEffect(() => {
    fetchProducts()
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
          <FlatList
            style={styles.products}
            data={products}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            renderItem={({ item }) => (
              <ProductCard
                key={item.uid}
                product={item}
                onPress={async () => {
                  dispatch(loanSlice.actions.setSelectedLoan(null));
                  dispatch(productSlice.actions.setSelectedProduct(item));
                  navigation.navigate("Product");

                  const coordinates = await fetchProductCoordinates(item.uid!);
                  console.log("Coordinates for product:", coordinates);
                }}
              ></ProductCard>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ></FlatList>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: PColors.White,
  },
  scrollContainer: {
    padding: 16,
  },
  dropdownContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  center: {
    alignItems: "center",
  },
  products: {
    width: "100%",
  },
});

export default NearbyScreen;
