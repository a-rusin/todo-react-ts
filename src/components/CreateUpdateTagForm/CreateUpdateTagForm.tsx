import { CreateAndUpateFormType } from "../../models/CreateAndUpdate";
import { InputSizeType } from "../../models/Form";
import { Tag } from "../../models/Tags";
import { ValidatorResult } from "../../models/ValidatorConfig";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import "./CreateUpdateTagForm.css";

interface CreateUpdateTagFormProps {
  formValue: Tag | undefined;
  handleChange: any;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  errors?: ValidatorResult;
  isLoading?: boolean;
  mode: CreateAndUpateFormType;
  inputSizes: InputSizeType;
}

export const CreateUpdateTagForm = ({
  formValue,
  handleChange,
  handleReset,
  handleSubmit,
  mode,
  errors,
  isLoading,
  inputSizes,
}: CreateUpdateTagFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="form-tags">
      <InputField
        id="title"
        autoComplete="off"
        name="title"
        type="text"
        value={formValue?.title}
        placeholder="Начните печатать..."
        onChange={handleChange}
        errors={errors?.title}
        inputSizes={inputSizes}
      />
      <Button
        label={mode === "create" ? "Создать" : "Сохранить"}
        cssType="primary"
        type="submit"
        isLoading={isLoading}
        inputSizes={inputSizes}
      />
    </form>
  );
};
