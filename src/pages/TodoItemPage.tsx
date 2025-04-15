import { Link } from "react-router-dom";
import { TodoItemComments } from "../components/TodoItemComments/TodoItemComments";
import { TodoItemDetails } from "../components/TodoItemDetails/TodoItemDetails";

export const TodoItemPage = () => {
  return (
    <div className="container">
      <h1 className="main-title">Детали задачи:</h1>
      <Link to="/todos" className="go-back">
        К списку задач
      </Link>
      <TodoItemDetails />
      <TodoItemComments />
    </div>
  );
};
