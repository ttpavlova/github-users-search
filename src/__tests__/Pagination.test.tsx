import { render, screen } from "@testing-library/react";
import { Pagination } from "../components/Pagination/Pagination";

describe("Pagination component", () => {
    it("should not be shown if the total count is less than 11", () => {
        const changePage = jest.fn();

        render(<Pagination totalCount={10} handleChange={changePage} />);

        expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });

    it("should be shown if the total count is more or equal than 11", () => {
        const changePage = jest.fn();

        render(<Pagination totalCount={11} handleChange={changePage} />);

        expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
});
