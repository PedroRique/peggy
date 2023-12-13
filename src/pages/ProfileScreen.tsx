import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { StackTypes } from "../../App";
import AddressTile from "../components/AddressTile";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import { ProductHorizontalList } from "../components/ProductsHorizontalList";
import { Rate } from "../components/Rate";
import { BoldText } from "../components/Text/BoldText";
import { Text } from "../components/Text/Text";
import { ImageFolder } from "../models/ImageFolder.enum";
import { Product } from "../models/Product";
import { pickImage } from "../services/camera.service";
import { fetchProductsById } from "../services/product.service";
import {
  fetchCurrentUserData,
  updateUserPhotoURL,
} from "../services/user.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { userSlice } from "../store/slices/user.slice";
import { Address } from "../models/Address";
const coin = require("../../assets/images/coin.png");

const SectionHeader = ({
  title,
  route,
  onAdd,
}: {
  title: string;
  route: any;
  onAdd: () => void;
}) => {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.myHeader}>
      <BoldText style={styles.myHeaderTitle}>{title}</BoldText>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          navigation.navigate(route, { onAdd });
        }}
      >
        <Feather name="plus" color={PColors.White} size={32} />
      </Pressable>
    </View>
  );
};

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const userData = useSelector((state: AppState) => state.user.UserData);
  const [products, setProducts] = useState<Product[]>([]);

  const noBio = "Você não possui uma biografia.";

  const navigation = useNavigation<StackTypes>();

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = () => {
    getUserProducts();
    getUserData();
  };

  const getUserData = async () => {
    const result = await fetchCurrentUserData();
    dispatch(userSlice.actions.setUserData(result || null));
  };

  const getUserProducts = async () => {
    const result = await fetchProductsById();
    setProducts(result);
  };


  const getPhotoUrl = async (source: "gallery") => {
    const result = await pickImage(ImageFolder.USERS, source);
    updateUserPhotoURL(result);
    dispatch(
      userSlice.actions.setUserData({
        ...userData,
        photoURL: result,
      })
    );
  };  

    // const createThreeButtonAlert = () =>
  //   Alert.alert('Choose a Photo Source', 'Select the source for your photo', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Gallery',
  //       onPress: () => getPhotoUrl('gallery'),
  //     },
  //     {
  //       text: 'Camera',
  //       onPress: () => getPhotoUrl('camera'),
  //     },
  //   ]);

  const hasAddress = !!userData?.addresses?.length;
  const hasMoreThanOneAddress =
    hasAddress && (userData?.addresses?.length || 0) > 1;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Seu perfil"} hasBorder hasMore />
      <ScrollView>
        <View style={styles.avatarContainer}>
        <Avatar
            size={100}
            imageUrl={userData?.photoURL}
            onPress={() => getPhotoUrl("gallery")}
          />

          <View>
            <View>
              <BoldText style={styles.font}>{userData?.name}</BoldText>
              {/* <Rate value={userData?.rate} color={PColors.Blue} /> */}
            </View>
            {userData?.bio ? (
              <Text style={styles.avatarBio}>{userData?.bio}</Text>
            ) : (
              <Text style={styles.avatarBio}>
                {noBio}{" "}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}
                >
                  <Text color={PColors.Blue}>Adicione.</Text>
                </TouchableOpacity>
              </Text>
            )}
          </View>
        </View>
        {//Comentado temporariamente
        /* <View style={styles.peggiesContainer}>
          <BoldText size={20} style={styles.peggiesText}>
            Você possui:
          </BoldText>
          <View style={styles.row}>
            <Image source={coin} style={styles.coinIcon} />
            <Text size={36} weight="900">
              {userData?.balance || 0}
            </Text>
            <BoldText size={16}>Peggies</BoldText>
          </View>
        </View> */}

        {hasAddress && (
          <View style={styles.myContainer}>
            <SectionHeader
              title="Doações"
              route="NewProduct"
              onAdd={getProfileInfo}
            />
            <View style={[!products?.length && styles.products]}>
              {products?.length ? (
                <ProductHorizontalList products={products} hasTrash />
              ) : (
                <View style={styles.row}>
                  <Text>Você não possui nenhum item.</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("NewProduct", {
                        onAdd: () => getProfileInfo(),
                      });
                    }}
                  >
                    <Text color={PColors.Blue}> Adicione.</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={styles.myContainer}>
          <SectionHeader
            title="Pontos de encontro"
            route="NewAddress"
            onAdd={getProfileInfo}
          />
          <View style={styles.addresses}>
            {userData?.addresses?.length ? (
              userData.addresses.map((address: Address, i: React.Key | null | undefined) => (
                <AddressTile
                  key={i}
                  address={address}
                  hasTrash={hasMoreThanOneAddress}
                  onDelete={() => getProfileInfo()}
                />
              ))
            ) : (
              <View>
                <View style={styles.row}>
                  <Text>Você não possui nenhum endereço.</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("NewAddress", {
                        onAdd: () => getProfileInfo(),
                      });
                    }}
                  >
                    <Text color={PColors.Blue}> Adicione.</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.noAddressWarn}>
                  <Text>
                    Para que você possa adicionar items, primeiro adicione um
                    endereço. Seus endereços serão seus{" "}
                    <BoldText>pontos de encontro</BoldText> com quem desejar
                    doar algum item seu.
                  </Text>
                </View>
              </View>
            )}
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
  font:{
    fontSize:24
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
    overflow: "hidden",
    width: 240,
  },
  peggiesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: PColors.LightOrange,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 7,
    marginBottom: 32,
    marginHorizontal: 16,
  },
  peggiesText: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  peggiesTextBig: {
    lineHeight: 24,
  },
  coinIcon: {
    width: 40,
    height: 40,
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
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  addresses: {
    display: "flex",
    paddingHorizontal: 16,
    gap: 12,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  noAddressWarn: {
    backgroundColor: PColors.LightBlue,
    borderRadius: 7,
    padding: 16,
    marginTop: 16,
    gap: 6,
  },
});