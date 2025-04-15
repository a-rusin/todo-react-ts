import { CreateAndUpateFormValue } from "./CreateAndUpdate";
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

export type TodosContextType = {
  todos: Todo[];
  isLoading: boolean;
  getTodos: () => void;
  createTodos: (payload: Todo) => void;
};
