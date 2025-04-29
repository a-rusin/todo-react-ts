import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { NavigateContextProvider } from "./hooks/useAppNavigate";
import { AuthProvider } from "./context/AuthContext";
import * as serviceWorkerRegistration from "./services/serviceWorker.sevice";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <NavigateContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NavigateContextProvider>
  </HashRouter>
);

serviceWorkerRegistration.LocalServiceWorkerRegister();
