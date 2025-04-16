import { todosService } from "./todos.service";

export const postMockUpData = (data: any) => {
  data.forEach(async (item: any) => {
    const data = await todosService.createAndUpdate(item);
    console.log(data);
  });
};
