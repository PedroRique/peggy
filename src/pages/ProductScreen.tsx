import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/Button";
import { BoldText } from "../components/Text/BoldText";
import { Chip } from "../components/Text/Chip";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../App";
const goPro = require("../../assets/images/products/go-pro.jpg");
const userAvatar = require("../../assets/images/users/lucas-maciel.png");

export default function ProductScreen() {
  const navigation = useNavigation<StackTypes>();
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.product} source={goPro} resizeMode="cover">
        <View style={styles.productInner}>
          <View style={styles.headerContainer}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome5 name="arrow-left" size={32} color="#FFF" />
            </Pressable>

            <BoldText style={styles.ratingText}>
              4.7 <FontAwesome name="star" size={24} color="#FFF" />
            </BoldText>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.productBody}>
        <Text style={styles.productTitle}>GoPro Hero 8 Black</Text>

        <View style={styles.chipsContainer}>
          <Chip>tecnologia</Chip>
          <Chip>filmadoras</Chip>
        </View>

        <Text style={styles.productDescription}>
          A GoPro inspira você a atingir seus objetivos enquanto você desfruta
          do caminho. Suas câmeras são projetadas para lhe ajudar a capturar
          todas as experiências da maneira em que você quer.
        </Text>

        <View style={styles.userContainer}>
          <Image source={userAvatar} style={styles.avatar} />
          <View>
            <BoldText style={{ color: "#333333" }}>Emprestado por</BoldText>
            <BoldText style={{ fontSize: 24, color: "#333333" }}>
              Lucas Maciel
            </BoldText>
          </View>
        </View>
      </View>

      <View style={styles.productFooter}>
        <BoldText style={styles.price}>
          P$80<BoldText style={styles.recurrence}>/dia</BoldText>
        </BoldText>
        <Button title="Emprestar" onPress={() => {}} />
      </View>
    </View>
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
    padding: 16,
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingText: {
    fontSize: 32,
    color: "white",
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
