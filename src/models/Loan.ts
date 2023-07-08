export interface LoanRequest {
  startDate: string;
  endDate: string;
  pickUpTime: string;
  giveBackTime: string;
  address: string;
  senderId: string;
  receiverId: string;
}

export interface Loan extends LoanRequest {
  uid?: string;
  status: LoanStatus;
}

export enum LoanStatus {
  REQUESTING = 1,
  ACCEPTED,
  DENIED,
  PROGRESS,
  CANCELED,
  DONE,
}
