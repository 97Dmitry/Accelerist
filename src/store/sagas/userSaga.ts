import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { singIn, singUp } from "axios/userApi";
import {
  setAuthorized,
  setErrors,
  setLoading,
  setUser,
} from "store/user/userSlice";

export function* handleSingIn(
  action: PayloadAction<{
    email: string;
    password: string;
  }>
): any {
  try {
    yield put(setErrors(null));
    yield put(setLoading(true));
    const response = yield call(singIn, { ...action.payload });
    const data = response.data;

    yield put(
      setUser({
        accessToken: data.accessToken,
        email: data.email,
        id: data.user.id,
        role: data.user.role,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      })
    );

    yield put(setLoading(false));
    yield put(setAuthorized(true));
  } catch (e) {
    yield put(setLoading(false));
    yield put(setErrors(e.error));
  }
}

export function* handleSingUp(
  action: PayloadAction<{
    email: string;
    password: string;
    password_confirmation: string;
  }>
): any {
  try {
    yield put(setErrors(null));
    yield put(setLoading(true));
    const response = yield call(singUp, { ...action.payload });
    const data = response.data;

    yield put(
      setUser({
        accessToken: data.accessToken,
        email: data.email,
        id: data.user.id,
        role: data.user.role,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      })
    );
    yield put(setLoading(false));
    yield put(setAuthorized(true));
  } catch (e) {
    yield put(setLoading(false));
    yield put(setErrors(e.error));
  }
}
