import { Feather } from "@expo/vector-icons";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { BoldText } from "./Text/BoldText";
import { Category } from "../models/Category";
import { Colors } from "../shared/Colors";
const tech = require("../../assets/images/categories/tech.jpg");

type CategoryTileProps = TouchableOpacityProps & { category: Category };

export default function CategoryTile({ category, ...rest }: CategoryTileProps) {
  return (
    <TouchableOpacity style={styles.categoryContainer} {...rest}>
      <ImageBackground
        style={styles.category}
        source={{ uri: category.imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.distanceContainer}>
          <Feather name={category.icon as any} size={16} color={Colors.Blue} />
          <BoldText>{category.name}</BoldText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
