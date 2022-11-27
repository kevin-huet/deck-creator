import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export type AuthUser = {
  username?: string;
  isLogged?: boolean;
  roles?: Array<any>;
  iat?: number;
  exp?: number;
};

export type AuthContext = {
  auth: AuthUser;
  setAuth: Function;
  login: Function;
  register: Function;
  logout: Function;
  isLogged: Function;
};
