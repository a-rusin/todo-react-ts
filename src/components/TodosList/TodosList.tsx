import "./TodosList.css";
import { TodosListItem } from "../TodosListItem/TodosListItem";
import { useContext, useEffect } from "react";
import { TodosContext } from "../../context/TodosContext";
import { Loader } from "../Loader/Loader";
import { LoaderInline } from "../LoaderInline/LoaderInline";

export const TodosList = ({}) => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { getTodos, todos, isLoading } = todosContext;

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="todo-status-container">
          <LoaderInline />
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodosListItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </>
  );
};
