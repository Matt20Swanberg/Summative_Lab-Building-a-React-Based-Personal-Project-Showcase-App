import { coffees } from "../data/coffeeData";
import CoffeeCard from "../components/CoffeeCard.jsx";

function ShopPage() {
    return (
        <div className="shop-page">
            {coffees.map((coffee) => (
                < CoffeeCard
                    key={coffee.id}
                    coffee={coffee}

                />
            )
            )
            }
        </div>
    )
}

export default ShopPage