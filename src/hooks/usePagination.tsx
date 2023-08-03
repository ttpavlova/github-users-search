import { useEffect, useState } from "react";

export const usePagination = (query: string) => {
    const initialValue = 1;
    const [page, setPage] = useState(initialValue);

    useEffect(() => {
        setPage(initialValue);
    }, [query]);

    const changePage = (page: number) => {
        setPage(page);
    };

    return { page, changePage };
};
