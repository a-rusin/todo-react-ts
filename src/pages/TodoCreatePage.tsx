import { Link } from "react-router-dom";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpdateTodoForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";
import { useForm } from "../hooks/useForm";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { Todo } from "../models/Todo";
import { nanoid } from "nanoid";

import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { AuthContext } from "../context/AuthContext";
import { TagsContext } from "../context/TagsContext";

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
  const tagsContext = useContext(TagsContext);

  if (!todosContext || !authContext || !tagsContext) {
    throw new Error(
      "TodoProvider or AuthProvider or TagsProvider or not found"
    );
  }

  const { createUpdateTodos, isLoading: isLoadingTodo } = todosContext;
  const { currentUser } = authContext;
  const { tags, isLoading: isLoadingTags } = tagsContext;

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

  const multiSelectOptions: SingleSelectOptions<string>[] | undefined =
    tags?.map((tag) => ({
      label: tag.title,
      value: tag.id!,
    }));

  return (
    <div className="container">
      <h1 className="main-title">Создание новой задачи</h1>
      <Link to="/todos" className="main-url main-url-spacing">
        К списку задач
      </Link>
      <CreateAndUpdateTodoForm
        formValue={formValue}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        options={multiSelectOptions}
        errors={errors}
        isLoading={isLoadingTodo.createForm}
        mode="create"
      />
    </div>
  );
};
