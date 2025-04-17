import axios from "axios";

const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

export const httpAuthService = {
  get: httpAuth.get,
  post: httpAuth.post,
  put: httpAuth.put,
  patch: httpAuth.patch,
  delete: httpAuth.delete,
};
