import { StyleSheet, View, ImageBackground, Text } from "react-native";
const goPro = require("../../assets/images/products/go-pro.jpg");

export default function NearbyProduct() {
  return (
    <View style={styles.productContainer}>
      <ImageBackground style={styles.product} source={goPro} resizeMode="cover">
        <View style={styles.distanceContainer}>
          <Text style={styles.distance}>650m</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  distanceContainer: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontWeight: 'bold',
  },
  product: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  productContainer: {
    width: 150,
    height: 150,
    elevation: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
});
