import { useLocation, useNavigate } from "react-router-dom";
import "./TodosListItem.css";
import { Link } from "react-router-dom";
import { TodoPriorety, TodosContextLoading, TodosToServer } from "../../models/Todo";
import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { LoaderInline } from "../LoaderInline/LoaderInline";
import { isLoadingValue } from "../../utils/isLoadingValue";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { TagsContext } from "../../context/TagsContext";
import { SingleSelectOptions } from "../../models/MultiSingleSelectOptions";
import { prepareTags } from "../../utils/prepareDataForClient";

export const TodosListItem = ({ todo }: { todo: TodosToServer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const todosContext = useContext(TodosContext);
  const tagsContext = useContext(TagsContext);

  if (!todosContext || !tagsContext) {
    throw new Error("TodoProvider or TagsContext not found");
  }

  const { deleteTodos, isLoading, createUpdateTodos } = todosContext;
  const { tags } = tagsContext;

  const handleClickEditTodoState = (prop: "isDone" | "favourite") => {
    const loadingType = `${prop}Item` as keyof TodosContextLoading;

    createUpdateTodos({ ...todo, [prop]: !todo[prop] }, loadingType, "edit", false);
  };

  const handleClickEdit = (id: string | undefined) => {
    navigate("/todos/edit/" + id, {
      state: { from: location.pathname },
    });
  };

  const handleClickDelete = (id: string | undefined) => {
    deleteTodos(id!, false);
  };

  const isLoadingDelete = isLoadingValue(isLoading.deleteItem);
  const isLoadingFav = isLoadingValue(isLoading.favouriteItem);
  const isLoadingIsDone = isLoadingValue(isLoading.isDoneItem);

  let updatedTags: SingleSelectOptions<string>[] = prepareTags(todo.tags, tags);

  return (
    <li
      className={
        "todo-list-item " +
        (todo?.id === isLoadingDelete && " process ") +
        (todo.priorety?.value === TodoPriorety.dangerous && " dangerous-priorety ") +
        (todo.isDone && " done ")
      }
    >
      <div className="todo-item-container">
        <div
          className={"todo-item-done-btn " + (todo.isDone && " checked ") + (todo.id === isLoadingIsDone && " process")}
          onClick={() => handleClickEditTodoState("isDone")}
        ></div>
        <div className="todo-item-main-info">
          <div className="todo-item-header">
            <div className="todo-item-title">
              <Link to={"/todos/" + todo.id} className="todo-item-name">
                {todo.title}
              </Link>
              {todo.priorety?.value === TodoPriorety.dangerous && <div className="todo-item-priorety-label">Срочно</div>}
            </div>
            <div className="todo-item-actions-btns">
              <button className="todo-item-action-btn todo-item-action-btn-fav" onClick={() => handleClickEditTodoState("favourite")}>
                {todo.id === isLoadingFav ? (
                  <LoaderInline />
                ) : (
                  <span className={"todo-item-action-btn-fav-icon " + (todo.favourite ? "checked" : "unchecked")}></span>
                )}
              </button>
              <EditButton handleClick={handleClickEdit} id={todo.id} />
              <DeleteButton handleClick={handleClickDelete} id={todo.id} isLoading={isLoadingDelete} />
            </div>
          </div>
          <div className="todo-item-details">
            <p className="todo-item-description">{todo.description}</p>
            {updatedTags && (
              <ul className="todo-item-tags">
                {updatedTags.map((tag) => (
                  <li key={tag.value} className="todo-item-tag">
                    #{tag.label}
                  </li>
                ))}
              </ul>
            )}

            <div className="todo-item-deadline">{getCurrentDate(todo.dateDeadline, false)}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
