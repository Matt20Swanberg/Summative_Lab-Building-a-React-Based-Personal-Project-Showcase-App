import { useState } from "react";
import { coffees } from "../data/coffeeData";
import CoffeeCard from "../components/CoffeeCard.jsx";

function ShopPage() {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredCoffees = coffees.filter((coffee) =>
        coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="shop-page">
            <input type="text" placeholder="Search coffee by name" className="search-input" value={searchTerm} onChange={handleSearch} />
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
        </div>
    )
}

export default ShopPage