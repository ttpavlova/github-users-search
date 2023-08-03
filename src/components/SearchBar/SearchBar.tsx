import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Users } from "../../types/types";
import { Input } from "antd";

interface SearchBarProps {
    setUsers: React.Dispatch<React.SetStateAction<Users>>;
    page: number;
    order: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBar = ({
    setUsers,
    page,
    order,
    setLoading,
}: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const perPage = 10;

    const debouncedQuery = useDebounce(query, 1000);

    useEffect(() => {
        const getUsers = async (query: string) => {
            setLoading(true);
            if (query === "") {
                setUsers({ total_count: 0, items: [] });
            } else {
                const queryString =
                    "q=" + encodeURIComponent(query + " in:login");
                const response = await fetch(
                    `https://api.github.com/search/users?${queryString}` +
                        `&sort=repositories` +
                        `&order=${order}` +
                        `&per_page=${perPage}` +
                        `&page=${page}`,

                    {
                        headers: {
                            Accept: "application/vnd.github.text-match+json",
                        },
                    }
                );

                const users = await response.json();
                setUsers(users);
            }

            setLoading(false);
        };

        getUsers(debouncedQuery);
    }, [debouncedQuery, order, page]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="User login"
                required
            ></Input>
        </form>
    );
};
