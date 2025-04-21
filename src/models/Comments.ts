export interface TodoContextLoading {
  createForm: boolean;
  get: boolean;
  delete: false | { id: string };
}
export interface TodoContext {
  comments: Comment[] | undefined;
  isLoading: TodoContextLoading;
  create: (payload: Comment, callback: () => void) => void;
  get: (userId: string, taskId: string) => void;
  remove: (userId: string, taskId: string, commentId: string) => void;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId?: string;
  taskId?: string;
}
