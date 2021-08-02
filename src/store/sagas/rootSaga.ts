import { takeEvery } from "redux-saga/effects";

import { authorization, registration } from "store/user/userSlice";
import { handleSingIn, handleSingUp } from "./userSaga";

export function* watcherSaga() {
  yield takeEvery(registration.type, handleSingUp);
  yield takeEvery(authorization.type, handleSingIn);
}
