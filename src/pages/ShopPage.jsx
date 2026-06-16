import { useState } from "react";
import CoffeeCard from "../components/CoffeeCard.jsx";

function ShopPage({ coffeeList }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("All");

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleLocation = (event) => {
        setSelectedLocation(event.target.value)
    }

    return (
        <div className="shop-page">
            <aside className="side-panel">
                <input type="text" placeholder="Search coffees..." className="search-input" value={searchTerm} onChange={handleSearch} />
                <label className="location-option">
                    <input type="radio" value="All" checked={selectedLocation === "All"} onChange={handleLocation} />
                    All
                </label>
                <label className="location-option">
                    <input type="radio" value="Brooklyn" checked={selectedLocation === "Brooklyn"} onChange={handleLocation} />
                    Brooklyn
                </label>
                <label className="location-option">
                    <input type="radio" value="Manhattan" checked={selectedLocation === "Manhattan"} onChange={handleLocation} />
                    Manhattan
                </label>
                <label className="location-option">
                    <input type="radio" value="New York" checked={selectedLocation === "New York"} onChange={handleLocation} />
                    New York
                </label>
                <label className="location-option">
                    <input type="radio" value="Queens" checked={selectedLocation === "Queens"} onChange={handleLocation} />
                    Queens
                </label>
            </aside>

            <section className="coffee-results">
                {filteredCoffees.length === 0 ? (
                    <p className="no-search-results">No results found</p>
                ) :
                    (filteredCoffees.map((coffee) => (
                        < CoffeeCard
                            key={coffee.id}
                            coffee={coffee}
                        />
                    ))
                    )
                }
            </section>
        </div>
    )
}

export default ShopPage