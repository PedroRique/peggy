export interface Rating {
  rate: number | null;
  comment: string;
  raterId: string;
  ratedId: string;
  ratingId?: string;
}
