import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Avatar } from "../components/Avatar";
import Button from "../components/Button";
import { TextInput } from "../components/Input";
import { ProductCard } from "../components/ProductCard";
import { Rating } from "../components/Rating";
import { Text } from "../components/Text/Text";
import { LoanWithInfo } from "../models/Loan";
import {
  checkBorrowerRate,
  checkLenderRate,
  updateRatings,
} from "../services/rating.service";

export const LoanRatingModal = ({
  loan,
  onClose,
}: {
  loan: LoanWithInfo;
  onClose: () => void;
}) => {
  const toast = useToast();
  const [userRate, setUserRate] = useState<number | null>(null);
  const [productRate, setProductRate] = useState<number | null>(null);
  const [productComment, setProductComment] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const saveRate = async () => {
    setIsSaving(true);

    let promises: Promise<any>[] = [];

    if (loan.type === "borrow") {
      promises = [
        updateRatings(
          {
            rate: userRate,
            comment: "",
            ratedId: loan.lenderUserId,
            raterId: loan.borrowerUserId,
            loanId: loan.uid,
          },
          "users"
        ),
        updateRatings(
          {
            rate: productRate,
            comment: productComment,
            ratedId: loan.productId,
            raterId: loan.borrowerUserId,
            loanId: loan.uid,
          },
          "products"
        ),
        checkBorrowerRate(loan.uid),
      ];
    } else {
      promises = [
        updateRatings(
          {
            rate: userRate,
            comment: "",
            ratedId: loan.borrowerUserId,
            raterId: loan.lenderUserId,
            loanId: loan.uid,
          },
          "users"
        ),
        checkLenderRate(loan.uid),
      ];
    }

    Promise.all(promises).then(() => {
      toast.show("Avaliação salva.", { type: "success" });
    });

    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.row}>
        <Avatar
          imageUrl={
            loan.type === "borrow"
              ? loan?.lender?.photoURL
              : loan.borrower?.photoURL
          }
        />
        <Text size={24} weight="700">
          Avalie sua experiência com{" "}
          {loan.type === "borrow" ? loan?.lender?.name : loan.borrower?.name}
        </Text>
      </View>

      <View style={styles.ratingContainer}>
        <Rating key={"user"} onRate={setUserRate} />
      </View>

      {loan.type === "borrow" && (
        <>
          {loan.product && (
            <View style={styles.row}>
              <ProductCard
                product={loan.product}
                size={50}
                hasName={false}
                hasShadow={false}
              />
              <Text size={24} weight="700">
                Avalie sua experiência com {loan?.product.name}
              </Text>
            </View>
          )}
          <View style={styles.ratingContainer}>
            <Rating key={"product"} onRate={setProductRate} />
          </View>

          <TextInput
            label="Comentário"
            multiline={true}
            numberOfLines={4}
            value={productComment}
            placeholder="Conte um pouco mais sobre sua experiência com o produto."
            containerStyle={styles.textarea}
            onChangeText={setProductComment}
          />
        </>
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
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginVertical: 16,
    marginBottom: 32,
  },
  textarea: {
    marginBottom: 16,
  },
});
