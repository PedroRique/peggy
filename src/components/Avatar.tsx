import { Image, StyleSheet } from "react-native";
const userAvatar = require("../../assets/images/users/lucas-maciel.png");

export const Avatar = ({ size = 50 }: { size?: number }) => {
  return (
    <Image
      source={userAvatar}
      style={[styles.avatar, { width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
  },
});
