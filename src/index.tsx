import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { TodosProvider } from "./context/TodosContext";
import { NavigateContextProvider } from "./hooks/useAppNavigate";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <NavigateContextProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </NavigateContextProvider>
  </BrowserRouter>
);
