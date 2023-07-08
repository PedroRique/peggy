import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDown from "react-native-paper-dropdown";
import { TextInput as PaperInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { Category } from "../models/Category";
import { pickImage } from "../services/camera.service";
import { addProduct } from "../services/product.service";
import { AppState } from "../store";
import { ImageFolder } from "../models/ImageFolder.enum";

export default function NewProductScreen() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );
  const profile = useSelector((state: AppState) => state.user.profile);

  const createProduct = async () => {
    await addProduct({
      name,
      description,
      imageUrl,
      category,
      userId: profile?.uid || "",
    });
  };

  const getPhoto = async () => {
    const result = await pickImage(ImageFolder.PRODUCTS);
    setImageUrl(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo produto" hasBack hasBorder />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.newProductForm}>
          <BoldText style={styles.label}>Foto do produto</BoldText>
          <TouchableOpacity style={styles.addImageBtn} onPress={getPhoto}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.imageSize} />
            ) : (
              <Feather name="plus-square" color={"#00c2ff"} size={32} />
            )}
          </TouchableOpacity>

          <BoldText style={styles.label}>Nome do produto</BoldText>
          <TextInput
            placeholder="Nome do produto"
            onChangeText={setName}
          ></TextInput>

          <BoldText style={styles.label}>Descrição do produto</BoldText>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          ></TextInput>

          <BoldText>Categoria do produto</BoldText>
          <DropDown
            label={"Categoria do produto"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={category}
            setValue={setCategory}
            list={categories.map((categ: Category) => ({
              label: categ.name,
              value: categ.id,
            }))}
          />
        </View>
      </ScrollView>
      <Button title="Cadastrar" onPress={() => createProduct()} />
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
  newProductForm: {
    flex: 1,
  },
  addImageBtn: {
    width: 150,
    height: 150,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00C2FF",
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  imageSize: { width: 150, height: 150 },
  label: {
    marginBottom: 4,
  },
});
