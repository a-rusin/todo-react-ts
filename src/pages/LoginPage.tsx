import { useState } from "react";
import { LoginForm } from "../components/LoginForm/LoginFrom";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

export type LoginRegisterFormType = "login" | "register";

export const LoginPage = () => {
  const [formType, setFormType] = useState<LoginRegisterFormType>("login");

  const handleClick = (type: LoginRegisterFormType) => {
    setFormType(type);
  };

  return (
    <div className="auth-container">
      {formType === "login" ? (
        <LoginForm handleClick={handleClick} />
      ) : (
        <RegisterForm handleClick={handleClick} />
      )}
    </div>
  );
};
