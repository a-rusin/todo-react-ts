import { useLocation, useNavigate } from "react-router-dom";
import { PrioretyArray } from "../../constans/prioretyObj";
import { Todo, TodoPriorety, TodosContextLoading } from "../../models/Todo";
import { formatDateString } from "../../utils/formatDateString";
import "./TodoItemDetails.css";
import { CreateAndUpateFormType } from "../../models/CreateAndUpdate";

interface TodoItemDetailsProps extends Todo {
  deleteTodos: (id: string, redirect?: boolean) => void;
  isLoading: TodosContextLoading;
  createUpdateTodos: (
    payload: Todo,
    mode?: CreateAndUpateFormType,
    redirect?: boolean
  ) => void;
}

export const TodoItemDetails = ({
  createdDate,
  dateDeadline,
  description,
  favourite,
  priorety,
  tags,
  title,
  id,
  deleteTodos,
  isLoading,
  userId,
  createUpdateTodos,
}: TodoItemDetailsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoadingDelete =
    typeof isLoading.delete === "boolean"
      ? isLoading.delete
      : isLoading.delete.id;

  const isLoadingFav =
    typeof isLoading.edit === "boolean" ? isLoading.edit : isLoading.edit.id;

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
      "edit-item",
      false
    );
  };

  return (
    <div className="todo-details-container">
      <div className="todo-details-btns">
        <button className="todo-details-btn todo-details-btn-done">
          Выполнено
        </button>
        <button
          className={
            "todo-details-btn todo-details-btn-fav " +
            (id === isLoadingFav && " proccess") +
            (favourite ? " checked" : " unchecked")
          }
          onClick={handleClickFavorite}
        >
          {favourite ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
        <button
          className="todo-details-btn todo-details-btn-edit"
          onClick={() =>
            navigate("/todos/edit/" + id, {
              state: { from: location.pathname },
            })
          }
        >
          Изменить задачу
        </button>
        <button
          className={
            "todo-details-btn todo-details-btn-remove " +
            (id === isLoadingDelete && " proccess")
          }
          onClick={() => deleteTodos(id!, true)}
        >
          Удалить задачу
        </button>
      </div>
      <h5 className="todo-details-title">{title}</h5>
      <p className="todo-details-description">{description}</p>
      <ul className="todo-details-list">
        <li className="todo-details-list-item">
          <div className="todo-details-label">ID задачи:</div>
          <div className="todo-details-value ">{id}</div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Приоретет:</div>
          <div className={"todo-details-value-priorety " + priorety?.value}>
            {priorety?.label}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дедлайн:</div>
          <div className="todo-details-value">
            {formatDateString(dateDeadline)}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дата создания:</div>
          <div className="todo-details-value">
            {formatDateString(createdDate)}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Теги:</div>
          {tags && (
            <ul className="todo-details-tags-list">
              {tags.map((tag) => (
                <li key={tag.value} className="todo-details-tags-list-item">
                  #{tag.label}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};
