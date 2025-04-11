import { Link } from "react-router-dom";
import { InputField } from "../components/InputField/InputField";
import { useState } from "react";
import { TextAreaField } from "../components/TextAreaField/TextAreaField";
import { DatePickerField } from "../components/DatePickerField/DatePickerField";
import { CheckBoxFiled } from "../components/CheckBoxField/CheckBoxField";
import { Button } from "../components/Button/Button";
import { MultiSelectField } from "../components/MultiSelectField/MultiSelectField";
import { SingleSelectField } from "../components/SingleSelectField/SingleSelectField";
import { SingleSelectOptions } from "../models/MultiSingleSelectOptions";

const mockDataOptions: SingleSelectOptions[] = [
  { label: "test", value: "test" },
  { label: "test2", value: "test2" },
];

const defaultValue = {
  title: "",
  description: "",
  dateDeadline: "",
  priorety: null,
  favourite: false,
  tags: null,
};

export const TodoCreatePage = () => {
  const [formValue, setFormValue] = useState({ ...defaultValue });

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value:
      | string
      | boolean
      | readonly SingleSelectOptions[]
      | SingleSelectOptions
      | null;
  }) => {
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValue);
  };

  const handleReset = () => {
    setFormValue(defaultValue);
  };

  return (
    <div className="container">
      <h1 className="main-title">Создание новой задачи</h1>
      <Link to="/todos" className="go-back">
        К списку задач
      </Link>
      <form className="form-create-update" onSubmit={handleSubmit}>
        <InputField
          id="title"
          label="Название"
          value={formValue.title}
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Начините печатать..."
          autoComplete="off"
        />
        <TextAreaField
          id="description"
          label="Описание"
          value={formValue.description}
          onChange={handleChange}
          name="description"
          placeholder="Начините печатать..."
        />
        <DatePickerField
          id="date-deadline"
          label="Дедлайн"
          name="dateDeadline"
          value={formValue.dateDeadline}
          onChange={handleChange}
        />
        <SingleSelectField
          label="Приоретет"
          name="priorety"
          options={mockDataOptions}
          value={formValue.priorety}
          onChange={handleChange}
          placeholder="Выберите приоретет..."
        />

        <MultiSelectField
          label="Теги"
          onChange={handleChange}
          value={formValue.tags}
          name="tags"
          options={mockDataOptions}
          placeholder="Выберите теги..."
        />
        <CheckBoxFiled
          checked={formValue.favourite}
          id="favourite"
          label="Добавить задачу в избранное"
          name="favourite"
          onChange={handleChange}
        />
        <div className="btns-group">
          <Button label="Создать" cssType="primary" type="submit" />
          <Button
            label="Сбросить"
            cssType="secondary"
            type="reset"
            onClick={handleReset}
          />
        </div>
      </form>
    </div>
  );
};
