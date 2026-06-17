import { useState } from "react";
import CoffeeCard from "../components/CoffeeCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SideBarFilter from "../components/SideBarFilter.jsx";

function ShopPage({ coffeeList }) {

    // Tracks the user's search input and selected location filter
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("All");

    // Filters coffees by search term and selected location before rendering cards
    const filteredCoffees = coffeeList.filter((coffee) => {
        const searchMatch = (
            coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coffee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coffee.origin.toLowerCase().includes(searchTerm.toLowerCase())
        )

        const locationMatch = (
            selectedLocation === "All" || coffee.location === selectedLocation
        )

        return searchMatch && locationMatch;
    }
    )

    // Updates the search term as the user types
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    // Updates the selected location when a radio button is clicked
    const handleLocation = (event) => {
        setSelectedLocation(event.target.value)
    }

    return (
    <div className="shop-page">
      <aside className="side-panel">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

        <SideBarFilter
          selectedLocation={selectedLocation}
          onLocationChange={handleLocation}
        />
      </aside>

      <section className="coffee-results">
        {filteredCoffees.length === 0 ? (
          <p className="no-search-results">No results found</p>
        ) : (
          filteredCoffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))
        )}
      </section>
    </div>
  );
}

export default ShopPage;