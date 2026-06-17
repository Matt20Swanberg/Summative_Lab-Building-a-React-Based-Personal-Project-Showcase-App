import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ShopPage from "../pages/ShopPage";

afterEach(() => {
    cleanup();
});

// Sample coffees used to test searching, filtering, and CRUD actions.
const mockCoffeeList = [
    {
        id: 1,
        name: "City Blend",
        description: "Smooth and rich",
        origin: "Colombia",
        price: 4.99,
        location: "Brooklyn",
    },
    {
        id: 2,
        name: "Manhattan Roast",
        description: "Bold flavor",
        origin: "Brazil",
        price: 5.99,
        location: "Manhattan",
    },
    {
        id: 3,
        name: "Queens Coffee",
        description: "Nutty and bright",
        origin: "Ethiopia",
        price: 6.99,
        location: "Queens",
    },
];

describe("ShopPage", () => {
    it("Search filters coffees by name", () => {
        render(<ShopPage coffeeList={mockCoffeeList} />);

        const searchInput = screen.getByPlaceholderText(/search coffees/i);

        fireEvent.change(searchInput, {
            target: { value: "Manhattan" },
        });

        expect(screen.getByText("Manhattan Roast")).toBeInTheDocument();

        expect(screen.queryByText("City Blend")).not.toBeInTheDocument();
        expect(screen.queryByText("Queens Coffee")).not.toBeInTheDocument();
    });

    it("Search filters coffees by description", () => {
        render(<ShopPage coffeeList={mockCoffeeList} />);

        const searchInput = screen.getByPlaceholderText(/search coffees/i);

        fireEvent.change(searchInput, {
            target: { value: "nutty" },
        });

        expect(screen.getByText("Queens Coffee")).toBeInTheDocument();

        expect(screen.queryByText("City Blend")).not.toBeInTheDocument();
        expect(screen.queryByText("Manhattan Roast")).not.toBeInTheDocument();
    });

    it("Search filters coffees by origin", () => {
        render(<ShopPage coffeeList={mockCoffeeList} />);

        const searchInput = screen.getByPlaceholderText(/search coffees/i);

        fireEvent.change(searchInput, {
            target: { value: "Brazil" },
        });

        expect(screen.getByText("Manhattan Roast")).toBeInTheDocument();

        expect(screen.queryByText("City Blend")).not.toBeInTheDocument();
        expect(screen.queryByText("Queens Coffee")).not.toBeInTheDocument();
    });

    it("filters coffees by selected location", () => {
        render(<ShopPage coffeeList={mockCoffeeList} />);

        // Multiple radio elements match "Brooklyn" in Testing Library,
        // so select the radio by its value.
        const brooklynRadio = screen
            .getAllByRole("radio")
            .find((radio) => radio.value === "Brooklyn");

        fireEvent.click(brooklynRadio);

        expect(screen.getByText("City Blend")).toBeInTheDocument();

        expect(screen.queryByText("Manhattan Roast")).not.toBeInTheDocument();
        expect(screen.queryByText("Queens Coffee")).not.toBeInTheDocument();
    });

    it("updates displayed coffees when a different location is selected", () => {
        render(<ShopPage coffeeList={mockCoffeeList} />);

        const manhattanRadio = screen
            .getAllByRole("radio")
            .find((radio) => radio.value === "Manhattan");

        fireEvent.click(manhattanRadio);

        expect(screen.getByText("Manhattan Roast")).toBeInTheDocument();

        expect(screen.queryByText("City Blend")).not.toBeInTheDocument();
        expect(screen.queryByText("Queens Coffee")).not.toBeInTheDocument();
    });

    it("combines search and location filters", () => {
        render(<ShopPage coffeeList={mockCoffeeList} />);

        const searchInput = screen.getByPlaceholderText(/search coffees/i);

        fireEvent.change(searchInput, {
            target: { value: "Roast" },
        });

        const manhattanRadio = screen
            .getAllByRole("radio")
            .find((radio) => radio.value === "Manhattan");

        fireEvent.click(manhattanRadio);

        expect(screen.getByText("Manhattan Roast")).toBeInTheDocument();

        expect(screen.queryByText("City Blend")).not.toBeInTheDocument();
        expect(screen.queryByText("Queens Coffee")).not.toBeInTheDocument();
    });
});