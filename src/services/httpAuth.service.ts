import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import configFile from "../config.json";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

httpAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.params = { ...config.params, key: configFile.apiKey };
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export const httpAuthService = {
  get: httpAuth.get,
  post: httpAuth.post,
  put: httpAuth.put,
  patch: httpAuth.patch,
  delete: httpAuth.delete,
};
