import { Todo } from "../models/Todo";
import { httpService } from "./http.service";

const apiEndPoint = "todos/";

export const todosService = {
  get: async <T>() => {
    const { data } = await httpService.get<T>(apiEndPoint);
    return data;
  },
  getById: async <T>(id: string) => {
    const { data } = await httpService.get<T>(apiEndPoint + id);
    return data;
  },
  createAndUpdate: async <T>(payload: Todo) => {
    const { data } = await httpService.put<T>(
      apiEndPoint + payload.id,
      payload
    );
    return data;
  },
  delete: async (id: string) => {
    const { data } = await httpService.delete(apiEndPoint + id);
    return data;
  },
};
