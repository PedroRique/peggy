import { BoldText } from "../components/Text/BoldText";
import Emoji from "../components/Text/Emoji";
import { FirebaseError } from "../models/FirebaseError";
import { LoanStatus } from "../models/Loan";

interface StatusMessagesProps {
  borrowerName: string;
  productName: string;
  middleText?: string;
  emoji?: string;
}
const LoanStatusMessage = ({
  borrowerName,
  productName,
  middleText,
  emoji = "",
}: StatusMessagesProps) => (
  <>
    <BoldText>{borrowerName}</BoldText> {middleText}{" "}
    <BoldText>{productName}</BoldText> {!!emoji && <Emoji symbol={emoji} />}
  </>
);

export const LOAN_TILE_STATUS_MESSAGES = {
  [LoanStatus.PENDING]: (props: StatusMessagesProps) => (
    <LoanStatusMessage middleText="quer pegar emprestado" {...props} />
  ),
  [LoanStatus.ACCEPTED]: (props: StatusMessagesProps) => (
    <LoanStatusMessage
      middleText="aprovou o empréstimo de"
      emoji={"👌"}
      {...props}
    />
  ),
  [LoanStatus.DENIED]: (props: StatusMessagesProps) => (
    <LoanStatusMessage
      middleText="negou o empréstimo de"
      emoji={"😕"}
      {...props}
    />
  ),
  [LoanStatus.PROGRESS]: (props: StatusMessagesProps) => (
    <LoanStatusMessage middleText="está com" {...props} />
  ),
  [LoanStatus.CANCELED]: (props: StatusMessagesProps) => (
    <LoanStatusMessage
      middleText="cancelou o empréstimo de"
      emoji={"😕"}
      {...props}
    />
  ),
  [LoanStatus.RETURNED]: (props: StatusMessagesProps) => (
    <LoanStatusMessage middleText="pegou emprestado" emoji="👏" {...props} />
  ),
};

export const FIREBASE_ERROR_MESSAGES = {
  [FirebaseError.USER_NOT_FOUND]: "Usuário não encontrado.",
  [FirebaseError.WRONG_PASSWORD]: "Senha incorreta.",
};
