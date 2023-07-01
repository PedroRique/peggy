import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
const noSearch = require("../../assets/images/noSearch/noSearch.png");

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Buscar" hasBack />
      <TextInput
        style={styles.input}
        placeholder="O que você precisa, Pedro?"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        autoFocus
      />
      <View style={styles.imageContainer}>
        <Image source={noSearch} style={styles.image} resizeMode="contain" />
        <Text style={styles.imageText}>
          Seu vizinho pode ter o que você está procurando{" "}
        </Text>
      </View>
    </SafeAreaView>
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
});
