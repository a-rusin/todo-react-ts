import { Link, useParams } from "react-router-dom";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { useForm } from "../hooks/useForm";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";

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

export const TodoEditItemPage = () => {
  const { id } = useParams<RouteParams>();

  const { formValue, handleChange, handleReset, handleSubmit } =
    useForm<CreateAndUpateFormValue>({ defaultValue, onSubmit });

  function onSubmit(data: CreateAndUpateFormValue) {
    console.log(data);
  }

  return (
    <div className="container">
      <h1 className="main-title">Редактирование задачи #{id}</h1>
      <Link to="/todos" className="go-back">
        К списку задач
      </Link>
      <CreateAndUpdateForm
        formValue={formValue}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        options={mockDataOptions}
      />
    </div>
  );
};
