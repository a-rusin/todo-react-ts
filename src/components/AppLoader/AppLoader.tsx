import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { TodosProvider } from "../../context/TodosContext";
import { TagsProvider } from "../../context/TagsContext";
import "./AppLoader.css";

export const AppLoader = () => {
  return (
    <TagsProvider>
      <TodosProvider>
        <Outlet />
      </TodosProvider>
    </TagsProvider>
  );
};
