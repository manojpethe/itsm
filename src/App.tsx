import { HashRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navigation/Navbar.tsx';

import './App.css'
import Projects from "./Pages/Projects.tsx";
import Settings from "./Pages/Settings.tsx";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<div>Landing page....</div>} />
        <Route path="/home" element={<div><Navbar /><Outlet /></div>}>
          <Route path="projects" element={<Projects />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
