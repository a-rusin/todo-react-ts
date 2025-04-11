import { Route, Routes } from "react-router-dom";
import { TodosPage } from "../pages/TodosPage";
import { TodoItemPage } from "../pages/TodoItemPage";
import { TodoCreatePage } from "../pages/TodoCreatePage";
import { TodoEditItemPage } from "../pages/TodoEditItemPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const TodosRoutes = () => {
  return (
    <Routes>
      <Route index element={<TodosPage />} />
      <Route path="/:id" element={<TodoItemPage />} />
      <Route path="/create" element={<TodoCreatePage />} />
      <Route path="/edit/:id" element={<TodoEditItemPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
