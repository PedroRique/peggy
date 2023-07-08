import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { Header } from "../components/Header";

export default function NewRentScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detalhes" hasBack hasBorder />

      <ScrollView style={styles.scrollContainer}></ScrollView>
      <View style={styles.footer}>
        <Button title="Cadastrar" onPress={() => ({})} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 16,
  },
  footer: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    padding: 16,
  },
});
