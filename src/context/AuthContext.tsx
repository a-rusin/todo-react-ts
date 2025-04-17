import { createContext, ReactNode, useState } from "react";
import {
  AuthContextType,
  LoginValue,
  RegisterFailedFirebaseError,
  RegisterServerResponce,
  RegisterValue,
} from "../models/LoginRegister";
import { authService } from "../services/auth.service";
import { AxiosError, isAxiosError } from "axios";
import { handleError } from "../utils/handleError";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const register = async (payload: RegisterValue, callback: () => void) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const data = await authService.register<RegisterServerResponce>(payload);
      callback();
    } catch (err) {
      hadleErrorResponce(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload: LoginValue) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const data = await authService.login<LoginValue>(payload);
    } catch (err) {
      hadleErrorResponce(err);
    } finally {
      setIsLoading(false);
    }
  };

  const hadleErrorResponce = (err: unknown) => {
    const error = err as AxiosError<RegisterFailedFirebaseError>;
    if (error.response) {
      const errMsg = handleError(error.response.data.error.message);
      setError(errMsg);
    }
  };

  const resetError = () => {
    setError(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ register, isLoading, error, login, resetError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
