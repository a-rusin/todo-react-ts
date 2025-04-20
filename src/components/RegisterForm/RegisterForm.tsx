import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { LoginValue, RegisterValue } from "../../models/LoginRegister";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { LoginRegisterFormType } from "../../pages/LoginPage";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import "./RegisterForm.css";
import { AuthContext } from "../../context/AuthContext";
import { getRandomNumber } from "../../utils/getRandomNumber";

const defaultValue: RegisterValue = {
  login: "test",
  name: "test",
  email: `test${getRandomNumber(1, 100)}@mail.ru`,
  password: "123456",
};

const validatorConfig: ValidatorConfig = {
  login: {
    isRequired: true,
  },
  name: {
    isRequired: true,
  },
  email: {
    isRequired: true,
    email: true,
  },
  password: {
    isRequired: true,
  },
};

interface RegisterFormProps {
  handleClick: (type: LoginRegisterFormType) => void;
}

export const RegisterForm = ({ handleClick }: RegisterFormProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthProvider not found");
  }

  const { register, error, resetError, isLoading } = authContext;

  const { formValue, handleChange, handleSubmit, errors } =
    useForm<RegisterValue>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: RegisterValue) {
    register(data, () => handleClick("login"));
  }

  const handleClickChangeMode = () => {
    resetError();
    handleClick("login");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="main-title">Регистрация</h1>
      <InputField
        autoComplete="off"
        id="login"
        label="Логин"
        name="login"
        onChange={handleChange}
        type="text"
        value={formValue?.login}
        errors={errors?.login}
        placeholder="Начите печать..."
      />
      <InputField
        autoComplete="off"
        id="name"
        label="Имя"
        name="name"
        onChange={handleChange}
        type="text"
        value={formValue?.name}
        errors={errors?.name}
        placeholder="Начите печать..."
      />
      <InputField
        autoComplete="off"
        id="email"
        label="Email"
        name="email"
        onChange={handleChange}
        type="text"
        value={formValue?.email}
        errors={errors?.email}
        placeholder="Начите печать..."
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
      />
      {error && <div className="auth-form-error">Ошибка: {error}</div>}

      <div className="btns-auth-group">
        <Button
          label="Регистрация"
          cssType="primary"
          type="submit"
          isLoading={isLoading}
        />
      </div>
      <p className="auth-form-change-mode">
        Уже есть аккаунт? <span onClick={handleClickChangeMode}>Войти</span>
      </p>
    </form>
  );
};
