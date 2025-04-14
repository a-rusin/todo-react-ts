import "./TodosList.css";
import { TodosListItem } from "../TodosListItem/TodosListItem";

export const TodosList = ({}) => {
  return (
    <ul className="todo-list">
      <TodosListItem />
    </ul>
  );
};
