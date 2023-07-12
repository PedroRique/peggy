import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import AddressTile from "../components/AddressTile";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Text } from "../components/Text/Text";
import { ImageFolder } from "../models/ImageFolder.enum";
import { Product } from "../models/Product";
import { UserData } from "../models/UserData";
import { pickImage } from "../services/camera.service";
import { fetchProductsById } from "../services/product.service";
import {
  fetchCurrentUserData,
  fetchUserData,
  updateUserPhotoURL,
} from "../services/user.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { userSlice } from "../store/slices/user.slice";
import { ProductHorizontalList } from "../components/ProductsHorizontalList";

const SectionHeader = ({ title, route }: { title: string; route: any }) => {
  const navigation = useNavigation<StackTypes>();
  return (
    <View style={styles.myHeader}>
      <BoldText style={styles.myHeaderTitle}>{title}</BoldText>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          navigation.navigate(route);
        }}
      >
        <Feather name="plus" color={PColors.White} size={32} />
      </Pressable>
    </View>
  );
};

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userData = useSelector((state: AppState) => state.user.userData);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getUserProducts();
    getUserData();
  }, []);

  const getUserData = async () => {
    const result = await fetchCurrentUserData();
    dispatch(userSlice.actions.setUserData(result || null));
  };

  const getUserProducts = async () => {
    const result = await fetchProductsById();
    setProducts(result);
  };

  const getPhotoUrl = async () => {
    const result = await pickImage(ImageFolder.USERS);
    updateUserPhotoURL(result);
    dispatch(
      userSlice.actions.setUserData({
        ...userData,
        photoURL: result,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={userData?.name} hasBorder />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            imageUrl={userData?.photoURL}
            onPress={getPhotoUrl}
          />
          <View>
            <Rating value={4.7} color={PColors.Blue} />
            <Text style={styles.avatarBio}>
              Carioca, 27 anos. Itens com ótimo estado.
            </Text>
          </View>
        </View>

        <View style={styles.myContainer}>
          <SectionHeader title="Seus produtos" route="NewProduct" />
          <ProductHorizontalList products={products} />
        </View>

        <View style={styles.myContainer}>
          <SectionHeader title="Seus endereços" route="NewAddress" />
          <View style={styles.addresses}>
            {!!userData?.addresses?.length &&
              userData.addresses.map((address, i) => (
                <AddressTile key={i} address={address}></AddressTile>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingVertical: 16,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 48,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  avatarBio: {
    color: PColors.Grey,
    fontSize: 16,
    width: "70%",
  },
  myContainer: {
    marginBottom: 32,
    overflow: "visible",
  },
  myHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  myHeaderTitle: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: PColors.Blue,
    borderRadius: 5,
    padding: 4,
    paddingHorizontal: 5,
  },
  products: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  addresses: {
    display: "flex",
    paddingHorizontal: 16,
    gap: 12,
  },
});
