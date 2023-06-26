import { FontAwesome5 } from "@expo/vector-icons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
const goPro = require("../../assets/images/products/go-pro.jpg");
const userAvatar = require("../../assets/images/users/lucas-maciel.png");

const Chip = ({ children }: { children: any }) => {
  return (
    <View
      style={{
        backgroundColor: "#E5E5E5",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 7,
        width: "min-content",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: "#444444",
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.product} source={goPro} resizeMode="cover">
        <View style={styles.productInner}>
          <View style={styles.headerContainer}>
            <FontAwesome5 name="arrow-left" size={32} color="#FFF" />

            <Text style={styles.ratingText}>4.7</Text>
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
          <Image source={userAvatar} style={styles.avatar}/>
          <View>
            <Text style={{ fontWeight: 'bold', color: '#333333'}}>Emprestado por</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#333333'}}>Lucas Maciel</Text>
          </View>
        </View>
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
    fontWeight: "600",
    color: "white",
  },
  productBody: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  productTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chipsContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 8,
    marginBottom: 16,
  },
  productDescription: {
    color: '#777777',
    marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
