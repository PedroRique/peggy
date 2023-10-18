import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import { FIREBASE_STORAGE } from "../../firebaseConfig";

export const pickImage = async (
  folder: string,
  source: 'gallery' | 'camera'
): Promise<string | null> => {
  let result;

  if (source === 'gallery') {

    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  } else if (source === 'camera') {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.granted === false) {
      console.error('Permissão de câmera negada');
      return null;
    }

    result = await ImagePicker.launchCameraAsync({

      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  }

  if (result?.canceled) {
    return null;
  }

  const assets = result?.assets;

  if (Array.isArray(assets) && assets.length > 0) {
    const imageUrl = await uploadImage(assets[0].uri, folder);
    return imageUrl;
  }

  return null;
};

export const uploadImage = async (uri: string, folder: string) => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(
    FIREBASE_STORAGE,
    `images/${folder}/` + uuid.v4() + ".jpg"
  );
  await uploadBytes(fileRef, blob);
  return await getDownloadURL(fileRef);
};