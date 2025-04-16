import { Link, useParams } from "react-router-dom";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { useForm } from "../hooks/useForm";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { useContext, useEffect } from "react";
import { TodosContext } from "../context/TodosContext";
import { LoaderInline } from "../components/LoaderInline/LoaderInline";
import { Todo } from "../models/Todo";

type RouteParams = {
  id: string;
};

const mockDataOptions: SingleSelectOptions[] = [
  { label: "test", value: "test" },
  { label: "test2", value: "test2" },
];

const defaultValue: CreateAndUpateFormValue = {
  title: "",
  description: "",
  dateDeadline: "",
  priorety: null,
  favourite: false,
  tags: null,
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

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { getTodoById, isLoading, todo, createUpdateTodos } = todosContext;

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    if (id) {
      getTodoById(id);
    }
  }, []);

  const { formValue, handleChange, handleReset, handleSubmit, errors } =
    useForm<Todo>({
      defaultValue: todo,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: Todo) {
    createUpdateTodos(data, "edit");
  }

  return (
    <div className="container">
      <h1 className="main-title">Редактирование задачи #{id}</h1>
      <Link to="/todos" className="go-back">
        К списку задач
      </Link>
      {isLoading.get && (
        <div className="todo-status-container">
          <LoaderInline />
        </div>
      )}
      {!isLoading.get && todo && (
        <CreateAndUpdateForm
          formValue={formValue}
          handleChange={handleChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          options={mockDataOptions}
          errors={errors}
          isLoading={isLoading.create}
          mode="edit"
        />
      )}
    </div>
  );
};
