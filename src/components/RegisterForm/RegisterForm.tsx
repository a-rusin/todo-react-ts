import { useForm } from "../../hooks/useForm";
import { LoginValue, RegisterValue } from "../../models/LoginRegister";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { LoginRegisterFormType } from "../../pages/LoginPage";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import "./RegisterForm.css";

const defaultValue: RegisterValue = {
  login: "",
  email: "",
  password: "",
};

const validatorConfig: ValidatorConfig = {
  login: {
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
  const { formValue, handleChange, handleSubmit, errors } =
    useForm<RegisterValue>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: LoginValue) {
    console.log(data);
  }

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
      <div className="btns-auth-group">
        <Button label="Регистрация" cssType="primary" type="submit" />
      </div>
      <p className="auth-form-change-mode">
        Уже есть аккаунт?{" "}
        <span onClick={() => handleClick("login")}>Войти</span>
      </p>
    </form>
  );
};
