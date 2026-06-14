import { coffees } from "../data/coffeeData";
import CoffeeCard from "../components/CoffeeCard.jsx";

function ShopPage() {
    return (
        <div>
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