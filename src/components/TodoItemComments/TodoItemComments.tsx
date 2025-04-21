import { useContext, useEffect } from "react";
import { TodoItemCommentsForm } from "../TodoItemCommentsForm/TodoItemCommentsForm";
import "./TodoItemComments.css";
import { CommentContext } from "../../context/CommentsContext";
import { useParams } from "react-router-dom";
import localStorageService from "../../services/localStorage.service";
import { TodoItemCommentsList } from "../TodoItemCommentsList/TodoItemCommentsList";

type RouteParams = {
  id: string;
};

export const TodoItemComments = () => {
  const commentsContext = useContext(CommentContext);

  if (!commentsContext) {
    throw new Error("CommentsProvider not found");
  }

  const {
    comments,
    create,
    isLoading,
    get: getComments,
    remove: removeComment,
  } = commentsContext;

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
      <TodoItemCommentsForm
        createTask={create}
        isLoading={isLoading.createForm}
      />
      <TodoItemCommentsList
        comments={comments}
        isLoading={isLoading}
        removeComment={removeComment}
        taskId={taskId}
        userId={userId}
      />
    </div>
  );
};
