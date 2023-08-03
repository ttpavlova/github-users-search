import { useEffect, useState } from "react";
import { Users } from "../types/types";

export const useUsers = (
    query: string,
    order: string,
    page: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [users, setUsers] = useState<Users>({ total_count: 0, items: [] });
    const perPage = 10;

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
                        setError(false);
                    } else {
                        throw new Error("Failed to fetch");
                    }
                } catch (e) {
                    setError(true);
                }
            } else {
                setUsers({ total_count: 0, items: [] });
            }

            setLoading(false);
        };

        getUsers(query);
    }, [query, order, page, setLoading, setError]);

    return { users };
};
