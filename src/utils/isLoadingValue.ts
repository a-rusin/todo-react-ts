export const isLoadingValue = (value: boolean | { id: string }) => {
  return typeof value === "boolean" ? value : value.id;
};
