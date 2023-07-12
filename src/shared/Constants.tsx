import { BoldText } from "../components/Text/BoldText";
import Emoji from "../components/Text/Emoji";
import { LoanStatus } from "../models/Loan";

interface StatusMessagesProps {
  borrowerName: string;
  productName: string;
  startDate: string;
  endDate: string;
}

export const LOAN_TILE_STATUS_MESSAGES = {
  [LoanStatus.PENDING]: ({
    borrowerName,
    productName,
  }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> quer pegar emprestado{" "}
      <BoldText>{productName}</BoldText>
    </>
  ),
  [LoanStatus.ACCEPTED]: ({
    borrowerName,
    productName,
  }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> aprovou o empréstimo de{" "}
      <BoldText>{productName}</BoldText> <Emoji symbol={"👌"} label={"okay"} />
    </>
  ),
  [LoanStatus.DENIED]: ({ borrowerName }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> negou o empréstimo
    </>
  ),
  [LoanStatus.PROGRESS]: ({
    borrowerName,
    productName,
    startDate,
    endDate,
  }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> está com{" "}
      <BoldText>{productName}</BoldText>
    </>
  ),
  [LoanStatus.CANCELED]: ({ borrowerName }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> cancelou o empréstimo
    </>
  ),
  [LoanStatus.RETURNED]: ({
    borrowerName,
    productName,
    startDate,
    endDate,
  }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> pegou emprestado{" "}
      <BoldText>{productName}</BoldText>
    </>
  ),
};
