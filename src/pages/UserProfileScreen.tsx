import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
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
import { Product } from "../models/Product";
import {
  fetchCurrentUserData,
} from "../services/user.service";
import { fetchProductsById } from "../services/product.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { userSlice } from "../store/slices/user.slice";
import { fetchUserDataById } from "../services/utils.service";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { getRate } from "../services/rating.service";

export default function UserProfileScreen() {
  const SectionHeader = ({
    title,
  }: {
    title: string;
  }) => {
    const navigation = useNavigation<StackTypes>();

    return (
      <View style={styles.myHeader}>
        <BoldText style={styles.myHeaderTitle}>{title}</BoldText>
      </View>
    );
  };

  const dispatch = useDispatch();
  const route = useRoute();
  const profileUserData = useSelector((state: AppState) => state.user.profileUserData);
  const [products, setProducts] = useState<Product[]>([]);
  const [rate, setRate] = useState<number>();
  const loggedUserId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    if (route.params) {
      const { uid } = route.params as any;
      const loadUserProfile = async () => {
        try {
          const userProfileData = await fetchUserDataById(uid);
          if (userProfileData) {
            const userProducts = await fetchProductsById(uid);
            setProducts(userProducts);
            dispatch(userSlice.actions.setProfileUserData(userProfileData));
          } else {
            console.log("Usuário não encontrado");
          }
        } catch (error) {
          console.error("Erro ao carregar perfil da outra pessoa:", error);
        }
      };

      loadUserProfile();
    }
  }, [route.params]);


  const noBio = "Este usuário não possui uma biografia.";

  const noProduct = "Este usuário não possui nenhum item.";

  const noAddress = "Este usuário não possui nenhum endereço.";

  const navigation = useNavigation<StackTypes>();

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    await getUserProducts();
    await getUserData();
    await getUserRate();
  };
  const getUserRate = async () => {
    const rate = await getRate(profileUserData?.ratings);
    setRate(rate);
  };
  const getUserData = async () => {
    const result = await fetchCurrentUserData();
    dispatch(userSlice.actions.setUserData(result || null));
  };

  const getUserProducts = async () => {
    const result = await fetchProductsById();
    setProducts(result);
  };

  const startChat = () => {
    const profileUid = route.params;

    const ids = [loggedUserId, profileUid];

    ids.sort();
    const combinedIds = ids.join('');
    console.log("IDs combinados em ordem alfabética:", combinedIds);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header hasBorder hasBack />
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            imageUrl={profileUserData?.photoURL}
          />
          <View>
            <View>
              <BoldText style={{ fontSize: '24px' }}>{profileUserData?.name}</BoldText>
              {/* <Rate value={profileUserData?.rate} color={PColors.Blue} /> */}
            </View>
            {profileUserData?.bio ? (
              <Text style={styles.avatarBio}>{profileUserData?.bio}</Text>
            ) : (
              <Text style={styles.avatarBio}>
                {noBio}{" "}
              </Text>
            )}
          </View>
        </View>
        {//Comentado temporariamente
        /* <View>
          <TouchableOpacity
            style={styles.chat}
            onPress={startChat}
          >
            <Feather
              name="message-square"
              color={PColors.Black}
              size={32}
            ></Feather>
            <View style={{ alignItems: "center" }}>
              <BoldText size={24}>Enviar Mensagem</BoldText>
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={styles.myContainer}>
          <SectionHeader
            title="Doações"
          />
          <View style={[!products?.length && styles.products]}>
            {products?.length ? (
              <ProductHorizontalList
                products={products}
              />
            ) : (
              <View style={styles.row}>
                <Text> {noProduct}</Text>
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
        <View style={styles.myContainer}>
          <SectionHeader
            title="Pontos de encontro"
          />
          <View style={styles.addresses}>
            {profileUserData?.addresses?.length ? (
              profileUserData.addresses.map((address, i) => (
                <AddressTile
                  key={i}
                  address={address}
                />
              ))
            ) : (
              <View>
                <View style={styles.row}>
                  <Text> {noAddress}</Text>
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
  myContainer: {
    marginBottom: 32,
    overflow: "visible",
  },
  chat: {
    backgroundColor: "#F3F3F3",
    marginHorizontal: 12,
    marginBottom: 20,
    paddingVertical: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
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
});