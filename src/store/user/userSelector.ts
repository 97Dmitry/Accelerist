import { RootState } from "../index";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: RootState) => state;

export const selectorUser = createSelector(selectSelf, (state: RootState) => {
  return state.userState;
});

export const selectorLoading = createSelector(
  selectSelf,
  (state: RootState): boolean => {
    return state.userState.loading;
  }
);

export const selectorErrors = createSelector(selectSelf, (state: RootState) => {
  return state.userState.errors;
});

export const selectorAuthorized = createSelector(
  selectSelf,
  (state: RootState) => {
    return state.userState.authorized;
  }
);
