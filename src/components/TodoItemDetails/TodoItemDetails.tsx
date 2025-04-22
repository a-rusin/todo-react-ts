import { useLocation, useNavigate } from "react-router-dom";
import { Todo, TodosContextLoading, TodosToServer } from "../../models/Todo";
import { CreateAndUpateFormType } from "../../models/CreateAndUpdateFromTypes";
import { isLoadingValue } from "../../utils/isLoadingValue";
import { getCurrentDate } from "../../utils/getCurrentDate";
import "./TodoItemDetails.css";
import { SingleSelectOptions } from "../../models/MultiSingleSelectOptions";
import { prepareTags } from "../../utils/prepareDataForClient";
import { useContext } from "react";
import { TagsContext } from "../../context/TagsContext";

interface TodoItemDetailsProps {
  todo: TodosToServer;
  deleteTodos: (id: string, redirect?: boolean) => void;
  isLoading: TodosContextLoading;
  createUpdateTodos: (
    payload: TodosToServer,
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
  const tagsContext = useContext(TagsContext);

  if (!tagsContext) {
    throw new Error("TagsProvider not found");
  }

  const { tags } = tagsContext;

  const navigate = useNavigate();
  const location = useLocation();

  const isLoadingDelete = isLoadingValue(isLoading.deleteItem);

  const isLoadingFav = isLoadingValue(isLoading.favouriteItem);
  const isLoadingIsDone = isLoadingValue(isLoading.isDoneItem);

  const handleClickEditTodoState = (prop: "isDone" | "favourite") => {
    const loadingType = `${prop}Item` as keyof TodosContextLoading;

    createUpdateTodos(
      { ...todo, [prop]: !todo[prop] },
      loadingType,
      "edit-item",
      false
    );
  };

  let updatedTags: SingleSelectOptions<string>[] = prepareTags(todo.tags, tags);

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
            {getCurrentDate(todo.dateDeadline, false)}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Дата создания:</div>
          <div className="todo-details-value">
            {getCurrentDate(todo.createdDate, false)}
          </div>
        </li>
        <li className="todo-details-list-item">
          <div className="todo-details-label">Теги:</div>
          {updatedTags && (
            <ul className="todo-details-tags-list">
              {updatedTags.map((tag) => (
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
