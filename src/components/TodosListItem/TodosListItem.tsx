import { useNavigate } from "react-router-dom";
import "./TodosListItem.css";
import { Link } from "react-router-dom";
import { Todo, TodoPriorety } from "../../models/Todo";
import { formatDateString } from "../../utils/formatDateString";
import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { LoaderInline } from "../LoaderInline/LoaderInline";

export const TodosListItem = ({
  dateDeadline,
  description,
  priorety,
  tags,
  title,
  id,
  favourite,
  createdDate,
  userId,
}: Todo) => {
  const navigate = useNavigate();

  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { deleteTodos, isLoading, createUpdateTodos } = todosContext;

  const handleClickFavorite = () => {
    createUpdateTodos(
      {
        createdDate,
        dateDeadline,
        description,
        priorety,
        tags,
        title,
        userId,
        id,
        favourite: !favourite,
      },
      "edit"
    );
  };

  const isLoadingDelete =
    typeof isLoading.delete === "boolean" ? false : isLoading.delete.id;

  const isLoadingFav =
    typeof isLoading.edit === "boolean" ? false : isLoading.edit.id;

  return (
    <li
      className={
        "todo-list-item " +
        (id === isLoadingDelete && " removing ") +
        (priorety?.value === TodoPriorety.dangerous && " dangerous-priorety ")
      }
    >
      <div className="todo-item-container">
        <div className="todo-item-done-btn"></div>
        <div className="todo-item-main-info">
          <div className="todo-item-header">
            <Link to={"/todos/" + id} className="todo-item-name">
              {title}
            </Link>
            {priorety?.value === TodoPriorety.dangerous && (
              <div className="todo-item-priorety-label">Срочно</div>
            )}
          </div>
          <div className="todo-item-details">
            <p className="todo-item-description">{description}</p>
            {tags && (
              <ul className="todo-item-tags">
                {tags.map((tag) => (
                  <li key={tag.value} className="todo-item-tag">
                    {tag.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="todo-item-deadline">
              {formatDateString(dateDeadline)}
            </div>
          </div>
        </div>
        <div className="todo-item-actions-btns">
          <button
            className="todo-item-action-btn todo-item-action-btn-fav"
            onClick={handleClickFavorite}
          >
            {id === isLoadingFav ? (
              <LoaderInline />
            ) : (
              <span
                className={
                  "todo-item-action-btn-fav-icon " +
                  (favourite ? "checked" : "unchecked")
                }
              ></span>
            )}
          </button>
          <button
            className="todo-item-action-btn todo-item-action-btn-edit"
            onClick={() => navigate("/todos/edit/" + id)}
          ></button>
          <button
            className={"todo-item-action-btn todo-item-action-btn-delete"}
            onClick={() => deleteTodos(id!)}
          >
            {id === isLoadingDelete ? (
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
