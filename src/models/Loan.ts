import { Product } from "./Product";
import { UserData } from "./UserData";

export interface LoanRequest {
  startDate: string;
  endDate: string;
  pickUpTime: string;
  giveBackTime: string;
  address: string;
  borrowerUserId: string;
  lenderUserId: string;
  productId: string;
}

export interface Loan extends LoanRequest {
  status: LoanStatus;
}

export interface LoanWithInfo extends Loan {
  status: LoanStatus;
  product?: Product;
  borrower?: UserData;
}

export enum LoanStatus {
  REQUESTING = 1,
  ACCEPTED,
  DENIED,
  PROGRESS,
  CANCELED,
  RETURNED,
}
