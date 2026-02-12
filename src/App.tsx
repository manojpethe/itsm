import { HashRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navigation/Navbar.tsx';

import './App.css'
import Protect from "./Components/Protect.tsx";
import Projects from "./Pages/Projects.tsx";
import Settings from "./Pages/Settings.tsx";
import Login from "./Pages/Login.tsx";

import { AuthContext, initialUserState } from "./state/AuthContext.ts";
import { ProjectProvider } from './state/ProjectContext.tsx';
import ProjectDetails from "./Pages/ProjectDetails.tsx";

function App() {

  return (
    <AuthContext.Provider value={initialUserState}>
      <ProjectProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Protect><Navbar /><Outlet /></Protect>}>
          <Route path="projects" element={<Protect><Projects /></Protect>} />
          <Route path="projects/:id" element={<Protect><ProjectDetails /></Protect>} />
          <Route path="settings" element={<Protect><Settings /></Protect>} />
        </Route>
      </Routes>
    </HashRouter>
    </ProjectProvider>
    </AuthContext.Provider>
  )
}

export default App
