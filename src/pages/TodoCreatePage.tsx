import { Link } from "react-router-dom";
import { useState } from "react";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";
import { CreateAndUpdateForm } from "../components/CreateUpdateTodoForm/CreateUpdateTodoForm";
import { HandleChangeTypes } from "../models/HandleChange";
import { CreateAndUpateFormValue } from "../models/CreateAndUpdate";
import { useForm } from "../hooks/useForm";

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

export const TodoCreatePage = () => {
  const { formValue, handleChange, handleReset, handleSubmit } =
    useForm<CreateAndUpateFormValue>({ defaultValue, onSubmit });

  function onSubmit(data: CreateAndUpateFormValue) {
    console.log(data);
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
      />
    </div>
  );
};
