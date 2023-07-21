import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Address } from "../models/Address";
import { removeAddress } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { BoldText } from "./Text/BoldText";
import { Text } from "./Text/Text";
import ConfirmationModal from "./ConfirmationModal";

type AddressTileProps = TouchableOpacityProps & { address: Address };

export default function AddressTile({ address, ...rest }: AddressTileProps) {
  const [isRemoved, setIsRemoved] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleDeleteConfirm = () => {
    setIsConfirmationVisible(false);
    setIsRemoved(true);
    removeAddress(address);
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
        <TouchableOpacity style={styles.addressContainer} {...rest}>
          <Feather name="map-pin" color={PColors.Blue} size={32}></Feather>
          <View style={styles.addressText}>
            <BoldText size={18}>
              {address.street} {address.number}
            </BoldText>
            <Text size={14}>
              {address.complement && `${address.complement} - `}
              {address.city}
            </Text>
          </View>

          <Pressable onPress={remove}>
            <Feather name="trash-2" color={PColors.Orange} size={24}></Feather>
          </Pressable>
        </TouchableOpacity>
      )}
      <ConfirmationModal
        visible={isConfirmationVisible}
        question="Tem certeza que deseja excluir esse endereço?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: PColors.White,
    gap: 12,
    padding: 16,
  },
  addressText: {
    flex: 1,
  },
});
