import { useState } from "react";

function AdminPortal({ coffeeList, setCoffeeList, locations }) {

    // Tracks which coffee is currently being edited
    // If null, the form is in "add coffee" mode
    const [editCoffeeId, setEditCoffeeId] = useState(null)

    // Stores form input values for adding or editing a coffee
    const [newCoffee, setNewCoffee] = useState({
        name: "",
        description: "",
        origin: "",
        price: "",
        location: ""
    });

    // Loads the selected coffee into the form and switches to edit mode
    const handleEdit = (coffee) => {
        setEditCoffeeId(coffee.id);

        setNewCoffee({
            name: coffee.name,
            description: coffee.description,
            origin: coffee.origin,
            price: coffee.price,
            location: coffee.location,
        })
    }

    // Updates form state when the user types or selects a location
    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewCoffee({ ...newCoffee, [name]: value })
    };

    // Handles both adding and editing coffee
    // If editCoffeeId exists, sends PATCH; otherwise sends POST
    const handleSubmit = (event) => {
        event.preventDefault();
        if (editCoffeeId) {

            const updatedCoffee = {
                ...newCoffee,
                price: Number(newCoffee.price),
            };

            fetch(`http://localhost:3001/coffee/${editCoffeeId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCoffee),
            })
                .then((response) => response.json())
                .then((updatedCoffee) => {
                    const updatedCoffeeList = coffeeList.map((coffee) =>
                        coffee.id === editCoffeeId
                            ? updatedCoffee
                            : coffee
                    );

                    setCoffeeList(updatedCoffeeList);
                });
        } else {
            const coffeeToAdd = {
                ...newCoffee,
                price: Number(newCoffee.price),
            };

            fetch("http://localhost:3001/coffee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(coffeeToAdd),
            })
                .then((response) => response.json())
                .then((addedCoffee) => {
                    setCoffeeList([...coffeeList, addedCoffee]);
                });
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

    // Deletes a coffee after user confirmation.
    const handleDelete = (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this coffee?"
        );

        if (!confirmed) return;


        fetch(`http://localhost:3001/coffee/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                const updatedCoffeeList = coffeeList.filter((coffee) => coffee.id !== id);
                setCoffeeList(updatedCoffeeList);
            });
    };

    return (
        <div className="container">
            <form className="add-coffee-form" onSubmit={handleSubmit}>
                <h3>{editCoffeeId ? "Edit Coffee" : "Add Coffee"}</h3>
                <input
                    name="name"
                    type="text"
                    placeholder="Enter the coffee name"
                    className="input-text"
                    value={newCoffee.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    name="description"
                    type="text"
                    placeholder="Enter the coffee description"
                    className="input-text"
                    value={newCoffee.description}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    name="origin"
                    type="text"
                    placeholder="Enter the coffee origin"
                    className="input-text"
                    value={newCoffee.origin}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter the coffee price"
                    className="input-text"
                    value={newCoffee.price}
                    onChange={handleChange}
                    required
                />
                <br />
                <select
                    name="location"
                    className={`input-text ${newCoffee.location ? "selected" : ""}`}
                    value={newCoffee.location}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a location</option>

                    {locations.map((location) => (
                        <option key={location.id} value={location.name}>
                            {location.name}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">
                    {editCoffeeId ? "Save Changes" : "Add Coffee"}
                </button>
            </form>
            <section className="admin-coffee-list">
                <h3 className="table-header">Existing Coffees</h3>

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
                                <td className="table-coffee-name">{coffee.name}</td>
                                <td className="table-coffee-description">{coffee.description}</td>
                                <td>{coffee.origin}</td>
                                <td>${coffee.price.toFixed(2)}</td>
                                <td>{coffee.location}</td>
                                <td>
                                    <div className="table-actions">
                                        <button type="button" className="edit-btn" onClick={() => handleEdit(coffee)}>Edit</button>
                                        <button type="button" className="delete-btn" onClick={() => handleDelete(coffee.id)}>Delete</button>
                                    </div>
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