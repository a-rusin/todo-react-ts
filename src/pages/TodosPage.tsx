import { Link } from "react-router-dom";
import { TodosList } from "../components/TodosList/TodosList";

import { todoMockUp } from "../mockUpData/Todos";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { postMockUpData } from "../services/postMockUpData";

export const TodosPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthProvider not found");
  }

  const { logOut } = authContext;

  return (
    <div className="container">
      <h1 className="main-title">Список моих задач:</h1>
      <div className="page-header main-url-spacing">
        <Link to="/todos/create" className="main-url">
          Создать задачу
        </Link>
        <div>|</div>
        <div
          className="main-url"
          onClick={() => postMockUpData(todoMockUp)}
          role="button"
        >
          Загрузить на сервер mockUpData Todo
        </div>
        <div>|</div>
        <div className="main-url" onClick={logOut} role="button">
          Выйти из аккаунта
        </div>
      </div>
      <TodosList />
    </div>
  );
};
