import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { Text } from "../components/Text/Text";
import { LoanWithInfo } from "../models/Loan";
import { updateProductRatings } from "../services/product.service";

export const LoanRatingModal = ({
  loan,
  onClose,
}: {
  loan: LoanWithInfo;
  onClose: () => void;
}) => {
  const [lenderRate, setLenderRate] = useState<number | null>(null);
  const [productRate, setProductRate] = useState<number | null>(null);
  const [productComment, setProductComment] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveRate = async () => {
    if (!productRate || !loan?.borrowerUserId) return;
    setIsSaving(true);
    
    await updateProductRatings(loan.productId, {
      rate: productRate,
      comment: productComment,
      userId: loan?.borrowerUserId,
    });

    onClose();
  };

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

      <Button title="Enviar" onPress={() => saveRate()} loading={isSaving} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 7,
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
