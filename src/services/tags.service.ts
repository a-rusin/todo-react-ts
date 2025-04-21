import { Tag } from "../models/Tags";
import { httpService } from "./http.service";

const apiEndPoint = "tags/";

export const tagsService = {
  createAndUpdate: async <T>(payload: Tag, userId: string) => {
    const url = `${apiEndPoint + userId}/${payload.id}`;
    const { data } = await httpService.put<T>(url, payload);
    return data;
  },
  get: async <T>(userId: string) => {
    const url = `${apiEndPoint + userId}`;
    const { data } = await httpService.get<T>(url);
    return data;
  },
  delete: async (tagId: string, userId: string) => {
    const url = `${apiEndPoint + userId}/${tagId}`;
    const { data } = await httpService.delete(url);
    return data;
  },
};
