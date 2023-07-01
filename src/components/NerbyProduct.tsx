import { FontAwesome5 } from "@expo/vector-icons";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "../services/products.service";

interface NearbyProductProps {
  onPress: () => void;
  product: Product;
}

export default function NearbyProduct(props: NearbyProductProps) {
  const { onPress, product } = props;
  return (
    <Pressable style={styles.productContainer} onPress={() => onPress()}>
      <ImageBackground
        style={styles.product}
        source={{ uri: product.imageUrl }}
        resizeMode="cover"
      >
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
    marginLeft: 4,
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
