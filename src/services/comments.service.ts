import { Comment } from "../models/Comments";
import { httpService } from "./http.service";

const apiEndPoint = "comments/";

export const commentsService = {
  create: async <T>(payload: Comment) => {
    const url = `${apiEndPoint + payload.userId}/${payload.taskId}/${
      payload.id
    }`;
    const { data } = await httpService.put<T>(url, payload);
    return data;
  },
  get: async <T>(userId: string, taskId: string) => {
    const url = `${apiEndPoint + userId}/${taskId}`;
    const { data } = await httpService.get<T>(url);
    return data;
  },
  delete: async (userId: string, taskId: string, commentId: string) => {
    const url = `${apiEndPoint + userId}/${taskId}/${commentId}`;
    const { data } = await httpService.delete(url);
    return data;
  },
};
