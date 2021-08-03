import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { singIn } from "../../axios/userApi";

export const loginThunk = createAsyncThunk(
  "userState/login",
  async (data: IAuth, thunkAPI) => {
    const response = await singIn(data);
    return response.data;
  }
);

const initialState: IUser = {
  email: null,
  accessToken: null,
  id: null,
  firstName: null,
  lastName: null,
  role: null,
  loading: false,
  errors: null,
  authorized: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState,

  reducers: {},

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subject,
      };
    },
    //@ts-ignore
    [loginThunk.fulfilled]: (state, action: PayloadAction<ILoginResponse>) => {
      const data = action.payload.user;
      document.cookie = `accessToken=${action.payload.accessToken}`;
      return {
        ...state,
        email: data.email,
        accessToken: action.payload.accessToken,
        id: data.id,
        role: data.role,
        authorized: true,
        firstName: data.firstName,
        lastName: data.lastName,
        loading: false,
      };
    },
    //@ts-ignore
    [loginThunk.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

export interface IUser {
  email: string | null;
  accessToken: string | null;
  id: number | null;
  loading: boolean;
  errors?: string | null;
  role: string | null;
  authorized?: boolean;
  firstName: string | null;
  lastName: string | null;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: {
    avatarKey: string | null;
    createdAt: string;
    deletedAt: string | null;
    email: "user@example.com";
    firstName: null;
    id: "eb893b0e-ce28-4392-a824-4a3ff9c36e79";
    imported: false;
    isAuthorized: true;
    isReceivingNotifications: true;
    lastName: null;
    linkedinLink: null;
    loggedInAt: "2021-08-03T10:42:33.578Z";
    role: "owner";
    teamId: "7de2786c-4559-462e-a636-3bec1667fe85";
    updatedAt: "2021-08-03T10:42:33.657Z";
  };
}

export interface IRegistration {
  email: string;
  password: string;
  password_confirmation: string;
}
