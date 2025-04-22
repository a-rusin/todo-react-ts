import { Link, useParams } from "react-router-dom";
import { CreateAndUpdateTodoForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { useForm } from "../hooks/useForm";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { useContext, useEffect } from "react";
import { TodosContext } from "../context/TodosContext";
import { LoaderInline } from "../components/LoaderInline/LoaderInline";
import { Todo } from "../models/Todo";
import { TagsContext } from "../context/TagsContext";

type RouteParams = {
  id: string;
};

const mockDataOptions: SingleSelectOptions[] = [
  { label: "test", value: "test" },
  { label: "test2", value: "test2" },
];

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

  const { formValue, handleChange, handleReset, handleSubmit, errors } =
    useForm<Todo>({
      defaultValue: todo,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: Todo) {
    createUpdateTodos(data, "editForm", "edit", true);
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
