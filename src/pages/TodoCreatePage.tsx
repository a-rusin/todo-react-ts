import { Link } from "react-router-dom";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";
import { useForm } from "../hooks/useForm";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { Todo } from "../models/Todo";
import { nanoid } from "nanoid";

import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { AuthContext } from "../context/AuthContext";

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
  const authContext = useContext(AuthContext);

  if (!todosContext || !authContext) {
    throw new Error("TodoProvider or AuthProvider not found");
  }

  const { createUpdateTodos, isLoading } = todosContext;
  const { currentUser } = authContext;

  const { formValue, handleChange, handleReset, handleSubmit, errors } =
    useForm<CreateAndUpateFormValue>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: CreateAndUpateFormValue) {
    const updatedData: Todo = {
      ...data,
      id: nanoid(),
      userId: currentUser!,
      createdDate: Date.now().toString(),
      isDone: false,
      dateDeadline: new Date(formValue!.dateDeadline).getTime().toString(),
    };

    createUpdateTodos(updatedData, "createForm", "create", true);
  }

  return (
    <div className="container">
      <h1 className="main-title">Создание новой задачи</h1>
      <Link to="/todos" className="main-url main-url-spacing">
        К списку задач
      </Link>
      <CreateAndUpdateForm
        formValue={formValue}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        options={mockDataOptions}
        errors={errors}
        isLoading={isLoading.createForm}
        mode="create"
      />
    </div>
  );
};
