import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import WordDefinition from "./components/WordDefinition";
// import AddWord from "./components/AddWord";
import "./App.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <WordDefinition />
        {/* <AddWord /> */}
      </QueryClientProvider>
    </div>
  );
};

export default App;
