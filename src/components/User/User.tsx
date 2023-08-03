interface UserProps {
    id: number;
    login: string;
}

export const User = ({ id, login }: UserProps) => {
    return (
        <div>
            <p>{login}</p>
        </div>
    );
};
