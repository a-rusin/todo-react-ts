import "./TodosList.css";
import { TodosListItem } from "../TodosListItem/TodosListItem";
import { useContext, useEffect } from "react";
import { TodosContext } from "../../context/TodosContext";
import { LoaderInline } from "../LoaderInline/LoaderInline";

export const TodosList = ({}) => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { todos, isLoading } = todosContext;

  if (isLoading.get) {
    return (
      <div className="todo-status-container">
        <LoaderInline />
      </div>
    );
  } else if (Array.isArray(todos) && todos.length !== 0) {
    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodosListItem key={todo.id} {...todo} />
        ))}
      </ul>
    );
  } else {
    return <div className="todo-status-container">Список задач пока пуст</div>;
  }
};
