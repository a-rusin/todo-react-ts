export interface LoginValue {
  email: string;
  password: string;
}

export interface RegisterValue {
  login: string;
  name: string;
  email: string;
  password: string;
}

export type AuthContextType = {
  isLoading: boolean;
  register: (payload: RegisterValue, callback: () => void) => void;
  login: (payload: LoginValue) => void;
  error: string | undefined;
  resetError: () => void;
  currentUser: string | undefined;
  logOut: () => void;
};

export interface RegisterLoginServerResponce {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
}

export interface RegisterFailedFirebaseError {
  error: {
    code: number;
    message: string;
  };
}
