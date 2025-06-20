import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoute from "./route/AppRoute";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoute />

    </QueryClientProvider>
  );
}

export default App;
