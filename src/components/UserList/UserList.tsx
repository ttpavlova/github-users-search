import { List } from "antd";
import { Users } from "../../types/types";
import { User } from "../User/User";

interface UsersProps {
    users: Users;
    loading: boolean;
}

export const UserList = ({ users, loading }: UsersProps) => {
    if (users.total_count === 0)
        return <div>Your search did not match any users</div>;

    return (
        <div>
            <div>{users.total_count + " results"}</div>

            <List
                itemLayout="horizontal"
                dataSource={users.items}
                locale={{
                    emptyText: "Your search did not match any users",
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
