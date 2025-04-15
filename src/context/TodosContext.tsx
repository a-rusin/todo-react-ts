import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { Todo, TodosContextLoading, TodosContextType } from "../models/Todo";
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
  const [isLoading, setIsLoading] = useState<TodosContextLoading>({
    create: false,
    delete: { id: "2Zgfg7ArzXONkEmZffEsr" },
    update: false,
    get: false,
  });

  const appNavigate = useAppNavigate();

  const getTodos = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, get: true }));
      const data = await todosService.get<Todo[]>();
      setTodos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const createTodos = async (payload: Todo) => {
    try {
      setIsLoading((prev) => ({ ...prev, create: true }));

      const data = await todosService.create(payload);
      console.log(data);
      appNavigate("/todos");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, create: false }));
    }
  };

  const deleteTodos = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, delete: { id: id } }));

      const data = await todosService.delete(id);
      if (data === null) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, isLoading, getTodos, createTodos, deleteTodos }}
    >
      {children}
    </TodosContext.Provider>
  );
};
