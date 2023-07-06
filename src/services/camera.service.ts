import * as ImagePicker from "expo-image-picker";
import { uploadProductImage } from "./products.service";

export const pickImage = async (): Promise<string | null> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    const imageUrl = await uploadProductImage(result.assets[0].uri);
    return imageUrl;
  }

  return null;
};
