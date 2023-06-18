import { BiMap } from "react-icons/bi";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
const tech = require("../../assets/images/categories/tech.jpg");

export default function CategoryBanner() {
  return (
    <View style={styles.categoryContainer}>
      <ImageBackground style={styles.category} source={tech} resizeMode="cover">
        <View style={styles.distanceContainer}>
          <BiMap color="#00C2FF" />
          <Text style={styles.distance}>Tecnologia</Text>
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
  },
  distance: {
    fontWeight: 'bold',
  },
  category: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  categoryContainer: {
    width: 343,
    height: 123,
    elevation: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
});
