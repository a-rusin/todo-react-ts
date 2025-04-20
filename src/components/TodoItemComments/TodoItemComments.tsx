import { useContext, useEffect } from "react";
import { TodoItemCommentsForm } from "../TodoItemCommentsForm/TodoItemCommentsForm";
import "./TodoItemComments.css";
import { CommentContext } from "../../context/CommentsContext";
import { useParams } from "react-router-dom";
import localStorageService from "../../services/localStorage.service";

type RouteParams = {
  id: string;
};

export const TodoItemComments = () => {
  const commentsContext = useContext(CommentContext);

  if (!commentsContext) {
    throw new Error("CommentsProvider not found");
  }

  const { comments, create, isLoading, get: getComments } = commentsContext;

  const { id: taskId } = useParams<RouteParams>();
  const userId = localStorageService.getLocalUserId();

  useEffect(() => {
    if (taskId && userId) {
      getComments(userId, taskId);
    }
  }, []);

  return (
    <div className="todo-comments-container">
      <h5 className="todo-comments-title">Комментарии</h5>
      <TodoItemCommentsForm createTask={create} />
      <ul className="todo-comments-list">
        {comments &&
          comments.map((comment) => (
            <li key={comment.id} className="todo-comments-list-item">
              <p className="todo-comments-content">{comment.content}</p>
              <p className="todo-comments-date">{comment.createdAt}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
