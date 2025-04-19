import { httpAuthService } from "./httpAuth.service";
import configFile from "../config.json";
import { LoginValue, RegisterValue } from "../models/LoginRegister";

export const authService = {
  register: async <T = any>(payload: RegisterValue) => {
    const { data } = await httpAuthService.post<T>("accounts:signUp", {
      ...payload,
      returnSecureToken: true,
    });
    return data;
  },
  login: async <T = any>(payload: LoginValue) => {
    const { data } = await httpAuthService.post<T>(
      "accounts:signInWithPassword",
      { ...payload, returnSecureToken: true }
    );
    return data;
  },
  getUserData: async (idToken: string) => {
    const { data } = await httpAuthService.post("accounts:lookup", { idToken });
    return data;
  },
};
