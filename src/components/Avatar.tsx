import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export const Avatar = ({
  size = 50,
  imageUrl = "",
  onPress,
}: {
  size?: number;
  imageUrl?: string | null;
  onPress?: () => void;
}) => {
  const commonStyles = [styles.avatar, { width: size, height: size }];
  return (
    <>
      <TouchableOpacity
        style={commonStyles}
        disabled={!onPress}
        onPress={onPress}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={commonStyles} />
        ) : (
          <View style={commonStyles}>
            <Feather name="user" size={size / 2} />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
