import { Link } from "react-router-dom";
import { TodosList } from "../components/TodosList/TodosList";
import { postMockUpData } from "../services/postMockUpData";
import { todoMockUp } from "../mockUpData/Todos";

export const TodosPage = () => {
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
      </div>
      <TodosList />
    </div>
  );
};
