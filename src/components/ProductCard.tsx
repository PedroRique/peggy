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
import { Colors } from "../shared/Colors";

interface ProductCardProps
  extends Pick<TouchableOpacityProps, "style" | "onPress"> {
  product: Product;
  showDistance?: boolean;
  hasShadow?: boolean;
  size?: number;
}

export const ProductCard = ({
  style,
  product,
  onPress,
  size = 150,
  showDistance = false,
  hasShadow = true,
  ...rest
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.productContainer,
        style,
        { width: size, height: size },
        hasShadow && styles.shadowStyle,
      ]}
      {...rest}
    >
      <ImageBackground
        style={styles.product}
        source={{ uri: product.imageUrl }}
        resizeMode="cover"
      >
        {showDistance && (
          <View style={styles.distanceContainer}>
            <Feather name="map-pin" size={16} color={Colors.Blue} />
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
    borderRadius: 8,
    backgroundColor: Colors.White,
    overflow: "hidden",
  },
  shadowStyle: {
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
},
});
