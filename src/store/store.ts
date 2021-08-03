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

const rootReducer = combineReducers({ userState: userSlice });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [saveSubsetFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
      HYDRATE,
    ],
  },
  immutableCheck: true,
  thunk: true,
});

// const makeStore = () =>
//   configureStore({
//     reducer: persistedReducer,
//     middleware,
//     devTools: true,
//   });

// @ts-ignore
const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return configureStore({
      reducer: persistedReducer,
      middleware,
      devTools: true,
    });
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      whitelist: ["counter"], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = configureStore({
      reducer: persistedReducer,
      middleware,
      devTools: true,
    });
    //@ts-ignore
    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

export const store = makeStore;

// export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

//@ts-ignore
export const wrapper = createWrapper<AppStore>(store);
