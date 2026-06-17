// src/pages/HomePage.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  it("renders the homepage text and shop link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /coffee r us/i })).toBeInTheDocument();

    expect(
      screen.getByText(/the go to store for all your coffee needs/i)
    ).toBeInTheDocument();

    const browseButton = screen.getByRole("link", { name: /browse coffee/i });

    expect(browseButton).toBeInTheDocument();
    expect(browseButton).toHaveAttribute("href", "/shop");
  });
});