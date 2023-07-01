import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
const noSearch = require("../../assets/images/noSearch/noSearch.png");

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");

  return (
    
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome5 name="arrow-left" size={32} color="#000000" />
        <View style={styles.titleView}>
          <Text style={styles.title}>Buscar</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="O que você precisa, Pedro?"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
        <View style={styles.imageContainer}>
        <Image
         source={noSearch} 
          style={styles.image}
          resizeMode="contain"
        />
           <Text style={styles.imageText}>Seu vizinho pode ter o que você está procurando </Text>
      </View>
    </View>
 
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 16,
    backgroundColor:"#FFFFFF",
    height:'100%',
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 16,
  },
  titleView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 8,
  },
  input: {
    margin: 8,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 18,
    marginVertical: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    
  },
  image: {
    width: 200,
    height: 200,
  },
  imageText: {
    fontSize: 20,
    textAlign: "center",
    width: 160,
    color: "#777777"}
});
