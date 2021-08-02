import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createFilter } from "redux-persist-transform-filter";

import createSagaMiddleware from "@redux-saga/core";

import authSlice from "./user/userSlice";
import { watcherSaga } from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  userState: authSlice,
});

const saveSubsetFilter = createFilter("userState", [
  "accessToken",
  "email",
  "id",
  "authorized",
  "firstName",
  "lastName",
]);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [saveSubsetFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  immutableCheck: true,
  thunk: false,
});

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: [...middleware, sagaMiddleware],
  });
}

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [...middleware, sagaMiddleware],
// });

const store = makeStore();

sagaMiddleware.run(watcherSaga);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
