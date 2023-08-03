import { Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface SearchBarProps {
    query: string;
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
    loading: boolean;
}

const spinIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

export const SearchBar = ({ query, handleChange, loading }: SearchBarProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                data-testid="input"
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
