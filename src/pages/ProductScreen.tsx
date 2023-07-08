import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Chip } from "../components/Text/Chip";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { fetchUserData } from "../services/user.service";
import { useEffect, useState } from "react";
import { UserData } from "../models/UserData";
import { Text } from "../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";

export default function ProductScreen() {
  const navigation = useNavigation<StackTypes>();
  const product = useSelector(
    (state: AppState) => state.product.selectedProduct
  );
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );

  const [categoryLabel, setCategoryLabel] = useState("");
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    getUserData();
    getCategoryLabel();
  }, []);

  const getCategoryLabel = () => {
    const categoryLabel = categories
      .find((c) => c.id === product?.category)
      ?.name.toLowerCase();
    setCategoryLabel(categoryLabel || "");
  };

  const getUserData = async () => {
    const result = await fetchUserData(product?.userId);
    setUserData(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.product}
        source={{ uri: product?.imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.productInner}>
          <Header hasBack color="#fff">
            <Rating value={4.7} color="#fff" />
          </Header>
        </View>
      </ImageBackground>

      <View style={styles.productBody}>
        <Text style={styles.productTitle}>{product?.name}</Text>

        {!!product?.category && (
          <View style={styles.chipsContainer}>
            <Chip>{categoryLabel}</Chip>
          </View>
        )}

        <Text style={styles.productDescription}>{product?.description}</Text>

        <View style={styles.userContainer}>
          <Avatar imageUrl={userData?.photoURL} />
          <View>
            <BoldText style={{ color: "#333333" }}>Emprestado por</BoldText>
            <BoldText style={{ fontSize: 24, color: "#333333" }}>
              {userData?.name}
            </BoldText>
          </View>
        </View>
      </View>

      <View style={styles.productFooter}>
        {/* <BoldText style={styles.price}>
          P$80<BoldText style={styles.recurrence}>/dia</BoldText>
        </BoldText> */}
        <Button
          title="Pegar emprestado"
          onPress={() => {
            navigation.navigate("NewLoan");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  product: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  productInner: {
    height: 200,
    width: "100%",
    paddingHorizontal: 16,
  },
  productBody: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  productTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  chipsContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 16,
  },
  productDescription: {
    color: "#777777",
    marginBottom: 24,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  productFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    padding: 16,
  },
  price: {
    fontSize: 32,
  },
  recurrence: {
    fontSize: 16,
  },
});
