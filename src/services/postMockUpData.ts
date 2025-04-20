import localStorageService from "./localStorage.service";
import { todosService } from "./todos.service";

export const postMockUpData = (data: any) => {
  const currentUser = localStorageService.getLocalUserId();

  data.forEach(async (item: any) => {
    const data = await todosService.createAndUpdate(item, currentUser!);
  });
};
