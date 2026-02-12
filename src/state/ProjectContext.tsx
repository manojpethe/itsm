import { createContext, useState, ReactNode, useContext } from 'react';

// 1. Define types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ProjectContextType {
  projectId: string;
  setProjectId: (id: string) => void;
  todos: Todo[];
  addTodo: (text: string) => void;
}

// 2. Create Context with default values
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// 3. Create Provider Component
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectId] = useState<string>("0");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId, todos, addTodo }}>
      {children}
    </ProjectContext.Provider>
  );
};

// 4. Custom hook for consuming context
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
