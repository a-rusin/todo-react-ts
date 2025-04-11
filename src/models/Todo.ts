export enum TodoPriorety {
  lite = "lite",
  medium = "medium",
  dangerous = "dangerous",
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdDate: string;
  deadlineDate: string | undefined;
  priorety: TodoPriorety;
  bookmark: boolean;
  tags: string[];
}
