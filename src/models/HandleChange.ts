import { SingleSelectOptions } from "./MultiSingleSelectOptions";

export type HandleChangeTypes =
  | string
  | boolean
  | readonly SingleSelectOptions[]
  | SingleSelectOptions
  | null;
