import { SingleSelectOptions } from "./MultiSingleSelectOptions";

export interface CreateAndUpateFormValue {
  title: string;
  description: string;
  dateDeadline: string;
  priorety: SingleSelectOptions | null;
  favourite: boolean;
  tags: SingleSelectOptions[] | null;
}

export type CreateAndUpateFormType = "create" | "edit";
