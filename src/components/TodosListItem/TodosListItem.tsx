import { useLocation, useNavigate } from "react-router-dom";
import "./TodosListItem.css";
import { Link } from "react-router-dom";
import { Todo, TodoPriorety, TodosContextLoading } from "../../models/Todo";
import { formatDateString } from "../../utils/formatDateString";
import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { LoaderInline } from "../LoaderInline/LoaderInline";
import { isLoadingTodoValue } from "../../utils/isLoadingTodoValue";

export const TodosListItem = ({ todo }: { todo: Todo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { deleteTodos, isLoading, createUpdateTodos } = todosContext;

  const handleClickEditTodoState = (prop: "isDone" | "favourite") => {
    const loadingType = `${prop}Item` as keyof TodosContextLoading;

    createUpdateTodos(
      { ...todo, [prop]: !todo[prop] },
      loadingType,
      "edit",
      false
    );
  };

  const isLoadingDelete = isLoadingTodoValue(isLoading.deleteItem);
  const isLoadingFav = isLoadingTodoValue(isLoading.favouriteItem);
  const isLoadingIsDone = isLoadingTodoValue(isLoading.isDoneItem);

  return (
    <li
      className={
        "todo-list-item " +
        (todo?.id === isLoadingDelete && " process ") +
        (todo.priorety?.value === TodoPriorety.dangerous &&
          " dangerous-priorety ") +
        (todo.isDone && " done ")
      }
    >
      <div className="todo-item-container">
        <div
          className={
            "todo-item-done-btn " +
            (todo.isDone && " checked ") +
            (todo.id === isLoadingIsDone && " process")
          }
          onClick={() => handleClickEditTodoState("isDone")}
        ></div>
        <div className="todo-item-main-info">
          <div className="todo-item-header">
            <Link to={"/todos/" + todo.id} className="todo-item-name">
              {todo.title}
            </Link>
            {todo.priorety?.value === TodoPriorety.dangerous && (
              <div className="todo-item-priorety-label">Срочно</div>
            )}
          </div>
          <div className="todo-item-details">
            <p className="todo-item-description">{todo.description}</p>
            {todo.tags && (
              <ul className="todo-item-tags">
                {todo.tags.map((tag) => (
                  <li key={tag.value} className="todo-item-tag">
                    #{tag.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="todo-item-deadline">
              {formatDateString(todo.dateDeadline)}
            </div>
          </div>
        </div>
        <div className="todo-item-actions-btns">
          <button
            className="todo-item-action-btn todo-item-action-btn-fav"
            onClick={() => handleClickEditTodoState("favourite")}
          >
            {todo.id === isLoadingFav ? (
              <LoaderInline />
            ) : (
              <span
                className={
                  "todo-item-action-btn-fav-icon " +
                  (todo.favourite ? "checked" : "unchecked")
                }
              ></span>
            )}
          </button>
          <button
            className="todo-item-action-btn todo-item-action-btn-edit"
            onClick={() =>
              navigate("/todos/edit/" + todo.id, {
                state: { from: location.pathname },
              })
            }
          ></button>
          <button
            className={"todo-item-action-btn todo-item-action-btn-delete"}
            onClick={() => deleteTodos(todo.id!, false)}
          >
            {todo.id === isLoadingDelete ? (
              <LoaderInline />
            ) : (
              <span className="todo-item-action-btn-delete-icon"></span>
            )}
          </button>
        </div>
      </div>
    </li>
  );
};
