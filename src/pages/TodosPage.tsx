import { Link } from "react-router-dom";
import { TodosList } from "../components/TodosList/TodosList";

export const TodosPage = () => {
  return (
    <div className="container">
      <h1 className="main-title">Список моих задач:</h1>
      <Link to="/todos/create" className="go-back">
        Создать задачу
      </Link>
      <TodosList />
    </div>
  );
};
