export const handleError = (errorMessage: string): string => {
  switch (errorMessage) {
    case "WEAK_PASSWORD : Password should be at least 6 characters":
      return "Слабый пароль, пароль должен содержать как минимум 6 символов";
      break;
    case "EMAIL_EXISTS":
      return "Email уже зарегистрирован";
      break;
    case "INVALID_LOGIN_CREDENTIALS":
      return "Неверный логин или пароль";
      break;
    case "INVALID_ID_TOKEN":
      return "Ошибка авторизации, попробоуйте войти еще раз";
      break;
    default:
      return "Неизственная ошибка, попробуй позже";
      break;
  }
};
