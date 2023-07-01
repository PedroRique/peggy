import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { StackTypes } from "../../App";
import { Header } from "../components/Header";
const noSearch = require("../../assets/images/noSearch/noSearch.png");

export default function SearchScreen() {
  const navigation = useNavigation<StackTypes>();
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <Header
        title="Buscar"
        hasBack
        onBack={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="O que você precisa, Pedro?"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <View style={styles.imageContainer}>
        <Image source={noSearch} style={styles.image} resizeMode="contain" />
        <Text style={styles.imageText}>
          Seu vizinho pode ter o que você está procurando{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
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
});
