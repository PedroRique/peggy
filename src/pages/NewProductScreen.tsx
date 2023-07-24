import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDown from "react-native-paper-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { StackNavigation } from "../../App";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { BoldText } from "../components/Text/BoldText";
import { Category } from "../models/Category";
import { ImageFolder } from "../models/ImageFolder.enum";
import { pickImage } from "../services/camera.service";
import { addProduct } from "../services/product.service";
import { PColors } from "../shared/Colors";
import { AppState } from "../store";

export default function NewProductScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackNavigation, "NewProduct">>();
  const toast = useToast();
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const categories = useSelector(
    (state: AppState) => state.category.categories
  );

  const createProduct = async () => {
    addProduct({
      name,
      description,
      imageUrl,
      category,
      price,
    })
      .then(() => {
        toast.show("Endereço adicionado com sucesso!", { type: "success" });
        navigation.goBack();
        route.params.onAdd();
      })
      .catch((e) => {
        toast.show("Falha ao criar o item.");
      });
  };

  const getPhoto = async () => {
    const result = await pickImage(ImageFolder.PRODUCTS);
    setImageUrl(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo produto" hasBack hasBorder />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.newProductForm}>
          <BoldText style={{ marginBottom: 4 }}>Foto do produto</BoldText>
          <TouchableOpacity style={styles.addImageBtn} onPress={getPhoto}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.imageSize} />
            ) : (
              <Feather name="plus-square" color={PColors.Blue} size={32} />
            )}
          </TouchableOpacity>

          <TextInput
            label="Nome do produto"
            placeholder="Nome do produto"
            value={name}
            onChangeText={setName}
          ></TextInput>

          <TextInput
            label="Descrição do produto"
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          ></TextInput>

          <View style={{ marginBottom: 32 }}>
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

          <TextInput
            label="Preço diário"
            placeholder="Preço diário"
            value={price}
            onChangeText={setPrice}
          ></TextInput>
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
    borderColor: PColors.Blue,
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
