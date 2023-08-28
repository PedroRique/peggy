import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Address } from "../models/Address";
import { LoanStatus } from "../models/Loan";
import { Product } from "../models/Product";
import { removeProduct } from "../services/product.service";
import {
  calculateDistance,
  convertFloatToDistance,
} from "../services/utils.service";
import { PColors } from "../shared/Colors";
import ConfirmationModal from "./ConfirmationModal";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";
interface ProductCardProps extends TouchableOpacityProps {
  product: Product;
  loanStatus?: LoanStatus;
  showDistance?: boolean;
  hasShadow?: boolean;
  hasName?: boolean;
  hasTrash?: boolean;
  size?: number;
  address?: Address;
}

export const ProductCard = ({
  style,
  product,
  onPress,
  loanStatus,
  size = 150,
  showDistance = false,
  hasShadow = true,
  hasName = true,
  hasTrash = false,
  address,
  ...rest
}: ProductCardProps) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const distance = useMemo(() => {
    if (address && product) {
      const { latitude, longitude } = address;
      const { coordinates } = product;
      if (
        latitude &&
        longitude &&
        coordinates?.latitude &&
        coordinates?.longitude
      ) {
        const distance = calculateDistance(
          latitude,
          longitude,
          coordinates.latitude,
          coordinates.longitude
        );
        return convertFloatToDistance(distance);
      }
    }
  }, [address, product]);

  const handleDeleteConfirm = () => {
    setIsConfirmationVisible(false);
    setIsRemoved(true);
    removeProduct(product.uid)
      .then(() => {
        console.log("Produto excluído com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir o produto:", error);
      });
  };

  const handleDeleteCancel = () => {
    setIsConfirmationVisible(false);
  };

  const remove = () => {
    setIsConfirmationVisible(true);
  };

  return (
    <>
      {!isRemoved && (
        <TouchableOpacity
          style={[styles.productContainer, style, { width: size }]}
          {...rest}
          disabled={!onPress}
          onPress={onPress}
        >
          <ImageBackground
            style={[
              styles.product,
              hasShadow && styles.shadowStyle,
              { width: size, height: size },
            ]}
            source={{ uri: product.mainImageUrl }}
            resizeMode="cover"
          >
            {showDistance && (
              <View style={styles.distanceContainer}>
                <Feather name="map-pin" size={16} color={PColors.Blue} />
                <Text style={styles.distance}>{distance}</Text>
              </View>
            )}
          </ImageBackground>
          <View style={styles.rowContainer}>
            {hasName && (
              <BoldText style={{ marginTop: 16 }}>{product.name}</BoldText>
            )}
            {hasTrash && !product.locked && (
              <TouchableOpacity onPress={remove}>
                <Feather
                  name="trash-2"
                  color={PColors.Orange}
                  size={24}
                  style={{ marginTop: 12 }}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      )}

      {isConfirmationVisible && (
        <ConfirmationModal
          visible={isConfirmationVisible}
          question="Tem certeza que deseja excluir este produto?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  distanceContainer: {
    backgroundColor: PColors.White,
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
    backgroundColor: PColors.White,
  },
  shadowStyle: {
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
