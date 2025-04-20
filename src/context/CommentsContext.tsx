import { createContext, ReactNode, useEffect, useState } from "react";
import { TodoContext, Comment } from "../models/Comments";
import { commentsService } from "../services/comments.service";

export const CommentContext = createContext<TodoContext | undefined>(undefined);

interface CommentContextProviderProps {
  children: ReactNode;
}

export const CommentContextProvider = ({
  children,
}: CommentContextProviderProps) => {
  const [comments, setComments] = useState<Comment[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const create = async (payload: Comment) => {
    setIsLoading(true);
    try {
      const data = await commentsService.create<Comment>(payload);
      setComments((prev) => (prev ? [...prev, data] : [data]));
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const get = async (userId: string, taskId: string) => {
    setIsLoading(true);
    try {
      const data = await commentsService.get<Comment[]>(userId, taskId);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommentContext.Provider value={{ comments, isLoading, create, get }}>
      {children}
    </CommentContext.Provider>
  );
};
