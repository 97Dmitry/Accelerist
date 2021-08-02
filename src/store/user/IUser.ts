export interface IUser {
  email: string;
  accessToken: string | null;
  id: number | null;
  loading?: boolean;
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

export interface IRegistration {
  email: string;
  password: string;
  password_confirmation: string;
}
