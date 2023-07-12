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
import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";

interface ProductCardProps
  extends Pick<TouchableOpacityProps, "style" | "onPress"> {
  product: Product;
  showDistance?: boolean;
  hasShadow?: boolean;
  hasName?: boolean;
  size?: number;
}

export const ProductCard = ({
  style,
  product,
  onPress,
  size = 150,
  showDistance = false,
  hasShadow = true,
  hasName = true,
  ...rest
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.productContainer, style, { width: size }]}
      {...rest}
    >
      <ImageBackground
        style={[
          styles.product,
          hasShadow && styles.shadowStyle,
          { width: size, height: size },
        ]}
        source={{ uri: product.imageUrl }}
        resizeMode="cover"
      >
        {showDistance && (
          <View style={styles.distanceContainer}>
            <Feather name="map-pin" size={16} color={PColors.Blue} />
            <Text style={styles.distance}>650m</Text>
          </View>
        )}
      </ImageBackground>
      {hasName && (
        <BoldText style={{ marginTop: 16 }}>
          {product.name}
        </BoldText>
      )}
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
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 8,
    backgroundColor: PColors.White,
    overflow: "hidden",
  },
  productContainer: {
    backgroundColor: PColors.White
  },
  shadowStyle: {
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});
