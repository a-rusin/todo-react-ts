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

  return (
    <CommentContext.Provider value={{ comments, isLoading, create, get }}>
      {children}
    </CommentContext.Provider>
  );
};
