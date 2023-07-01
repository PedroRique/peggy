import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import { Rating } from "../components/Rating";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lucas Maciel" hasBack />
      <View style={styles.avatarContainer}>
        <Avatar size={100} />
        <View>
          <Rating color="#00C2FF" />
          <Text style={styles.avatarBio}>
            Carioca, 25 anos. Itens com ótimo estado.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarBio: {
    color: "#777777",
    fontSize: 16,
  },
});
