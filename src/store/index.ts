import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CategoryState, categorySlice } from "./slices/category.slice";
import { ProductState, productSlice } from "./slices/product.slice";
import { UserState, userSlice } from "./slices/user.slice";

export interface AppState {
  category: CategoryState;
  user: UserState;
  product: ProductState;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  category: categorySlice.reducer,
  user: userSlice.reducer,
  product: productSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export const persistor = persistStore(store);
