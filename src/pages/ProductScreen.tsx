import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Chip } from "../components/Text/Chip";
import { Text } from "../components/Text/Text";
import { UserData } from "../models/UserData";
import { fetchUserData } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";

export default function ProductScreen() {
  const navigation = useNavigation<StackTypes>();
  const product = useSelector(
    (state: AppState) => state.product.selectedProduct
  );
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );
  const currentUserData = useSelector((state: AppState) => state.user.userData);

  const [categoryLabel, setCategoryLabel] = useState("");
  const [lenderUserData, setLenderUserData] = useState<UserData>();

  useEffect(() => {
    getLenderUserData();
    getCategoryLabel();
  }, []);

  const getCategoryLabel = () => {
    const categoryLabel = categories
      .find((c) => c.id === product?.category)
      ?.name.toLowerCase();
    setCategoryLabel(categoryLabel || "");
  };

  const getLenderUserData = async () => {
    const result = await fetchUserData(product?.userId);
    setLenderUserData(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.product}
        source={{ uri: product?.imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.productInner}>
          <Header hasBack color={PColors.White}>
            <Rating value={4.7} color={PColors.White} />
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
          <Avatar imageUrl={lenderUserData?.photoURL} />
          <View>
            <BoldText>Emprestado por</BoldText>
            <BoldText size={24}>{lenderUserData?.name}</BoldText>
          </View>
        </View>
      </View>

      {currentUserData?.uid !== lenderUserData?.uid && (
        <View style={styles.productFooter}>
          <Button
            title="Pegar emprestado"
            onPress={() => {
              navigation.navigate("NewLoanRequest");
            }}
          />
        </View>
      )}
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
    backgroundColor: "rgba(0, 0, 0, 0.25)",
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
    color: PColors.Grey,
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
