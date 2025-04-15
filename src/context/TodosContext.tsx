import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { Todo, TodosContextType } from "../models/Todo";
import { todosService } from "../services/todos.service";
import { useAppNavigate } from "../hooks/useAppNavigate";

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined
);

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const appNavigate = useAppNavigate();

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todosService.get<Todo[]>();
      setTodos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTodos = async (payload: Todo) => {
    try {
      setIsLoading(true);
      const data = await todosService.create(payload);
      console.log(data);
      appNavigate("/todos");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TodosContext.Provider value={{ todos, isLoading, getTodos, createTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
