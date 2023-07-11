import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDown from "react-native-paper-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { Category } from "../models/Category";
import { ImageFolder } from "../models/ImageFolder.enum";
import { pickImage } from "../services/camera.service";
import { addProduct } from "../services/product.service";
import { Colors } from "../shared/Colors";
import { AppState } from "../store";

export default function NewProductScreen() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );

  const createProduct = async () => {
    await addProduct({
      name,
      description,
      imageUrl,
      category,
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
          <BoldText style={{ marginBottom: 4 }}>Foto do produto</BoldText>
          <TouchableOpacity style={styles.addImageBtn} onPress={getPhoto}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.imageSize} />
            ) : (
              <Feather name="plus-square" color={Colors.Blue} size={32} />
            )}
          </TouchableOpacity>

          <TextInput
            label="Nome do produto"
            placeholder="Nome do produto"
            onChangeText={setName}
          ></TextInput>

          <TextInput
            label="Descrição do produto"
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
      <View style={styles.footer}>
        <Button title="Cadastrar" onPress={() => createProduct()} />
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
    borderColor: Colors.Blue,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  imageSize: { width: 150, height: 150 },
  footer: {
    padding: 16,
  },
});
