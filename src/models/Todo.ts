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
  isDone: boolean;
}

export interface TodosContextLoading {
  getItems: boolean;
  getItem: boolean;
  createForm: boolean;
  editForm: false | { id: string };
  removeItem: false | { id: string };
  favouriteItem: false | { id: string };
  isDoneItem: false | { id: string };
  deleteItem: false | { id: string };
}

export type TodosContextType = {
  todos: Todo[] | undefined;
  todo: Todo | undefined;
  isLoading: TodosContextLoading;
  getTodos: () => void;
  createUpdateTodos: (
    payload: Todo,
    loadingType: keyof TodosContextLoading,
    mode?: CreateAndUpateFormType,
    redirect?: boolean
  ) => void;
  deleteTodos: (id: string, redirect?: boolean) => void;
  getTodoById: (id: string) => void;
  resetTodo: () => void;
};
