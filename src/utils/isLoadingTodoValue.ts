export const isLoadingTodoValue = (value: boolean | { id: string }) => {
  return typeof value === "boolean" ? value : value.id;
};
