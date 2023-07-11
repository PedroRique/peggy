import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoanWithInfo } from "../../models/Loan";

export interface LoanState {
  selectedLoan: LoanWithInfo | null;
}

const initialState: LoanState = {
  selectedLoan: null,
};

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setSelectedLoan: (state, action: PayloadAction<LoanWithInfo>) => {
      state.selectedLoan = action.payload;
    },
  },
});
