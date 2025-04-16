import { Link, useParams } from "react-router-dom";
import { TodoItemComments } from "../components/TodoItemComments/TodoItemComments";
import { TodoItemDetails } from "../components/TodoItemDetails/TodoItemDetails";
import { useContext, useEffect } from "react";
import { TodosContext } from "../context/TodosContext";
import { LoaderInline } from "../components/LoaderInline/LoaderInline";

type RouteParams = {
  id: string;
};

export const TodoItemPage = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const {
    getTodoById,
    isLoading,
    resetTodo,
    todo,
    deleteTodos,
    createUpdateTodos,
  } = todosContext;

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    if (id) {
      getTodoById(id);
    }

    return () => resetTodo();
  }, [id]);

  return (
    <div className="container">
      <h1 className="main-title">Детали задачи:</h1>
      <Link to="/todos" className="go-back">
        К списку задач
      </Link>
      {isLoading.get && (
        <div className="todo-status-container">
          <LoaderInline />
        </div>
      )}
      {!isLoading.get && todo && (
        <>
          <TodoItemDetails
            {...todo}
            deleteTodos={deleteTodos}
            isLoading={isLoading}
            createUpdateTodos={createUpdateTodos}
          />
          <TodoItemComments />
        </>
      )}
    </div>
  );
};
