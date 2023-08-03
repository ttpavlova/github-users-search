import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Users } from "../../types/types";
import { Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface SearchBarProps {
    setUsers: React.Dispatch<React.SetStateAction<Users>>;
    page: number;
    order: string;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const spinIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

export const SearchBar = ({
    setUsers,
    page,
    order,
    loading,
    setLoading,
}: SearchBarProps) => {
    const [query, setQuery] = useState("");
    const perPage = 10;

    const debouncedQuery = useDebounce(query, 1000);

    useEffect(() => {
        const getUsers = async (query: string) => {
            if (query !== "") {
                try {
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

                    if (response.ok) {
                        const users = await response.json();

                        setUsers(users);
                    } else {
                        throw new Error(response.statusText);
                    }
                } catch {
                    throw new Error("Failed to fetch");
                }
            } else {
                setUsers({ total_count: 0, items: [] });
            }

            setLoading(false);
        };

        getUsers(debouncedQuery);
    }, [debouncedQuery, order, page]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
        setLoading(true);
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
                suffix={<Spin indicator={spinIcon} spinning={loading} />}
                required
            ></Input>
        </form>
    );
};
