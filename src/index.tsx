import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NavigateContextProvider } from "./hooks/useAppNavigate";
import { AuthProvider } from "./context/AuthContext";
import * as serviceWorkerRegistration from "./services/serviceWorker.sevice";
import configFile from "./config.json";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter
    basename={configFile["gh-pages-deploy"] ? configFile.repoName : undefined}
  >
    <NavigateContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NavigateContextProvider>
  </BrowserRouter>
);

serviceWorkerRegistration.LocalServiceWorkerRegister();
