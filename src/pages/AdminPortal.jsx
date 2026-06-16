import { useState } from "react";

function AdminPortal({ coffeeList, setCoffeeList }) {

    const [editCoffeeId, setEditCoffeeId] = useState(null)

    const [newCoffee, setNewCoffee] = useState({
        name: "",
        description: "",
        origin: "",
        price: "",
        location: ""
    });

    const handleEdit = (coffee) => {
        event.preventDefault();
        setEditCoffeeId(coffee.id);

        setNewCoffee({
            name: coffee.name,
            description: coffee.description,
            origin: coffee.origin,
            price: coffee.price,
            location: coffee.location,
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewCoffee({ ...newCoffee, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editCoffeeId) {
            const coffeeToEdit = coffeeList.map((coffee) => {
                if (coffee.id === editCoffeeId) {
                    return {
                        ...coffee,
                        ...newCoffee,
                        price: Number(newCoffee.price),
                    }
                }
                return coffee;
            })
            setCoffeeList(coffeeToEdit);

        } else {
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
        }
        setEditCoffeeId(null);
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
                <h3>Add New Coffee</h3>
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
            <section className="admin-coffee-list">
                <h3>Existing Coffees</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Origin</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {coffeeList.map((coffee) => (
                            <tr key={coffee.id}>
                                <td>{coffee.name}</td>
                                <td>{coffee.description}</td>
                                <td>{coffee.origin}</td>
                                <td>${coffee.price.toFixed(2)}</td>
                                <td>{coffee.location}</td>
                                <td>
                                    <button type="button" onClick={() => handleEdit(coffee)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </section>
        </div>
    )

}

export default AdminPortal;