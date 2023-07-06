import { FontAwesome5 } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlightProps,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Product } from "../models/Product";

interface ProductCardProps
  extends Pick<TouchableHighlightProps, "style" | "onPress"> {
  product: Product;
  showDistance?: boolean;
}

export const ProductCard = ({
  style,
  product,
  showDistance = false,
  ...rest
}: ProductCardProps) => {
  return (
    <TouchableHighlight style={[styles.productContainer, style]} {...rest}>
      <ImageBackground
        style={styles.product}
        source={{ uri: product.imageUrl }}
        resizeMode="cover"
      >
        {showDistance && (
          <View style={styles.distanceContainer}>
            <FontAwesome5 name="map-marker-alt" size={16} color="#00C2FF" />
            <Text style={styles.distance}>650m</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableHighlight>
  );
};

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
