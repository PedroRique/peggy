import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import { Rating } from "../components/Rating";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText } from "../components/Text/BoldText";

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

      <View style={styles.peggiesContainer}>
        <BoldText style={styles.peggiesText}>Você possui:</BoldText>
        <BoldText style={styles.peggiesText}>
          <Text style={styles.peggiesTextBig}>120</Text> Peggies
        </BoldText>
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
    marginBottom: 48,
    marginTop: 12,
  },
  avatarBio: {
    color: "#777777",
    fontSize: 16,
    width: '70%',
  },
  peggiesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 7,
  },
  peggiesText: {
    fontSize: 24,
    display: "flex",
    alignItems: "center",
  },
  peggiesTextBig: {
    fontSize: 32,
    lineHeight: 24,
  },
});
