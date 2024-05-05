export interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
  more: string;
}

export const InitialUserAddress: UserAddress = {
  city: "",
  district: "",
  ward: "",
  street: "",
  more: "",
};

export enum UserRole {
  user = "user",
  staff = "staff",
  producer = "producer",
  admin = "admin",
  superadmin = "superadmin",
}

export interface FullnameOfUser {
  firstname: string;
  lastname: string;
}

export interface UserType {
  _id?: string;
  fullname: FullnameOfUser;
  email: string;
  phone: string;
  username: string;
  password?: string;
  avatar?: string;
  address: UserAddress;
  role?: UserRole;
  following?: Array<string>;
  verifyEmail?: boolean;
  verifyPhone?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const InitialUser: UserType = {
  fullname: {
    firstname: "",
    lastname: "",
  },
  email: "",
  phone: "",
  username: "",
  password: "",
  avatar: "",
  address: InitialUserAddress,
  role: UserRole.user,
  following: [],
};

export const fullnameOfUser = ({ firstname, lastname }: FullnameOfUser) => {
  return `${firstname} ${lastname}`;
};

export const addressOfUser = (InitialUserAddress: UserAddress) => {
  if (InitialUserAddress?.city === undefined || InitialUserAddress?.city === "")
    return null;
  return `${InitialUserAddress?.more} ${InitialUserAddress?.street} ${InitialUserAddress?.ward} ${InitialUserAddress?.district} ${InitialUserAddress?.city}`;
};

export const phoneOfUser = (phone: string) => {
  if (phone === undefined) return "";
  if (phone.includes("social")) return "";
  return phone;
};
