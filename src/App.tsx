import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import WordDefinition from "./components/WordDefinition";
import "./App.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <WordDefinition />
      </QueryClientProvider>
    </div>
  );
};

export default App;
