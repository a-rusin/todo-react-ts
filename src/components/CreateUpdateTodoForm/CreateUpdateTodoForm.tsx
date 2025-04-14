import { CreateAndUpateFormValue } from "../../models/CreateAndUpdate";
import { Button } from "../Button/Button";
import { CheckBoxFiled } from "../CheckBoxField/CheckBoxField";
import { DatePickerField } from "../DatePickerField/DatePickerField";
import { InputField } from "../InputField/InputField";
import { MultiSelectField } from "../MultiSelectField/MultiSelectField";
import { SingleSelectField } from "../SingleSelectField/SingleSelectField";
import { TextAreaField } from "../TextAreaField/TextAreaField";

interface CreateAndUpdateFormProps {
  formValue: CreateAndUpateFormValue;
  handleChange: any;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  options: any;
}

export const CreateAndUpdateForm = ({
  formValue,
  handleChange,
  options,
  handleSubmit,
  handleReset,
}: CreateAndUpdateFormProps) => {
  return (
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
        options={options}
        value={formValue.priorety}
        onChange={handleChange}
        placeholder="Выберите приоретет..."
      />

      <MultiSelectField
        label="Теги"
        onChange={handleChange}
        value={formValue.tags}
        name="tags"
        options={options}
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
  );
};
