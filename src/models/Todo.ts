import { PrioretyArray } from "../constans/prioretyObj";
import { CreateAndUpateFormType } from "./CreateAndUpdateFromTypes";
import { SingleSelectOptions } from "./MultiSingleSelectOptions";

export enum TodoPriorety {
  lite = "lite",
  medium = "medium",
  dangerous = "dangerous",
}

export interface CreateAndUpateTodoFormValue {
  title: string;
  description: string;
  dateDeadline: string;
  priorety: PrioretyArray | null;
  favourite: boolean;
  tags: string[] | undefined;
}

export interface Todo extends CreateAndUpateTodoFormValue {
  id?: string;
  userId: string;
  createdDate: string;
  isDone: boolean;
}

export type TodosToServer = Omit<Todo, "tags"> & {
  tags: string[] | undefined;
};

export interface Test {
  id?: string;
  userId: string;
  createdDate: string;
  isDone: boolean;
  title: string;
  description: string;
  dateDeadline: string;
  priorety: PrioretyArray | null;
  favourite: boolean;
  tags: string[] | undefined;
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
  todos: TodosToServer[] | undefined;
  todo: TodosToServer | undefined;
  isLoading: TodosContextLoading;
  getTodos: () => void;
  createUpdateTodos: (
    payload: TodosToServer,
    loadingType: keyof TodosContextLoading,
    mode?: CreateAndUpateFormType,
    redirect?: boolean
  ) => void;
  deleteTodos: (id: string, redirect?: boolean) => void;
  getTodoById: (id: string) => void;
  resetTodo: () => void;
};
