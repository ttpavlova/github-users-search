import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { usePagination } from "../../hooks/usePagination";
import { SearchBar } from "../SearchBar/SearchBar";
import { UserList } from "../UserList/UserList";
import { Pagination } from "../Pagination/Pagination";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Col, Row, Space } from "antd";

export const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [order, setOrder] = useState("desc");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const debouncedQuery = useDebounce(query, 1000);
    const { page, changePage } = usePagination(debouncedQuery);
    const { users } = useUsers(
        debouncedQuery,
        order,
        page,
        setLoading,
        setError
    );

    const changeQuery = (e: React.FormEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
        setLoading(true);
    };

    const changeOrder = (value: string) => {
        setOrder(value);
    };

    return (
        <Row>
            <Col md={24} lg={8}></Col>
            <Col md={24} lg={8}>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: "flex",
                    }}
                >
                    <SearchBar
                        query={query}
                        handleChange={changeQuery}
                        loading={loading}
                    />
                    {!error && (
                        <>
                            <UserList
                                users={users}
                                handleChange={changeOrder}
                                loading={loading}
                            />
                            <Pagination
                                page={page}
                                handleChange={changePage}
                                totalCount={users.total_count}
                            />
                        </>
                    )}
                    {error && <ErrorMessage />}
                </Space>
            </Col>
            <Col md={24} lg={8}></Col>
        </Row>
    );
};
