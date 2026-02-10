import { HashRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navigation/Navbar.tsx';

import './App.css'
import Projects from "./Pages/Projects.tsx";
import Settings from "./Pages/Settings.tsx";
import Login from "./Pages/Login.tsx";

import { AuthContext, initialUserState } from "./state/AuthContext.ts";
import { StateContext, initialGlobalState } from "./state/StateContext.ts";

function App() {

  return (
    <AuthContext.Provider value={initialUserState}>
    <StateContext.Provider value={initialGlobalState}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<div><Navbar /><Outlet /></div>}>
          <Route path="projects" element={<Projects />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
    </StateContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
