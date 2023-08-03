import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Users } from "../../types/types";

interface SearchBarProps {
    setUsers: React.Dispatch<React.SetStateAction<Users>>;
}

export const SearchBar = ({ setUsers }: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState("desc");

    const debouncedQuery = useDebounce(query, 1500);

    useEffect(() => {
        const getUsers = async (query: string) => {
            setLoading(true);
            if (query === "") {
                setUsers({ total_count: 0, items: [] });
            } else {
                const queryString =
                    "q=" + encodeURIComponent(query + " in:login");
                const response = await fetch(
                    `https://api.github.com/search/users?${queryString}&sort=repositories&order=${order}&page=${1}`,

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
    }, [debouncedQuery, order]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
    };

    const changeOrder = () => {
        if (order === "desc") {
            setOrder("asc");
        } else {
            setOrder("desc");
        }
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <>
            <button onClick={() => changeOrder()}>{order}</button>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="User login"
                    required
                ></input>
            </form>
        </>
    );
};