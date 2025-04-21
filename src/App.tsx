import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MainPage } from "./pages/MainPage";
import { TodosRoutes } from "./routes/TodosRoutes";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { TagsPage } from "./pages/TagsPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/todos/*" element={<TodosRoutes />} />
          <Route path="/tags" element={<TagsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
