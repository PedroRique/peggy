import React, { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { BoldText } from "../components/Text/BoldText";
import { useLazyEffect } from "../hooks/useLazyEffect";
import { Product } from "../models/Product";
import { searchProducts } from "../services/product.service";
import { Text } from "../components/Text/Text";
const noSearch = require("../../assets/images/noSearch/noSearch.png");

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useLazyEffect(() => {
    search();
  }, [searchText]);

  const search = async () => {
    if (searchText) {
      const result = await searchProducts(searchText);
      setProducts(result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Buscar" hasBack />
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que você precisa, Pedro?"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          autoFocus
        />

        {products.length && searchText ? (
          <View style={styles.resultContainer}>
            {products.map((prod, i) => (
              <BoldText key={i}>{prod.name}</BoldText>
            ))}
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={noSearch}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.imageText}>
              Seu vizinho pode ter o que você está procurando{" "}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  bodyContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageText: {
    fontSize: 20,
    textAlign: "center",
    width: 160,
    color: "#777777",
  },
  resultContainer: {
    paddingVertical: 16,
  },
});
