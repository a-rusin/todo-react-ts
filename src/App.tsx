import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MainPage } from "./pages/MainPage";
import { TodosRoutes } from "./routes/TodosRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/todos/*" element={<TodosRoutes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
