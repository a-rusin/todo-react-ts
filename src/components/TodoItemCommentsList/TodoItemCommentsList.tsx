import { JSX } from "react";
import { Comment } from "../../models/Comments";
import { LoaderInline } from "../LoaderInline/LoaderInline";

interface TodoItemCommentsListProps {
  comments: Comment[] | undefined;
  isLoading: boolean;
}

export const TodoItemCommentsList = ({
  comments,
  isLoading,
}: TodoItemCommentsListProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className="todo-status-container">
        <LoaderInline />
      </div>
    );
  } else if (Array.isArray(comments) && comments.length !== 0) {
    return (
      <ul className="todo-comments-list">
        {comments &&
          comments.map((comment) => (
            <li key={comment.id} className="todo-comments-list-item">
              <p className="todo-comments-content">{comment.content}</p>
              <p className="todo-comments-date">{comment.createdAt}</p>
            </li>
          ))}
      </ul>
    );
  }
  return (
    <div className="todo-comments-list-item">
      Комментариев к этой задаче пока нет
    </div>
  );
};
