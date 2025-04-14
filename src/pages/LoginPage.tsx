import { useState } from "react";
import { LoginForm } from "../components/LoginForm/LoginFrom";

export type LoginRegisterFormType = "login" | "register";

export const LoginPage = () => {
  const [formType, setFormType] = useState<LoginRegisterFormType>("login");

  const handleClick = (type: LoginRegisterFormType) => {
    setFormType(type);
  };

  return (
    <div className="auth-container">
      <LoginForm handleClick={handleClick} />
    </div>
  );
};
