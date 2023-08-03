import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the header", () => {
    render(<App />);
    const headerElement = screen.getByText(/users search/i);
    expect(headerElement).toBeInTheDocument();
});
