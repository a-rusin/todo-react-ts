import { useLocation, useNavigate } from "react-router-dom";
import { PrioretyArray } from "../../constans/prioretyObj";
import { Todo, TodoPriorety, TodosContextLoading } from "../../models/Todo";
import { formatDateString } from "../../utils/formatDateString";
import "./TodoItemDetails.css";
import { CreateAndUpateFormType } from "../../models/CreateAndUpdate";
import { isLoadingTodoValue } from "../../utils/isLoadingTodoValue";

interface TodoItemDetailsProps {
  todo: Todo;
  deleteTodos: (id: string, redirect?: boolean) => void;
  isLoading: TodosContextLoading;
  createUpdateTodos: (
    payload: Todo,
    loadingType: keyof TodosContextLoading,
    mode?: CreateAndUpateFormType,
    redirect?: boolean
  ) => void;
}

export const TodoItemDetails = ({
  todo,
  createUpdateTodos,
  deleteTodos,
  isLoading,
}: TodoItemDetailsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoadingDelete = isLoadingTodoValue(isLoading.deleteItem);

  const isLoadingFav = isLoadingTodoValue(isLoading.favouriteItem);
  const isLoadingIsDone = isLoadingTodoValue(isLoading.isDoneItem);

  const handleClickEditTodoState = (prop: "isDone" | "favourite") => {
    const loadingType = `${prop}Item` as keyof TodosContextLoading;

    createUpdateTodos(
      { ...todo, [prop]: !todo[prop] },
      loadingType,
      "edit-item",
      false
    );
  };

  return (
    <div className={"todo-details-container " + (todo.isDone && "done")}>
      <div className="todo-details-btns">
        <button
          className="todo-details-btn todo-details-btn-done"
          onClick={() => handleClickEditTodoState("isDone")}
        >
          {todo.isDone ? "Не выполнено" : "Выполнено"}
        </button>
        <button
          className={
            "todo-details-btn todo-details-btn-fav " +
            (todo.id === isLoadingFav && " proccess") +
            (todo.favourite ? " checked" : " unchecked")
          }
          onClick={() => handleClickEditTodoState("favourite")}
        >
          {todo.favourite ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
        <button
          className="todo-details-btn todo-details-btn-edit"
          onClick={() =>
            navigate("/todos/edit/" + todo.id, {
              state: { from: location.pathname },
            })
          }
        >
          Изменить задачу
        </button>
        <button
          className={
            "todo-details-btn todo-details-btn-remove " +
            (todo.id === isLoadingDelete && " proccess")
          }
          onClick={() => deleteTodos(todo.id!, true)}
        >
          Удалить задачу
        </button>
      </div>
      <h5 className="todo-details-title">{todo.title}</h5>
      <p className="todo-details-description">{todo.description}</p>
      <ul className="todo-details-list">
        <li className="todo-details-list-item">
          <div className="todo-details-label">ID задачи:</div>
          <div className="todo-details-value ">{todo.id}</div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Приоретет:</div>
          <div
            className={"todo-details-value-priorety " + todo.priorety?.value}
          >
            {todo.priorety?.label}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дедлайн:</div>
          <div className="todo-details-value">
            {formatDateString(todo.dateDeadline)}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дата создания:</div>
          <div className="todo-details-value">
            {formatDateString(todo.createdDate)}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Теги:</div>
          {todo.tags && (
            <ul className="todo-details-tags-list">
              {todo.tags.map((tag) => (
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
