import { Link, useParams } from "react-router-dom";
import { CreateAndUpdateTodoForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { useForm } from "../hooks/useForm";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../context/TodosContext";
import { LoaderInline } from "../components/LoaderInline/LoaderInline";
import { Todo, TodosToServer } from "../models/Todo";
import { TagsContext } from "../context/TagsContext";
import { formatMillisecondsToDateString } from "../utils/formatMillisecondsToDateString";

type RouteParams = {
  id: string;
};

const validatorConfig: ValidatorConfig = {
  title: {
    isRequired: true,
  },
  description: {
    isRequired: true,
  },
  dateDeadline: {
    isRequired: true,
  },
  priorety: {
    isRequired: true,
  },
};

export const TodoEditItemPage = () => {
  const todosContext = useContext(TodosContext);
  const tagsContext = useContext(TagsContext);

  if (!todosContext || !tagsContext) {
    throw new Error("TodoProvider or TagsContext not found");
  }

  const { getTodoById, isLoading, todo, createUpdateTodos, resetTodo } =
    todosContext;
  const { tags, isLoading: isLoadingTags } = tagsContext;

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    if (id) {
      getTodoById(id);
    }

    return () => resetTodo();
  }, [id]);

  const defaultValue: TodosToServer | undefined = useMemo(
    () =>
      todo
        ? {
            ...todo,
            dateDeadline: formatMillisecondsToDateString(todo.dateDeadline),
          }
        : undefined,
    [todo]
  );

  const { formValue, handleChange, handleReset, handleSubmit, errors } =
    useForm<TodosToServer>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: TodosToServer) {
    const updatedData: TodosToServer = {
      ...data,
      dateDeadline: new Date(data.dateDeadline).getTime().toString(),
    };
    createUpdateTodos(updatedData, "editForm", "edit", true);
  }

  const multiSelectOptions: SingleSelectOptions<string>[] | undefined =
    tags?.map((tag) => ({
      label: tag.title,
      value: tag.id!,
    }));

  return (
    <div className="container">
      <h1 className="main-title">Редактирование задачи</h1>
      <Link to="/todos" className="main-url main-url-spacing">
        К списку задач
      </Link>
      {isLoading.getItem && (
        <div className="todo-status-container">
          <LoaderInline />
        </div>
      )}
      {!isLoading.getItem && todo && (
        <CreateAndUpdateTodoForm
          formValue={formValue}
          handleChange={handleChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          options={multiSelectOptions}
          errors={errors}
          isLoading={
            typeof isLoading.editForm === "boolean" ? isLoading.editForm : true
          }
          mode="edit"
        />
      )}
    </div>
  );
};
