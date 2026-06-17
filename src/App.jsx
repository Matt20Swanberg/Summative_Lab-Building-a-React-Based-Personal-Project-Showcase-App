import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AdminPortal from "./pages/AdminPortal";
import useCoffeeData from "./hooks/useCoffeeData";
import './styles/App.css'

function App() {

  const { coffeeList, setCoffeeList, locations, } = useCoffeeData();

  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage coffeeList={coffeeList} locations={locations} />} />
          <Route path="/admin" element={<AdminPortal coffeeList={coffeeList} setCoffeeList={setCoffeeList} locations={locations} />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App