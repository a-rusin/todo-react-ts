import { JSX } from "react";
import { Comment, TodoContextLoading } from "../../models/Comments";
import { LoaderInline } from "../LoaderInline/LoaderInline";
import "./TodoItemCommentsList.css";
import { isLoadingValue } from "../../utils/isLoadingValue";
import { getCurrentDate } from "../../utils/getCurrentDate";

interface TodoItemCommentsListProps {
  comments: Comment[] | undefined;
  isLoading: TodoContextLoading;
  removeComment: (userId: string, taskId: string, commentId: string) => void;
  taskId: string | undefined;
  userId: string | undefined;
}

export const TodoItemCommentsList = ({
  comments,
  isLoading,
  removeComment,
  taskId,
  userId,
}: TodoItemCommentsListProps): JSX.Element => {
  const handleClickDelete = (commentId: string) => {
    if (userId && taskId) {
      removeComment(userId, taskId, commentId);
    }
  };

  const isLoadingDelete = isLoadingValue(isLoading.delete);

  const sortedComments =
    comments &&
    comments.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });

  if (isLoading.get) {
    return (
      <div className="todo-status-container">
        <LoaderInline />
      </div>
    );
  } else if (Array.isArray(sortedComments) && sortedComments.length !== 0) {
    return (
      <ul className="todo-comments-list">
        {sortedComments &&
          sortedComments.map((comment) => (
            <li
              key={comment.id}
              className={
                "todo-comments-list-item " +
                (comment.id === isLoadingDelete && " process ")
              }
            >
              <p className="todo-comments-content">{comment.content}</p>
              <div className="todo-comments-toolbar">
                <button
                  className="todo-comments-delete-btn"
                  onClick={() => handleClickDelete(comment.id)}
                >
                  Удалить
                </button>
                <p className="todo-comments-date">
                  {getCurrentDate(comment.createdAt, true)}
                </p>
              </div>
            </li>
          ))}
      </ul>
    );
  }
  return (
    <div className="todo-comments-list-empty">Список комментариев пуст</div>
  );
};
