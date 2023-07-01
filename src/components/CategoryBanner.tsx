import { Feather } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Category } from "../services/categories.service";
import { BoldText } from "./Text/BoldText";
const tech = require("../../assets/images/categories/tech.jpg");

export default function CategoryBanner({ category }: { category: Category }) {
  return (
    <View style={styles.categoryContainer}>
      <ImageBackground
        style={styles.category}
        source={{ uri: category.imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.distanceContainer}>
          <Feather name={category.icon as any} size={16} color={"#00c2ff"} />
          <BoldText>{category.name}</BoldText>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  distanceContainer: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  category: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  categoryContainer: {
    height: 123,
    elevation: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
});
