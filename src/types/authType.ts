import { UserType } from "./userType";

export interface ResetPasswordType {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface LoginType {
  username: string;
  password: string;
}

export interface LoginSocialType {
  _id: string;
  username: string;
  email: string;
  password: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
}

export interface CustomAuthResponse {
  token: string;
  user: UserType;
}

export type RegisterType = {
  fullname: {
    firstname: string;
    lastname: string;
  };
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};
