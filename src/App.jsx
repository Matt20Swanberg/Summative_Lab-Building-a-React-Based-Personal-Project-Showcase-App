import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AdminPortal from "./pages/AdminPortal";

import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="" element={<ShopPage />} />
        <Route path="" element={<AdminPortal />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App