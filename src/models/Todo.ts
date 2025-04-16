import {
  CreateAndUpateFormType,
  CreateAndUpateFormValue,
} from "./CreateAndUpdate";
import { SingleSelectOptions } from "./MultiSingleSelectOptions";

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
  update: boolean;
  delete: false | { id: string };
}

export type TodosContextType = {
  todos: Todo[] | undefined;
  todo: Todo | undefined;
  isLoading: TodosContextLoading;
  getTodos: () => void;
  createUpdateTodos: (payload: Todo, mode?: CreateAndUpateFormType) => void;
  deleteTodos: (id: string) => void;
  getTodoById: (id: string) => void;
};
