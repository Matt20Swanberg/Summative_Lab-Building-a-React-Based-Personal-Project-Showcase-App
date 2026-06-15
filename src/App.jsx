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
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App