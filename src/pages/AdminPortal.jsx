import { useState } from "react";

function AdminPortal({ coffeeList, setCoffeeList }) {

    const [newCoffee, setNewCoffee] = useState({
        name: "",
        description: "",
        origin: "",
        price: "",
        location: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewCoffee({ ...newCoffee, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const coffeeToAdd = {
            id: coffeeList.length + 1,
            ...newCoffee,
            price: Number(newCoffee.price),
        }

        setCoffeeList([...coffeeList, coffeeToAdd]);

        setNewCoffee({
            name: "",
            description: "",
            origin: "",
            price: "",
            location: "",
        })
    };

    return (
        <div className="container">
            <form className="add-coffee-form" onSubmit={handleSubmit}>
                <h3>Admin Portal</h3>

                <input
                    name="name"
                    type="text"
                    placeholder="Enter the coffee name"
                    className="input-text"
                    value={newCoffee.name}
                    onChange={handleChange}
                />
                <br />
                <input
                    name="description"
                    type="text"
                    placeholder="Enter the coffee description"
                    className="input-text"
                    value={newCoffee.description}
                    onChange={handleChange}
                />
                <br />
                <input
                    name="origin"
                    type="text"
                    placeholder="Enter the coffee origin"
                    className="input-text"
                    value={newCoffee.origin}
                    onChange={handleChange}
                />
                <br />
                <input
                    name="price"
                    type="text"
                    placeholder="Enter the coffee price"
                    className="input-text"
                    value={newCoffee.price}
                    onChange={handleChange}
                />
                <br />
                <input
                    name="location"
                    type="text"
                    placeholder="Enter the coffee location"
                    className="input-text"
                    value={newCoffee.location}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Add Coffee</button>
            </form>
        </div>
    )

}

export default AdminPortal;