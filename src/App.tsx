import { HashRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navigation/Navbar.tsx';

import './App.css'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<div>Landing page....</div>} />
        <Route path="/home" element={<div><Navbar /><Outlet /></div>}>
          <Route path="projects" element={<div>Projetcs</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
