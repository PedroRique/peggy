import { Feather } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Product } from "../models/Product";
import { Text } from "./Text/Text";

interface ProductCardProps
  extends Pick<TouchableOpacityProps, "style" | "onPress"> {
  product: Product;
  showDistance?: boolean;
  size?: number;
}

export const ProductCard = ({
  style,
  product,
  onPress,
  size = 150,
  showDistance = false,
  ...rest
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.productContainer, style, { width: size, height: size }]}
      {...rest}
    >
      <ImageBackground
        style={styles.product}
        source={{ uri: product.imageUrl }}
        resizeMode="cover"
      >
        {showDistance && (
          <View style={styles.distanceContainer}>
            <Feather name="map-pin" size={16} color="#00C2FF" />
            <Text style={styles.distance}>650m</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
});
