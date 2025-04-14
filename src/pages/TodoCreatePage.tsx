import { Link } from "react-router-dom";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";
import { useForm } from "../hooks/useForm";
import { ValidatorConfig } from "../models/ValidatorConfig";
import { Todo } from "../models/Todo";
import { nanoid } from "nanoid";
import { getCreatedDate } from "../utils/getCreatedDate";
import { todosService } from "../services/todos.service";

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
    email: true,
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

    const responce = todosService.create(updatedData);

    console.log(responce);
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
      />
    </div>
  );
};
