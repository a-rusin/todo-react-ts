import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { Todo, TodosContextLoading, TodosContextType } from "../models/Todo";
import { todosService } from "../services/todos.service";
import { useAppNavigate } from "../hooks/useAppNavigate";
import { CreateAndUpateFormType } from "../models/CreateAndUpdate";
import { useLocation } from "react-router-dom";

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined
);

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[] | undefined>([]);
  const [todo, setTodo] = useState<Todo | undefined>();
  const [isLoading, setIsLoading] = useState<TodosContextLoading>({
    createForm: false,
    editForm: false,
    deleteItem: { id: "JCpUnv2wpQEoyy3V2KHA4" },
    getItems: false,
    getItem: false,
    favouriteItem: false,
    isDoneItem: false,
    removeItem: false,
  });

  const appNavigate = useAppNavigate();

  const location = useLocation();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, getItems: true }));
      const data = await todosService.get<Todo[]>();
      setTodos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, getItems: false }));
    }
  };

  const getTodoById = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, getItem: true }));
      const data = await todosService.getById<Todo>(id);
      setTodo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, getItem: false }));
    }
  };

  const createUpdateTodos = async (
    payload: Todo,
    loadingType: keyof TodosContextLoading,
    mode?: CreateAndUpateFormType,
    redirect?: boolean
  ) => {
    try {
      if (mode && mode === "create") {
        setIsLoading((prev) => ({ ...prev, createForm: true }));
      } else if (mode && (mode === "edit" || mode === "edit-item")) {
        setIsLoading((prev) => ({
          ...prev,
          [loadingType]: { id: payload.id! },
        }));
      }

      const data = await todosService.createAndUpdate<Todo>(payload);

      if (mode && mode === "create") {
        setTodos((prev) => (prev ? [...prev, data] : [data]));
      } else if (mode && (mode === "edit" || mode === "edit-item")) {
        setTodos(
          (prev) =>
            prev && prev.map((item) => (item.id === data.id ? data : item))
        );

        if (mode === "edit-item") {
          setTodo(payload);
        }
      }

      if (redirect) {
        appNavigate(location.state?.from || "/todos");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [loadingType]: false }));
    }
  };

  const deleteTodos = async (id: string, redirect?: boolean) => {
    try {
      setIsLoading((prev) => ({ ...prev, deleteItem: { id } }));

      const data = await todosService.delete(id);
      if (data === null) {
        setTodos((prev) => prev && prev.filter((todo) => todo.id !== id));

        if (redirect) {
          appNavigate("/todos");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, deleteItem: false }));
    }
  };

  const resetTodo = () => {
    setTodo(undefined);
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
        resetTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
