import { createContext, ReactNode, useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const NavigateContext = createContext<NavigateFunction | undefined>(undefined);

interface NavigateContextProviderProps {
  children: ReactNode;
}

export const NavigateContextProvider = ({
  children,
}: NavigateContextProviderProps) => {
  const navigate = useNavigate();

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
};

export const useAppNavigate = () => {
  const navigate = useContext(NavigateContext);

  if (!navigate) {
    throw new Error("useAppNavigate must be used within a NavigateProvider");
  }

  return navigate;
};
