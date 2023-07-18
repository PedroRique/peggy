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
  uid?: string;
  status: LoanStatus;
  hasLenderRate: boolean;
  hasBorrowerRate: boolean;
}

export interface LoanWithInfo extends Loan {
  status: LoanStatus;
  type: LoanType;
  product?: Product;
  borrower?: UserData;
  lender?: UserData;
}

export enum LoanStatus {
  PENDING = 1,
  ACCEPTED,
  DENIED,
  PROGRESS,
  CANCELED,
  RETURNED,
}

export type LoanType = 'lend' | 'borrow';
