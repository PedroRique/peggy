import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { StackTypes } from "../../App";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { PriceTag } from "../components/PriceTag";
import { Rate } from "../components/Rate";
import { BoldText } from "../components/Text/BoldText";
import { Chip } from "../components/Text/Chip";
import { Text } from "../components/Text/Text";
import { UserData } from "../models/UserData";
import { getRate } from "../services/rating.service";
import { fetchUserData } from "../services/user.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";

export default function ProductScreen() {
  const toast = useToast();
  const navigation = useNavigation<StackTypes>();
  const product = useSelector(
    (state: AppState) => state.product.selectedProduct
  );
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );
  const currentUserData = useSelector((state: AppState) => state.user.userData);

  const [categoryLabel, setCategoryLabel] = useState("");
  const [lenderUserData, setLenderUserData] = useState<UserData | null>(null); // Alterado para inicializar como null
  const [rate, setRate] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLenderUserData(), getProductRate()]).finally(() =>
      setIsLoading(false)
    );

    getCategoryLabel();
  }, []);

  const getProductRate = async () => {
    const rate = await getRate(product?.ratings);
    setRate(rate);
  };

  const getCategoryLabel = () => {
    const categoryLabel = categories
      .find((c) => c.id === product?.category)
      ?.name.toLowerCase();
    setCategoryLabel(categoryLabel || "");
  };

  const getLenderUserData = async () => {
    if (product?.userId) {
      const result = await fetchUserData(product.userId);
      setLenderUserData(result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.product}
        source={{ uri: product?.mainImageUrl }}
        resizeMode="cover"
      >
        <View style={styles.productInner}>
          <Header hasBack color={PColors.White}>
            <Rate value={rate} color={PColors.White} />
          </Header>
        </View>
      </ImageBackground>

      <ScrollView
        style={{ backgroundColor: PColors.White }}
        contentContainerStyle={styles.productBody}
      >
        <Text style={styles.productTitle}>{product?.name}</Text>

        {!!product?.category && (
          <View style={styles.chipsContainer}>
            <Chip>{categoryLabel}</Chip>
          </View>
        )}

        <Text style={styles.productDescription}>{product?.description}</Text>

        <View style={styles.userContainer}>
        <TouchableOpacity
          onPress={() => {
            if (product?.userId) {
              navigation.navigate("Profile", {
                uid: product.userId,
              });
            }
          }}
          >
  <Avatar imageUrl={lenderUserData?.photoURL} />
</TouchableOpacity>

          <View>
            <BoldText>Emprestado por</BoldText>
            <BoldText size={24}>{lenderUserData?.name}</BoldText>
          </View>
        </View>
      </ScrollView>

      {!isLoading && currentUserData?.uid !== lenderUserData?.uid && (
        <View style={styles.productFooter}>
          <PriceTag
            price={Number(product?.price)}
            balance={currentUserData?.balance}
          />
          <View style={{ flex: 1 }}>
            <Button
              title="Pegar emprestado"
              disabled={
                !!((currentUserData?.balance || 0) < Number(product?.price))
              }
              onPress={() => {
                navigation.navigate("NewLoanRequest");
              }}
              onTryPress={() => {
                toast.show("Créditos insuficientes", { type: "danger" });
              }}
            />
          </View>
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
    gap: 12,
    width: "100%",
  },
  price: {
    fontSize: 32,
  },
  recurrence: {
    fontSize: 16,
  },
});
