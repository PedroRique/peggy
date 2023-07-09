import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Product } from "../models/Product";
import { UserData } from "../models/UserData";
import { fetchProductsById } from "../services/product.service";
import { pickImage } from "../services/camera.service";
import { userSlice } from "../store/slices/user.slice";
import { fetchUserData, updateUserPhotoURL } from "../services/user.service";
import { AppState } from "../store";
import { ImageFolder } from "../models/ImageFolder.enum";
import { Text } from "../components/Text/Text";
import AddressTile from "../components/AddressTile";
import { Address } from "../models/Address";

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
        <Feather name="plus" color={"#fff"} size={32} />
      </Pressable>
    </View>
  );
};

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const profile: UserData | null = useSelector(
    (state: AppState) => state.user.profile
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    getUserProducts();
    getUserData();
  }, []);

  const getUserData = async () => {
    const result = await fetchUserData(profile?.uid);
    setUserData(result);
  };

  const getUserProducts = async () => {
    const result = await fetchProductsById(profile?.uid || "");
    setProducts(result);
  };

  const getPhotoUrl = async () => {
    const result = await pickImage(ImageFolder.USERS);
    updateUserPhotoURL(result);
    dispatch(
      userSlice.actions.setProfile({
        ...profile!,
        photoURL: result,
      })
    );
  };

  const { name, photoURL, addresses } = profile || {};

  return (
    <SafeAreaView style={styles.container}>
      <Header title={name} hasBack hasBorder />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <Avatar size={100} imageUrl={photoURL} onPress={getPhotoUrl} />
          <View>
            <Rating value={4.7} color="#00C2FF" />
            <Text style={styles.avatarBio}>
              Carioca, 27 anos. Itens com ótimo estado.
            </Text>
          </View>
        </View>

        <View style={styles.peggiesContainer}>
          <BoldText style={styles.peggiesText}>Você possui:</BoldText>
          <BoldText style={styles.peggiesText}>
            <Text style={styles.peggiesTextBig}>120</Text> Peggies
          </BoldText>
        </View>

        <View style={styles.myContainer}>
          <SectionHeader title="Seus produtos" route="NewProduct" />
          <View style={styles.products}>
            {products.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                style={{ minWidth: "calc(50% - 6px)" }}
              ></ProductCard>
            ))}
          </View>
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
    padding: 16,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 48,
    marginTop: 12,
  },
  avatarBio: {
    color: "#777777",
    fontSize: 16,
    width: "70%",
  },
  peggiesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 7,
    marginBottom: 32,
  },
  peggiesText: {
    fontSize: 24,
    display: "flex",
    alignItems: "center",
  },
  peggiesTextBig: {
    fontSize: 32,
    lineHeight: 24,
  },
  myContainer: {
    marginBottom: 32,
  },
  myHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  myHeaderTitle: {
    fontSize: 24,
  },
  addButton: {
    backgroundColor: "#00C2FF",
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
    gap: 12,
  },
});
