import {
  CreateAndUpateFormType,
  CreateAndUpateFormValue,
} from "./CreateAndUpdate";

export enum TodoPriorety {
  lite = "lite",
  medium = "medium",
  dangerous = "dangerous",
}

export interface Todo extends CreateAndUpateFormValue {
  id?: string;
  userId: string;
  createdDate: string;
}

export interface TodosContextLoading {
  get: boolean;
  create: boolean;
  edit: false | { id: string };
  delete: false | { id: string };
}

export type TodosContextType = {
  todos: Todo[] | undefined;
  todo: Todo | undefined;
  isLoading: TodosContextLoading;
  getTodos: () => void;
  createUpdateTodos: (
    payload: Todo,
    mode?: CreateAndUpateFormType,
    redirect?: boolean
  ) => void;
  deleteTodos: (id: string, redirect?: boolean) => void;
  getTodoById: (id: string) => void;
  resetTodo: () => void;
};
