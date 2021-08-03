import { AppState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: AppState) => state;

export const selectorUser = createSelector(selectSelf, (state: AppState) => {
  return state.userState;
});

export const selectorToken = createSelector(selectSelf, (state: AppState) => {
  return state.userState.accessToken;
});

export const selectorLoading = createSelector(
  selectSelf,
  (state: AppState): boolean => {
    return state.userState.loading;
  }
);

export const selectorErrors = createSelector(selectSelf, (state: AppState) => {
  return state.userState.errors;
});

export const selectorAuthorized = createSelector(
  selectSelf,
  (state: AppState) => {
    return state.userState.authorized;
  }
);
