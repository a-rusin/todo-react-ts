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
