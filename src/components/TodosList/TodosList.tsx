import "./TodosList.css";
import { TodosListItem } from "../TodosListItem/TodosListItem";
import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { LoaderInline } from "../LoaderInline/LoaderInline";

export const TodosList = ({}) => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoProvider not found");
  }

  const { todos, isLoading } = todosContext;

  const sortedComments =
    todos &&
    todos.sort((a, b) => {
      return Number(b.createdDate) - Number(a.createdDate);
    });

  if (isLoading.getItems) {
    return (
      <div className="todo-status-container">
        <LoaderInline />
      </div>
    );
  } else if (Array.isArray(sortedComments) && sortedComments.length !== 0) {
    return (
      <ul className="todo-list">
        {sortedComments.map((todo) => (
          <TodosListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  } else {
    return <div className="todo-status-container">Список задач пока пуст</div>;
  }
};
