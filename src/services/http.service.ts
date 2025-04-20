import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (configFile.isFirebase && config.url) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

      const accessToken = localStorageService.getAccessToken();

      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (configFile.isFirebase && response.data && !response.data.id) {
      const oldData: { [key: string]: any } = response.data;
      let newData = [];

      for (const key in oldData) {
        newData.push(oldData[key]);
      }

      response.data = newData;
    }

    return response;
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
