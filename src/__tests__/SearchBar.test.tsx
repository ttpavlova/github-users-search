import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar/SearchBar";

describe("SearchBar component", () => {
    it("renders correctly", () => {
        const handleChange = jest.fn();

        render(
            <SearchBar query="" handleChange={handleChange} loading={false} />
        );

        const inputElem = screen.getByTestId("input");

        expect(inputElem).toBeInTheDocument();
    });

    it("calls handleChange on input change", () => {
        const handleChange = jest.fn();

        render(
            <SearchBar query="" handleChange={handleChange} loading={false} />
        );

        const inputElem = screen.getByTestId("input");

        fireEvent.change(inputElem, {
            target: { value: "Alex" },
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("updates input value on change", () => {
        let query = "";
        const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
            query = e.currentTarget.value;
        };

        const { rerender } = render(
            <SearchBar
                query={query}
                handleChange={handleChange}
                loading={false}
            />
        );

        const inputElem = screen.getByTestId("input");

        fireEvent.change(inputElem, {
            target: { value: "Alex" },
        });

        rerender(
            <SearchBar
                query={query}
                handleChange={handleChange}
                loading={false}
            />
        );

        expect(inputElem).toHaveValue("Alex");
    });
});
