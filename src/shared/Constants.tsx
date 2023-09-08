import React from "react";
import { BoldText } from "../components/Text/BoldText";
import Emoji from "../components/Text/Emoji";
import { FirebaseError } from "../models/FirebaseError";
import { LoanStatus } from "../models/Loan";
import { PColors } from "./Colors";

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

export const REGISTRATION_BONUS = 100;
export const ADD_PRODUCT_BONUS = 50;

export const CALENDAR_LOCALE_CONFIG = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abril",
    "Maio",
    "Jun",
    "Jul.",
    "Ago",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sab."],
  today: "Todos os Dias",
};

export const UNAVAILABLE_DATE_CALENDAR_STYLE = {
  disabled: true,
  disableTouchEvent: true,
  customStyles: {
    container: {
      backgroundColor: PColors.Orange,
      opacity: 0.5,
    },
    text: {
      color: PColors.Black,
    },
  },
};

export const SELECTED_DATE_CALENDAR_STYLE = {
  selected: true,
  selectedColor: PColors.Blue,
};
