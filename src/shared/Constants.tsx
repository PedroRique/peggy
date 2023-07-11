import { BoldText } from "../components/Text/BoldText";
import Emoji from "../components/Text/Emoji";
import { LoanStatus } from "../models/Loan";

interface StatusMessagesProps {
  borrowerName: string;
  productName: string;
  startDate: string;
  endDate: string;
}

export const STATUS_MESSAGES = {
  [LoanStatus.PENDING]: ({
    borrowerName,
    productName,
    startDate,
    endDate,
  }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> quer pegar emprestado{" "}
      <BoldText>{productName}</BoldText>
      <br />
      de {startDate} até {endDate}
    </>
  ),
  [LoanStatus.ACCEPTED]: ({ borrowerName }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> aprovou o empréstimo{" "}
      <Emoji symbol={"👌"} label={'okay'} />
    </>
  ),
  [LoanStatus.DENIED]: ({ borrowerName }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> negou o empréstimo
      <br />
      em {"Z"}
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
      <br />
      de {startDate} até {endDate}
    </>
  ),
  [LoanStatus.CANCELED]: ({ borrowerName }: StatusMessagesProps) => (
    <>
      <BoldText>{borrowerName}</BoldText> cancelou o empréstimo
      <br />
      em {"Z"}
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
      <br />
      de {startDate} até {endDate}
    </>
  ),
};
