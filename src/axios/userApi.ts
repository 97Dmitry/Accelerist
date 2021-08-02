import httpClient from "./server";

interface ISingIn {
  email: string;
  password: string;
}
export const singIn = async (data: ISingIn) => {
  return await httpClient.post("auth/sign_in", data);
};

interface ISingUp {
  email: string;
  password: string;
  password_confirmation: string;
}
export const singUp = async (data: ISingUp) => {
  return await httpClient.post("auth", data);
};
