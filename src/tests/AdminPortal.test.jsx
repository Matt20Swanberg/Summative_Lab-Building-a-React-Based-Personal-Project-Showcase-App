import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AdminPortal from "../pages/AdminPortal";

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
];

const mockLocations = [
    { id: 1, name: "Brooklyn" },
    { id: 2, name: "Manhattan" },
];

describe("AdminPortal", () => {
    const mockSetCoffeeList = vi.fn();

    // Mock API responses to avoid making real network requests during tests.
    beforeEach(() => {
        vi.clearAllMocks();

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    id: 2,
                    name: "New Coffee",
                    description: "Tasty",
                    origin: "Brazil",
                    price: 5.99,
                    location: "Manhattan",
                }),
            })
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the add coffee form and existing coffees table", () => {
        render(
            <AdminPortal
                coffeeList={mockCoffeeList}
                setCoffeeList={mockSetCoffeeList}
                locations={mockLocations}
            />
        );

        expect(screen.getByRole("heading", { name: /add coffee/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter the coffee name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter the coffee description/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter the coffee origin/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter the coffee price/i)).toBeInTheDocument();

        expect(screen.getByText("City Blend")).toBeInTheDocument();
        expect(screen.getByText("Smooth and rich")).toBeInTheDocument();
        expect(screen.getByText("Colombia")).toBeInTheDocument();
        expect(screen.getByText("$4.99")).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "Brooklyn" })).toBeInTheDocument();
    });

    it("adds a new coffee when the form is submitted", async () => {
        render(
            <AdminPortal
                coffeeList={mockCoffeeList}
                setCoffeeList={mockSetCoffeeList}
                locations={mockLocations}
            />
        );

        fireEvent.change(screen.getByPlaceholderText(/enter the coffee name/i), {
            target: { value: "New Coffee" },
        });

        fireEvent.change(screen.getByPlaceholderText(/enter the coffee description/i), {
            target: { value: "Tasty" },
        });

        fireEvent.change(screen.getByPlaceholderText(/enter the coffee origin/i), {
            target: { value: "Brazil" },
        });

        fireEvent.change(screen.getByPlaceholderText(/enter the coffee price/i), {
            target: { value: "5.99" },
        });

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "Manhattan" },
        });

        fireEvent.click(screen.getByRole("button", { name: /add coffee/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:3001/coffee",
                expect.objectContaining({
                    method: "POST",
                })
            );
        });

        expect(mockSetCoffeeList).toHaveBeenCalledWith([
            ...mockCoffeeList,
            {
                id: 2,
                name: "New Coffee",
                description: "Tasty",
                origin: "Brazil",
                price: 5.99,
                location: "Manhattan",
            },
        ]);
    });

    it("edits an existing coffee", async () => {
        render(
            <AdminPortal
                coffeeList={mockCoffeeList}
                setCoffeeList={mockSetCoffeeList}
                locations={mockLocations}
            />
        );

        // Click Edit
        fireEvent.click(
            screen.getByRole("button", { name: /edit/i })
        );

        // Form should now be populated with the coffee data
        expect(
            screen.getByDisplayValue("City Blend")
        ).toBeInTheDocument();

        expect(
            screen.getByDisplayValue("Smooth and rich")
        ).toBeInTheDocument();

        // Change the name
        fireEvent.change(
            screen.getByPlaceholderText(/enter the coffee name/i),
            {
                target: { value: "Updated Blend" },
            }
        );

        // Save changes
        fireEvent.click(
            screen.getByRole("button", { name: /save changes/i })
        );

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:3001/coffee/1",
                expect.objectContaining({
                    method: "PATCH",
                })
            );
        });
    });

    it("deletes a coffee when confirmed", async () => {
        // Simulate the user confirming the browser delete prompt.
        window.confirm = vi.fn(() => true);

        render(
            <AdminPortal
                coffeeList={mockCoffeeList}
                setCoffeeList={mockSetCoffeeList}
                locations={mockLocations}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: /delete/i })
        );

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                "http://localhost:3001/coffee/1",
                expect.objectContaining({
                    method: "DELETE",
                })
            );
        });

        expect(mockSetCoffeeList).toHaveBeenCalledWith([]);
    });

    it("does not delete a coffee when cancelled", () => {
        window.confirm = vi.fn(() => false);

        render(
            <AdminPortal
                coffeeList={mockCoffeeList}
                setCoffeeList={mockSetCoffeeList}
                locations={mockLocations}
            />
        );

        fireEvent.click(
            screen.getByRole("button", { name: /delete/i })
        );

        expect(window.confirm).toHaveBeenCalled();
        expect(global.fetch).not.toHaveBeenCalled();
        expect(mockSetCoffeeList).not.toHaveBeenCalled();
    });
});