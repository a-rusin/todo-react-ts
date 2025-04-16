import { useForm } from "../../hooks/useForm";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { Button } from "../Button/Button";
import { TextAreaField } from "../TextAreaField/TextAreaField";
import "./TodoItemCommentsForm.css";

interface CommentValue {
  comment: string;
}

const defaultValue: CommentValue = {
  comment: "",
};

const validatorConfig: ValidatorConfig = {
  comment: {
    isRequired: true,
  },
};

export const TodoItemCommentsForm = () => {
  const { formValue, handleChange, handleSubmit, errors } =
    useForm<CommentValue>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  function onSubmit(data: CommentValue) {
    console.log(data);
  }

  return (
    <form className="todo-comments-form" onSubmit={handleSubmit}>
      <TextAreaField
        id="comment"
        name="comment"
        onChange={handleChange}
        value={formValue?.comment}
        errors={errors?.comment}
        placeholder="Начните печатать..."
        height="100rem"
        label="Сообщение"
      />
      <Button
        cssType="primary"
        label="Добавить"
        type="submit"
        className="todo-comments-btn-submit"
      />
    </form>
  );
};
