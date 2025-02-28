import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { CategoryState, categorySlice } from "./slices/category.slice";
import { LoanState, loanSlice } from "./slices/loan.slice";
import { ProductState, productSlice } from "./slices/product.slice";
import { UserState, userSlice } from "./slices/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AppState {
  category: CategoryState;
  user: UserState;
  product: ProductState;
  loan: LoanState;
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [loanSlice.name, productSlice.name],
};

const rootReducer = combineReducers({
  [categorySlice.name]: categorySlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [loanSlice.name]: loanSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);
