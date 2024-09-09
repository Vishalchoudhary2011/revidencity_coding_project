import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
const App: React.FC = () => {
  return (
    <div className="App">
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
