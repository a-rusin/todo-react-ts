import { Link } from "react-router-dom";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";
import { useForm } from "../hooks/useForm";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { Todo } from "../models/Todo";
import { nanoid } from "nanoid";
import { getCreatedDate } from "../utils/getCreatedDate";
import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

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

export const TodoCreatePage = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("TodoList must be used within a TodoProvider");
  }

  const { createTodos, isLoading } = todosContext;

  const { formValue, handleChange, handleReset, handleSubmit, errors } =
    useForm<CreateAndUpateFormValue>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: CreateAndUpateFormValue) {
    const updatedData: Todo = {
      id: nanoid(),
      userId: "000000",
      createdDate: getCreatedDate(),
      ...data,
    };

    createTodos(updatedData);
  }

  return (
    <div className="container">
      <h1 className="main-title">Создание новой задачи</h1>
      <Link to="/todos" className="go-back">
        К списку задач
      </Link>
      <CreateAndUpdateForm
        formValue={formValue}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        options={mockDataOptions}
        errors={errors}
        isLoading={isLoading.create}
      />
    </div>
  );
};
