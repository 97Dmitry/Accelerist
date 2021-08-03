import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import userSlice from "./user/userSlice";
import {
  REHYDRATE,
  PAUSE,
  PURGE,
  FLUSH,
  PERSIST,
  persistReducer,
  REGISTER,
  persistStore,
} from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const saveSubsetFilter = createFilter("userState", [
  "accessToken",
  "email",
  "id",
  "authorized",
  "firstName",
  "lastName",
]);

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [saveSubsetFilter],
};

const rootReducer = combineReducers({ userState: userSlice });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

//@ts-ignore
const makeStore = ({ isServer }) => {
  if (isServer) {
    return configureStore({
      reducer: rootReducer,
    });
  } else {
    const store = configureStore({
      reducer: persistedReducer,
      middleware,
    });

    //@ts-ignore
    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  }
};

const store = makeStore({ isServer: false });

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

//@ts-ignore
export const wrapper = createWrapper<AppStore>(makeStore);
