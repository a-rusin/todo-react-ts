import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import configFile from "../config.json";

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (configFile.isFirebase && config.url) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
};
