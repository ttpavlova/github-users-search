import { Users } from "../../types/types";
import { User } from "../User/User";

interface UsersProps {
    users: Users;
}

export const UserList = ({ users }: UsersProps) => {
    if (users.total_count === 0)
        return <div>Your search did not match any users</div>;

    return (
        <div>
            <div>{users.total_count + " results"}</div>

            {users.items.map((user) => (
                <User id={user.id} login={user.login} key={user.id} />
            ))}
        </div>
    );
};
