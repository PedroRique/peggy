import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Avatar } from "../components/Avatar";
import { Rating } from "../components/Rating";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header
        title="Lucas Maciel"
        hasBack={true}
        onBack={() => {
          console.log("voltar");
        }}
      />
      <View style={styles.avatarContainer}>
        <Avatar size={100} />
        <View>
          <Rating color="#00C2FF" />
          <Text style={styles.avatarBio}>
            Carioca, 25 anos. Itens com ótimo estado.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 16
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarBio: {
    color: "#777777",
    fontSize: 14,
  },
});
