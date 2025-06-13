import "./App.css";
import AppRoute from "./route/AppRoute";
import { UserProvider } from "@/context/UserContext.tsx";

function App() {
  return (
      <UserProvider>
        <AppRoute />
      </UserProvider>
  );
}

export default App;
