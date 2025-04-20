export interface TodoContext {
  comments: Comment[] | undefined;
  isLoading: boolean;
  create: (payload: Comment) => void;
  get: (userId: string, taskId: string) => void;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId?: string;
  taskId?: string;
}
