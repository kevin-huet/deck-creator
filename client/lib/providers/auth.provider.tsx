import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  AuthUser,
  Props,
  AuthContext as AuthContextType,
} from "../../types/providers.types";

const defaultAuthValue = {
  username: undefined,
  isLogged: false,
  roles: [],
};

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  register: () => {},
  isLogged: () => {},
  setAuth: () => {},
  auth: {
    username: undefined,
    isLogged: false,
    roles: [],
  },
});

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthUser>(defaultAuthValue);
  const login = (obj: AuthUser) => {
    if (obj.username && obj.iat) {
      setAuth({ ...obj, isLogged: true });
    }
  };
  const logout = () => {
    fetch("http://localhost:8000/api/auth/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((r) => {
        setAuth(defaultAuthValue);
        router.push("/").then();
      });
  };
  const register = () => {};
  const isLogged = () => {};
  const getUser = () => {
    return axios.get("http://localhost:8000/api/auth/user", {
      withCredentials: true,
    });
  };
  useEffect(() => {
    getUser()
      .then((res) => {
        setAuth({
          username: res.data?.user?.username,
          isLogged: true,
        });
      })
      .catch(() => {
        setAuth(defaultAuthValue);
        window.localStorage.removeItem("_data");
      });
  }, []);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, register, isLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};
