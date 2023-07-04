import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { Header } from "../components/Header";
import { TextInput } from "../components/Input";
import { addProduct, uploadProductImage } from "../services/products.service";
import { BoldText } from "../components/Text/BoldText";
import { useSelector } from "react-redux";
import DropDown from "react-native-paper-dropdown";
import { Category } from "../services/categories.service";

export default function NewProductScreen() {
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const categories = useSelector((state: any) => state.categories);

  const createProduct = async () => {
    await addProduct({
      name: productName,
      imageUrl,
      category,
    });
  };

  useEffect(() => {
    console.log(categories);
  }, [categories])

  const getPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUrl = await uploadProductImage(result.assets[0].uri);
      setImageUrl(imageUrl);
    }
  };

  const [showDropDown, setShowDropDown] = useState(false);

  const genderList = [
    {
      label: "Tech",
      value: "tech",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Novo produto" hasBack />

      <View style={styles.newProductForm}>
        <BoldText>Foto do produto</BoldText>
        <TouchableOpacity style={styles.addImageBtn} onPress={getPhoto}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.imageSize} />
          ) : (
            <Feather name="plus-square" color={"#00c2ff"} size={32} />
          )}
        </TouchableOpacity>

        <BoldText>Nome do produto</BoldText>
        <TextInput
          placeholder="Nome do produto"
          onChangeText={(text) => setProductName(text)}
        ></TextInput>

        <BoldText>Categoria do produto</BoldText>
        <DropDown
          label={"Gender"}
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
      <Button title="Cadastrar" onPress={() => createProduct()} />
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
  },
  imageSize: { width: 150, height: 150 },
});
