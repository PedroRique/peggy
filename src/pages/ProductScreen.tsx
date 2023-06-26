import { FontAwesome5 } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
const goPro = require("../../assets/images/products/go-pro.jpg");

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.product} source={goPro} resizeMode="cover">
        <View style={styles.headerContainer}>
          <FontAwesome5 name="arrow-left" size={32} color="#FFF" />

          <Text style={styles.ratingText}>4.7</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  product: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 200,
    padding: 16,
  },
  headerContainer: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white'
  },
});
