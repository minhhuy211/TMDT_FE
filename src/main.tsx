import  { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.tsx";
import  store  from "./store/store";
import AppInitializer from "@/pages/AppWrapper.tsx";

createRoot(document.getElementById("root")!).render(

  <StrictMode>
      <Provider store={store}>
          <AppInitializer>
              <App />
          </AppInitializer>

      </Provider>
  </StrictMode>
);
