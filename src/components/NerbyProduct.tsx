import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View, ImageBackground, Text, Pressable } from "react-native";
const goPro = require("../../assets/images/products/go-pro.jpg");

export default function NearbyProduct(props: any) {
  const { onPress } = props;
  return (
    <Pressable style={styles.productContainer} onPress={() => onPress()}>
      <ImageBackground style={styles.product} source={goPro} resizeMode="cover">
        <View style={styles.distanceContainer}>
          <FontAwesome5 name="map-marker-alt" size={16} color="#00C2FF" />
          <Text style={styles.distance}>650m</Text>
        </View>
      </ImageBackground>
    </Pressable>
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
    fontWeight: "bold",
    marginLeft: 4
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
