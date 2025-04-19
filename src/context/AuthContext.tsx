import { createContext, ReactNode, useEffect, useState } from "react";
import {
  AuthContextType,
  LoginValue,
  RegisterFailedFirebaseError,
  RegisterLoginServerResponce,
  RegisterValue,
} from "../models/LoginRegister";
import { authService } from "../services/auth.service";
import { AxiosError, isAxiosError } from "axios";
import { handleError } from "../utils/handleError";
import localStorageService from "../services/localStorage.service";
import { useAppNavigate } from "../hooks/useAppNavigate";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [currentUser, setCurrentUser] = useState<string | undefined>();

  useEffect(() => {
    const userId = localStorageService.getLocalUserId();
    const idToken = localStorageService.getAccessToken();
    if (userId && idToken) {
      getUserData(idToken, userId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const appNavigate = useAppNavigate();

  const getUserData = async (idToken: string, userId: string) => {
    try {
      const data = await authService.getUserData(idToken);
      setCurrentUser(userId);
    } catch (err) {
      hadleErrorResponce(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterValue, callback: () => void) => {
    setError(undefined);
    try {
      const data = await authService.register<RegisterLoginServerResponce>(
        payload
      );
      callback();
    } catch (err) {
      hadleErrorResponce(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload: LoginValue) => {
    setError(undefined);
    try {
      const data = await authService.login<RegisterLoginServerResponce>(
        payload
      );
      setCurrentUser(data.localId);
      localStorageService.setTokens(data);
      appNavigate("/");
      console.log(data);
    } catch (err) {
      hadleErrorResponce(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    localStorageService.removeAuthData();
    appNavigate("/login");
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
      value={{
        register,
        isLoading,
        error,
        login,
        resetError,
        currentUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
