import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
import {
  fetchCurrentUserData,
  updateUserPhotoURL,
} from "../services/user.service";
import { fetchProductsById } from "../services/product.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";
import { userSlice } from "../store/slices/user.slice";
import { fetchUserDataById } from "../services/utils.service";
const coin = require("../../assets/images/coin.png");


export default function ProfileScreen() {
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
   {isOwnProfile &&
          <Pressable
            style={styles.addButton}
            onPress={() => {
              navigation.navigate(route, { onAdd });
            }}
          >
            <Feather name="plus" color={PColors.White} size={32} />
          </Pressable>}
        
      </View>
    );
  };
  
  const dispatch = useDispatch();
  const route = useRoute();
  const currentUserData = useSelector(
    (state: AppState) => state.user.userData
  );
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOwnProfile, setIsOwnProfile] = useState(true);



  useEffect(() => {
    if (route.params) {
      const { uid } = route.params;
      const loadUserProfile = async () => {
        try {
          const userProfileData = await fetchUserDataById(uid);
          if (userProfileData) {
            setIsOwnProfile(currentUserData?.uid === uid);
            const userProducts = await fetchProductsById(isOwnProfile ? currentUserData?.uid : uid);
            setProducts(userProducts);
            dispatch(userSlice.actions.setUserData(userProfileData));
          } else {
            console.log('Usuário não encontrado');
          }
        } catch (error) {
          console.error('Erro ao carregar perfil da outra pessoa:', error);
        }
      };

      loadUserProfile();
    }} , [route.params, currentUserData]);
  

  const noBio = isOwnProfile
    ? "Você não possui uma biografia."
    : "Este usuário não possui uma biografia.";

  const noProduct = isOwnProfile
    ? "Você não possui nenhum item."
    : "Este usuário não possui nenhum item.";

  const noAddress = isOwnProfile
    ? "Você não possui nenhum endereço."
    : "Este usuário não possui nenhum endereço.";

  const navigation = useNavigation<StackTypes>();

  useEffect(() => {
    isOwnProfile &&
    getProfileInfo()
  },[])
  
  const getProfileInfo = async () => {
    await getUserProducts();
    await getUserData();
  };

  const getUserData = async () => {
    const result = await fetchCurrentUserData();
    dispatch(userSlice.actions.setUserData(result || null));
  };

  const getUserProducts = async () => {
    const result = await fetchProductsById();
    setProducts(result);
  };

  const getPhotoUrl =  async (source: "gallery" ) => {
    const result =  await pickImage(ImageFolder.USERS, source);
    updateUserPhotoURL(result);
    dispatch(
      userSlice.actions.setUserData({
        ...currentUserData,
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

  const hasAddress = !!currentUserData?.addresses?.length;
  const hasMoreThanOneAddress =
    hasAddress && (currentUserData?.addresses?.length || 0) > 1;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={currentUserData?.name} hasBorder hasMore={isOwnProfile} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
        <Avatar
            size={100}
            imageUrl={currentUserData?.photoURL}
            onPress={() => getPhotoUrl ("gallery")}
          />

          <View>
            <View>
              <Rate value={currentUserData?.rate} color={PColors.Blue} />
            </View>
            {currentUserData?.bio ? (
              <Text style={styles.avatarBio}>{currentUserData?.bio}</Text>
            ) : (
              <Text style={styles.avatarBio}>
                {noBio}{" "}
                {!isOwnProfile && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("EditProfile");
                    }}
                  >
                    <Text color={PColors.Blue}>Adicione.</Text>
                  </TouchableOpacity>
                )}
              </Text>
            )}
          </View>
        </View>
        {isOwnProfile &&
        <View style={styles.peggiesContainer}>
          <BoldText size={20} style={styles.peggiesText}>
            Você possui:
          </BoldText>
          <View style={styles.row}>
            <Image source={coin} style={styles.coinIcon} />
            <Text size={36} weight="900">
              {currentUserData?.balance || 0}
            </Text>
            <BoldText size={16}>Peggies</BoldText>
          </View>
        </View>}
        {!isOwnProfile && (
          <View>
            <TouchableOpacity style={styles.chat}>
              <Feather name="message-square" color={PColors.Black} size={32}></Feather>
              <View style={{ alignItems: "center" }}>
                <BoldText size={24}>Enviar Mensagem</BoldText>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.myContainer}>
          <SectionHeader
            title="Seus produtos"
            route="NewProduct"
            onAdd={getProfileInfo}
          />
          <View style={[!products?.length && styles.products]}>
            {products?.length ? (
              <ProductHorizontalList products={products} hasTrash={isOwnProfile} />
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
            title="Seus endereços"
            route="NewAddress"
            onAdd={getProfileInfo}
          />
          <View style={styles.addresses}>
            {currentUserData?.addresses?.length ? (
              currentUserData.addresses.map((address, i) => (
                <AddressTile
                  key={i}
                  address={address}
                  hasTrash={isOwnProfile && hasMoreThanOneAddress}
                  onDelete={() => getProfileInfo()}
                />
              ))
            ) : (
              <View>
                <View style={styles.row}>
                  <Text> {noAddress}</Text>
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
                    Para que você possa adicionar itens, primeiro adicione um
                    endereço. Seus endereços serão seus{" "}
                    <BoldText>pontos de encontro</BoldText> com quem desejar
                    pegar emprestado algum item seu.
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
  scrollContainer: {},
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
    marginBottom:20,
    paddingVertical: 20,
    flexDirection: "row",
    paddingHorizontal:20,
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
});
