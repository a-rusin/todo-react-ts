import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Todo, TodosContextLoading, TodosContextType } from "../models/Todo";
import { todosService } from "../services/todos.service";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { CreateAndUpateFormType } from "../models/CreateAndUpdate";

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined
);

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>();
  const [isLoading, setIsLoading] = useState<TodosContextLoading>({
    create: false,
    delete: false,
    update: false,
    get: false,
  });

  const appNavigate = useAppNavigate();

  useEffect(() => {
    getTodos();
  }, []);

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

  const getTodoById = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, get: true }));
      const data = await todosService.getById<Todo>(id);
      setTodo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const createUpdateTodos = async (
    payload: Todo,
    mode?: CreateAndUpateFormType
  ) => {
    try {
      setIsLoading((prev) => ({ ...prev, create: true }));
      const data = await todosService.createAndUpdate<Todo>(payload);
      if (mode && mode === "create") {
        setTodos((prev) => [...prev, data]);
      } else if (mode && mode === "edit") {
        setTodos((prev) =>
          prev.map((item) => (item.id === data.id ? data : item))
        );
      }
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
      value={{
        todos,
        todo,
        isLoading,
        getTodos,
        createUpdateTodos,
        deleteTodos,
        getTodoById,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
