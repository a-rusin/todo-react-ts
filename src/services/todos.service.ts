import { httpService } from "./http.service";

const apiEndPoint = "todos/";

export const todosService = {
  get: async () => {
    const { data } = await httpService.get(apiEndPoint);
    return data;
  },
  create: async (payload: any) => {
    const { data } = await httpService.put(apiEndPoint + payload.id, payload);
    return data;
  },
};
