import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { Rating } from "../components/Rating";
import { BoldText } from "../components/Text/BoldText";
import { Chip } from "../components/Text/Chip";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Feather } from "@expo/vector-icons";

export default function CategoryScreen() {
  const selectedCategory = useSelector(
    (state: AppState) => state.category.selectedCategory
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.banner}
        source={{ uri: selectedCategory?.imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.bannerInner}>
          <Header hasBack color="#fff">
            <Rating color="#fff" />
          </Header>
        </View>
      </ImageBackground>

      <View style={styles.categoryBody}>
        <BoldText style={styles.categoryTitle}>
          <Feather
            name={selectedCategory?.icon as any}
            color={"#00C2FF"}
            size={32}
          ></Feather>
          {selectedCategory?.name}
        </BoldText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  banner: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bannerInner: {
    height: 150,
    width: "100%",
    paddingHorizontal: 16,
  },
  categoryBody: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
  categoryTitle: {
    fontSize: 32,
    marginBottom: 16,
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  },
});
