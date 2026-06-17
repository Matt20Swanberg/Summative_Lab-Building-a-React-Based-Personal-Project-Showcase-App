import { useState, useEffect } from "react";

function useCoffeeData() {

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

    return {
        coffeeList,
        setCoffeeList,
        locations,
    };
}

export default useCoffeeData;