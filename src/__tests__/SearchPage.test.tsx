import { render, screen } from "@testing-library/react";
import { SearchPage } from "../components/SearchPage/SearchPage";
import * as useUsersHook from "../hooks/useUsers";

const emptyMockedResponse = { items: [], total_count: 0 };

const mockedResponse = {
    items: [
        {
            id: 123,
            login: "user1",
            avatar_url: "https://avatars.com/user1.jpg",
            html_url: "https://github.com/user1",
        },
        {
            id: 125,
            login: "user2",
            avatar_url: "https://avatars.com/user2.jpg",
            html_url: "https://github.com/user2",
        },
    ],
    total_count: 2,
};

describe("SearchPage component", () => {
    it("should show empty list", () => {
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: emptyMockedResponse,
        });

        render(<SearchPage />);

        expect(screen.getByText("0 results")).toBeInTheDocument();
        expect(
            screen.getByText("Your search does not match any users")
        ).toBeInTheDocument();
    });

    it("should show mocked data on the list", () => {
        jest.spyOn(useUsersHook, "useUsers").mockReturnValue({
            users: mockedResponse,
        });

        render(<SearchPage />);

        expect(screen.getByText("2 results")).toBeInTheDocument();
        expect(screen.getByText("user1")).toBeInTheDocument();
    });
});
