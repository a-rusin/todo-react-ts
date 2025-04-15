import { Todo } from "../models/Todo";
import { httpService } from "./http.service";

const apiEndPoint = "todos/";

export const todosService = {
  get: async <T>() => {
    const { data } = await httpService.get<T>(apiEndPoint);
    return data;
  },
  create: async (payload: Todo) => {
    const { data } = await httpService.put(apiEndPoint + payload.id, payload);
    return data;
  },
};
