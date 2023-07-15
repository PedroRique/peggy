import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { Text } from "../components/Text/Text";
import { AppState } from "../store";

export const LoanRatingModal = () => {
  const loan = useSelector((state: AppState) => state.loan.selectedLoan);

  const [lenderRate, setLenderRate] = useState<number | null>(null);
  const [productRate, setProductRate] = useState<number | null>(null);
  const [productComment, setProductComment] = useState("");

  const saveRate = () => {};

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        {!lenderRate && <Avatar imageUrl={loan?.lender?.photoURL} />}
        <Text size={24} weight="700">
          Avalie sua experiência com{" "}
          {lenderRate ? "o item" : loan?.lender?.name}
        </Text>
      </View>

      {loan && loan.product && lenderRate && (
        <View style={styles.productContainer}>
          <ProductCard product={loan.product} size={60} hasName={false} />
          <Text size={24} weight="700" numberOfLines={2}>
            {loan.product?.name}
          </Text>
        </View>
      )}

      <View style={styles.ratingContainer}>
        {lenderRate ? (
          <Rating onRate={setProductRate} />
        ) : (
          <Rating onRate={setLenderRate} />
        )}
      </View>

      {lenderRate && (
        <TextInput
          label="Comentário"
          multiline={true}
          numberOfLines={4}
          value={productComment}
          placeholder="Conte um pouco mais sobre sua experiência com o produto."
          containerStyle={styles.textarea}
          onChangeText={setProductComment}
        />
      )}

      <Button title="Enviar" onPress={() => saveRate()} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginVertical: 32,
  },
  productContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginVertical: 16,
  },
  textarea: {
    marginBottom: 16,
  },
});
