import { RegisterLoginServerResponce } from "../models/LoginRegister";

const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

const setTokens = ({
  refreshToken,
  idToken,
  expiresIn,
  localId,
}: RegisterLoginServerResponce) => {
  const expiresDate = new Date().getTime() + parseInt(expiresIn) * 1000;

  localStorage.setItem(USERID_KEY, localId);
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
};

const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

const getExpiresDate = () => localStorage.getItem(EXPIRES_KEY);

const getLocalUserId = () => localStorage.getItem(USERID_KEY);

const removeAuthData = () => {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
};

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getLocalUserId,
  removeAuthData,
};

export default localStorageService;
