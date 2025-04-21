import { createContext, ReactNode, useEffect, useState } from "react";
import { TodoContext, Comment, TodoContextLoading } from "../models/Comments";
import { commentsService } from "../services/comments.service";

export const CommentContext = createContext<TodoContext | undefined>(undefined);

interface CommentContextProviderProps {
  children: ReactNode;
}

export const CommentContextProvider = ({
  children,
}: CommentContextProviderProps) => {
  const [comments, setComments] = useState<Comment[] | undefined>();
  const [isLoading, setIsLoading] = useState<TodoContextLoading>({
    createForm: false,
    delete: false,
    get: false,
  });

  const create = async (payload: Comment, callback: () => void) => {
    setIsLoading((prev) => ({ ...prev, createForm: true }));
    try {
      const data = await commentsService.create<Comment>(payload);
      setComments((prev) => (prev ? [...prev, data] : [data]));
      callback();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, createForm: false }));
    }
  };

  const get = async (userId: string, taskId: string) => {
    setIsLoading((prev) => ({ ...prev, get: true }));

    try {
      const data = await commentsService.get<Comment[]>(userId, taskId);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const remove = async (userId: string, taskId: string, commentId: string) => {
    setIsLoading((prev) => ({ ...prev, delete: { id: commentId } }));
    try {
      const data = await commentsService.delete(userId, taskId, commentId);

      if (data === null) {
        setComments((prev) =>
          prev?.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <CommentContext.Provider
      value={{ comments, isLoading, create, get, remove }}
    >
      {children}
    </CommentContext.Provider>
  );
};
