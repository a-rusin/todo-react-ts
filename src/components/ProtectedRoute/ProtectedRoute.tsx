import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderInline } from "../LoaderInline/LoaderInline";

export const ProtectedRoute = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthProvider not found");
  }

  const { currentUser, isLoading } = authContext;

  if (isLoading) {
    return (
      <div className="container">
        <div className="main-page-container auth-container-loading">
          <div>
            <LoaderInline />
          </div>
          <p>Попытка авторизации...</p>
        </div>
      </div>
    );
  } else {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  }
};
