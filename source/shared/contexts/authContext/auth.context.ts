import { createContext, useContext } from "react";
import { User } from "firebase/auth";

export type AuthContext = {
  user: User | null;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthContext");
  }
  return authContext;
};

export type AuthActionContext = {
  login: () => void;
  logout: () => void;
};

export const AuthActionsContext = createContext<AuthActionContext | null>(null);

export const useAuthActions = () => {
  const authActionsContext = useContext(AuthContext);
  if (!authActionsContext) {
    throw new Error("useAuthActions must be used within AuthActionsContext");
  }
  return authActionsContext;
};
