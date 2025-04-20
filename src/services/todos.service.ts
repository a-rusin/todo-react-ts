import { Todo } from "../models/Todo";
import { httpService } from "./http.service";

const apiEndPoint = "todos/";

export const todosService = {
  get: async <T>(userId: string) => {
    const url = `${apiEndPoint + userId}`;
    const { data } = await httpService.get<T>(url);
    return data;
  },
  getById: async <T>(taskId: string, userId: string) => {
    const url = `${apiEndPoint + userId}/${taskId}`;
    const { data } = await httpService.get<T>(url);
    return data;
  },
  createAndUpdate: async <T>(payload: Todo, userId: string) => {
    const url = `${apiEndPoint + userId}/${payload.id}`;

    const { data } = await httpService.put<T>(url, payload);
    return data;
  },
  delete: async (taskId: string, userId: string) => {
    const url = `${apiEndPoint + userId}/${taskId}`;
    const { data } = await httpService.delete(url);
    return data;
  },
};
