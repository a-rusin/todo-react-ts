import { nanoid } from "nanoid";
import { useForm } from "../../hooks/useForm";
import { Comment } from "../../models/Comments";
import { ValidatorConfig } from "../../models/ValidatorConfig";
import { Button } from "../Button/Button";
import { TextAreaField } from "../TextAreaField/TextAreaField";
import "./TodoItemCommentsForm.css";
import localStorageService from "../../services/localStorage.service";
import { useParams } from "react-router-dom";

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

type RouteParams = {
  id: string;
};

interface TodoItemCommentsFormProps {
  createTask: (payload: Comment, callback: () => void) => void;
  isLoading: boolean;
}

export const TodoItemCommentsForm = ({
  createTask,
  isLoading,
}: TodoItemCommentsFormProps) => {
  const { formValue, handleChange, handleSubmit, errors, handleReset } =
    useForm<CommentValue>({
      defaultValue,
      onSubmit,
      validatorConfig,
    });

  const { id: taskId } = useParams<RouteParams>();

  function onSubmit(data: CommentValue) {
    const userId = localStorageService.getLocalUserId();
    const updatedDate: Comment = {
      id: nanoid(),
      content: data.comment,
      createdAt: Date.now().toString(),
      taskId,
      userId,
    };
    createTask(updatedDate, () => {
      handleReset();
    });
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
        isLoading={isLoading}
      />
    </form>
  );
};
