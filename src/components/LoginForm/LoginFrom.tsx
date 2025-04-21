import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { LoginValue } from "../../models/LoginRegister";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { LoginRegisterFormType } from "../../pages/LoginPage";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import "./LoginForm.css";

const defaultValue: LoginValue = {
  email: "test@mail.ru",
  password: "123456",
};

const validatorConfig: ValidatorConfig = {
  login: {
    isRequired: true,
    email: true,
  },
  password: {
    isRequired: true,
  },
};

interface LoginFormProps {
  handleClick: (type: LoginRegisterFormType) => void;
}

export const LoginForm = ({ handleClick }: LoginFormProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthProvider not found");
  }

  const { login, error, resetError, isLoading } = authContext;

  const { formValue, handleChange, handleSubmit, errors } = useForm<LoginValue>(
    {
      defaultValue,
      onSubmit,
      validatorConfig,
    }
  );

  function onSubmit(data: LoginValue) {
    login(data);
  }

  const handleClickChangeMode = () => {
    resetError();
    handleClick("register");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="main-title">Авторизация</h1>
      <InputField
        autoComplete="off"
        id="email"
        label="Логин"
        name="email"
        onChange={handleChange}
        type="text"
        value={formValue?.email}
        errors={errors?.email}
        placeholder="Начите печать..."
        inputSizes="xl"
      />
      <InputField
        autoComplete="off"
        id="password"
        label="Пароль"
        name="password"
        onChange={handleChange}
        type="password"
        value={formValue?.password}
        errors={errors?.password}
        placeholder="Начите печать..."
        inputSizes="xl"
      />
      {error && <div className="auth-form-error">Ошибка: {error}</div>}
      <div className="btns-auth-group">
        <Button
          label="Войти"
          cssType="primary"
          type="submit"
          isLoading={isLoading}
          inputSizes="xl"
        />
      </div>
      <p className="auth-form-change-mode">
        Еще нет аккаунта?{" "}
        <span onClick={handleClickChangeMode}>Зарегистрироваться</span>
      </p>
    </form>
  );
};
