import { Link, useParams } from "react-router-dom";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { useForm } from "../hooks/useForm";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
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

  const { getTodoById, isLoading, todo, createUpdateTodos, resetTodo } =
    todosContext;

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
    createUpdateTodos(data, "edit", true);
  }

  return (
    <div className="container">
      <h1 className="main-title">Редактирование задачи</h1>
      <Link to="/todos" className="main-url main-url-spacing">
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
          isLoading={
            typeof isLoading.edit === "boolean" ? isLoading.edit : true
          }
          mode="edit"
        />
      )}
    </div>
  );
};
