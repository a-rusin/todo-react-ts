import { prioretyArray } from "../../constans/prioretyObj";
import {
  CreateAndUpateFormType,
  CreateAndUpateFormValue,
} from "../../models/CreateAndUpdate";
import { HandleChangeTypes } from "../../models/HandleChange";
import { SingleSelectOptions } from "../../models/MultiSingleSelectOptions";
import { Todo } from "../../models/Todo";
import { ValidatorResult } from "../../models/ValidatorConfig";
import { Button } from "../Button/Button";
import { CheckBoxFiled } from "../CheckBoxField/CheckBoxField";
import { DatePickerField } from "../DatePickerField/DatePickerField";
import { InputField } from "../InputField/InputField";
import { MultiSelectField } from "../MultiSelectField/MultiSelectField";
import { SingleSelectField } from "../SingleSelectField/SingleSelectField";
import { TextAreaField } from "../TextAreaField/TextAreaField";

interface CreateAndUpdateTodoFormProps {
  formValue: CreateAndUpateFormValue | Todo | undefined;
  handleChange: ({
    name,
    value,
  }: {
    name: string;
    value: HandleChangeTypes;
  }) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  options: SingleSelectOptions<string>[] | undefined;
  errors?: ValidatorResult;
  isLoading?: boolean;
  mode: CreateAndUpateFormType;
}

export const CreateAndUpdateTodoForm = ({
  formValue,
  handleChange,
  options,
  handleSubmit,
  handleReset,
  errors,
  isLoading,
  mode,
}: CreateAndUpdateTodoFormProps) => {
  return (
    <form className="form-create-update" onSubmit={handleSubmit}>
      <InputField
        id="title"
        label="Название"
        value={formValue?.title}
        onChange={handleChange}
        type="text"
        name="title"
        placeholder="Начините печатать..."
        autoComplete="off"
        errors={errors?.title}
        inputSizes="xl"
      />
      <TextAreaField
        id="description"
        label="Описание"
        value={formValue?.description}
        onChange={handleChange}
        name="description"
        placeholder="Начините печатать..."
        errors={errors?.description}
      />
      <DatePickerField
        id="date-deadline"
        label="Дедлайн"
        name="dateDeadline"
        value={formValue?.dateDeadline}
        onChange={handleChange}
        errors={errors?.dateDeadline}
      />
      <SingleSelectField
        label="Приоретет"
        name="priorety"
        options={prioretyArray}
        value={formValue?.priorety}
        onChange={handleChange}
        placeholder="Выберите приоретет..."
        errors={errors?.priorety}
      />
      <MultiSelectField
        label="Теги"
        onChange={handleChange}
        value={formValue?.tags}
        name="tags"
        options={options}
        placeholder="Выберите теги..."
        errors={errors?.tags}
      />
      <CheckBoxFiled
        checked={formValue?.favourite}
        id="favourite"
        label="Добавить задачу в избранное"
        name="favourite"
        onChange={handleChange}
        errors={errors?.favourite}
      />
      <div className="btns-group">
        <Button
          label={mode === "create" ? "Создать" : "Сохранить"}
          cssType="primary"
          type="submit"
          isLoading={isLoading}
          inputSizes="xl"
        />
        <Button
          label="Сбросить"
          cssType="secondary"
          type="reset"
          onClick={handleReset}
          isLoading={false}
          inputSizes="xl"
        />
      </div>
    </form>
  );
};
