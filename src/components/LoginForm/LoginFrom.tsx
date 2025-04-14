import { useForm } from "../../hooks/useForm";
import { LoginValue } from "../../models/LoginRegister";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { LoginRegisterFormType } from "../../pages/LoginPage";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import "./LoginForm.css";

const defaultValue: LoginValue = {
  login: "",
  password: "",
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
  const { formValue, handleChange, handleSubmit, errors } = useForm<LoginValue>(
    {
      defaultValue,
      onSubmit,
      validatorConfig,
    }
  );

  function onSubmit(data: LoginValue) {
    console.log(data);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="main-title">Авторизация</h1>
      <InputField
        autoComplete="off"
        id="login"
        label="Логин"
        name="login"
        onChange={handleChange}
        type="text"
        value={formValue.login}
        errors={errors?.login}
        placeholder="Начите печать..."
      />
      <InputField
        autoComplete="off"
        id="password"
        label="Пароль"
        name="password"
        onChange={handleChange}
        type="password"
        value={formValue.password}
        errors={errors?.password}
        placeholder="Начите печать..."
      />
      <div className="btns-auth-group">
        <Button label="Войти" cssType="primary" type="submit" />
      </div>
      <p className="auth-form-change-mode">
        Еще нет аккаунта?{" "}
        <span onClick={() => handleClick("register")}>Зарегестрироваться</span>
      </p>
    </form>
  );
};
