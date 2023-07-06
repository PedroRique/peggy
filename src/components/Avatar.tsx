import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

export const Avatar = ({
  size = 50,
  imageUrl = "",
}: {
  size?: number;
  imageUrl?: string;
}) => {
  const commonStyles = [styles.avatar, { width: size, height: size }];
  return (
    <>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={commonStyles} />
      ) : (
        <View style={commonStyles}>
          <Feather name="user" size={size / 2} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
