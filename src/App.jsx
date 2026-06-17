import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AdminPortal from "./pages/AdminPortal";

import './styles/App.css'

function App() {

  // Stores the coffee inventory and available store locations used across pages
  const [coffeeList, setCoffeeList] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch all coffees once when the app loads.
  useEffect(() => {
    fetch("http://localhost:3001/coffee")
      .then((response) => response.json())
      .then((data) => setCoffeeList(data))
      .catch((error) => console.error("Error fetching coffees:", error));
  }, []);

  // Fetch available shop locations for filtering and admin form options
  useEffect(() => {
    fetch("http://localhost:3001/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

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