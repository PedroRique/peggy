import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { StackNavigation, StackTypes } from "../../App";
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
import DropdownButton from "../components/DropdownButton.js";


export default function NewProductScreen() {
  const navigation = useNavigation<StackTypes>();
  const route = useRoute<RouteProp<StackNavigation, "NewProduct">>();
  const toast = useToast();
  const [showDropDown, setShowDropDown] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]); 
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null); 
  const [category, setCategory] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [formValid, setFormValid] = useState(false);

  const categories = useSelector((state: AppState) => state.category.categories);

  useEffect(() => {
    setFormValid(!!name && !!description && !!category && !!price);
  }, [name, description, category, price]);

  const createProduct = async () => {
    let finalImageUrls = imageUrls;
    if (imageUrls.length === 1 && !mainImageUrl) {
      setMainImageUrl(imageUrls[0]);
    } else if (imageUrls.length === 0 && mainImageUrl) {
      finalImageUrls = [mainImageUrl];
    }
    
    addProduct({
      name,
      description,
      imageUrls: finalImageUrls, 
      mainImageUrl,
      category,
      price,
    })
      .then(() => {
        toast.show("Produto adicionado com sucesso!", { type: "success" });
        navigation.goBack();
        route.params.onAdd();
      })
      .catch((e) => {
        toast.show("Falha ao criar o produto.");
      });
  };

  const selectMainImage = (url: string) => {
    setMainImageUrl(url);
  };

  const removeImage = (url: string) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
    if (mainImageUrl === url) {
      setMainImageUrl(null);
    }
  };

  const getPhoto = async (source: "gallery" | "camera") => {
    const result = await pickImage(ImageFolder.PRODUCTS, source);
    if (result) {
      setImageUrls([...imageUrls, result]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo produto" hasBack hasBorder />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.newProductForm}>
          <BoldText style={{ marginBottom: 4 }}>Fotos do produto</BoldText>
          <ScrollView horizontal style={styles.imageCarousel}>
            <TouchableOpacity style={styles.addImageBtn} onPress={() => getPhoto("gallery")}>
              <Feather name="plus-square" color={PColors.Blue} size={32} />
            </TouchableOpacity>
            {imageUrls.map((url, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => selectMainImage(url)}
                onLongPress={() => removeImage(url)}
              >
                <Image
                  source={{ uri: url }}
                  style={[
                    styles.carouselImage,
                    (mainImageUrl === url && styles.selectedImage),
                    (imageUrls.length === 1 && styles.singleImage), 
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

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

          <View>
            <DropdownButton
              label="Categoria do produto"
              placeholder="Categoria do produto"
              searchable={true}
              options={categories.map((categ: Category) => ({
                label: categ.name,
                onPress: () => {
                  setCategory(categ.id);
                }
              }))} />
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
        <Button
          title="Cadastrar"
          onPress={() => createProduct()}
          onTryPress={() => {
            toast.show("Preencha todas as informações do produto.");
          }}
          disabled={!formValid}
        />
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
  singleImage: {
    borderWidth: 0, 
  },
  imageCarousel: {
    flexDirection: "row",
    marginBottom: 24,
  },
  carouselImage: {
    width: 150,
    height: 150,
    borderRadius: 7,
    marginHorizontal:8,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: PColors.Blue,
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
    marginRight:8,
  },
  footer: {
    padding: 16,
  },
});
