export interface Rating {
  rate: number | null;
  comment: string;
  loanId?: string;
  raterId: string;
  ratedId: string;
  ratingId?: string;
}
