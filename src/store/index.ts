import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage";
import { CategoryState, categorySlice } from "./slices/category.slice";
import { ProductState, productSlice } from "./slices/product.slice";
import { UserState, userSlice } from "./slices/user.slice";
import logger from "redux-logger";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
