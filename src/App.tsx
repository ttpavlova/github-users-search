import { useState } from "react";
import { Users } from "./types/types";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { UserList } from "./components/UserList/UserList";
import { usePagination } from "./hooks/usePagination";
import { Pagination } from "./components/Pagination/Pagination";
import { Col, Layout, Row, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./App.scss";

function App() {
    const [users, setUsers] = useState<Users>({ total_count: 0, items: [] });
    const [order, setOrder] = useState("desc");
    const [loading, setLoading] = useState(false);

    const { page, changePage } = usePagination();

    const changeOrder = (value: string) => {
        setOrder(value);
    };

    return (
        <div className="App">
            <Layout className="layout">
                <Header className="header">
                    <h1>Users Search</h1>
                </Header>
                <Content className="content">
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
                                    setUsers={setUsers}
                                    page={page}
                                    order={order}
                                    setLoading={setLoading}
                                />
                                <UserList
                                    users={users}
                                    handleChange={changeOrder}
                                    loading={loading}
                                />
                                <Pagination
                                    page={page}
                                    handleChange={changePage}
                                    total_count={users.total_count}
                                />
                            </Space>
                        </Col>
                        <Col md={24} lg={8}></Col>
                    </Row>
                </Content>
                <Footer className="footer"></Footer>
            </Layout>
        </div>
    );
}

export default App;
