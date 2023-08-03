import { Col, List, Row, Select } from "antd";
import { Users } from "../../types/types";
import { User } from "../User/User";

interface UsersProps {
    users: Users;
    handleChange: (value: string) => void;
    loading: boolean;
}

export const UserList = ({ users, handleChange, loading }: UsersProps) => {
    return (
        <div>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={24} lg={12}>
                    <div>{users.total_count + " results"}</div>
                </Col>
                <Col md={24} lg={12}>
                    <Select
                        defaultValue="Sort by:"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        options={[
                            {
                                value: "desc",
                                label: "Sort by: Most repositories",
                            },
                            {
                                value: "asc",
                                label: "Sort by: Fewest repositories",
                            },
                        ]}
                    />
                </Col>
            </Row>

            <List
                itemLayout="horizontal"
                dataSource={users.items}
                locale={{
                    emptyText: "Your search does not match any users",
                }}
                renderItem={(user) => (
                    <User
                        id={user.id}
                        login={user.login}
                        avatar_url={user.avatar_url}
                        html_url={user.html_url}
                        loading={loading}
                        key={user.id}
                    />
                )}
            ></List>
        </div>
    );
};
