import { TodoPriorety } from "../models/Todo";

export interface PrioretyArray {
  value: TodoPriorety;
  label: string;
}

export const prioretyArray: PrioretyArray[] = [
  { value: TodoPriorety.lite, label: "Низкий" },
  { value: TodoPriorety.medium, label: "Средний" },
  { value: TodoPriorety.dangerous, label: "Высокий" },
];
