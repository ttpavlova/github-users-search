import { Pagination as PaginationComponent, Space } from "antd";

interface PaginationProps {
    total_count: number;
    handleChange: (page: number) => void;
}
export const Pagination = ({ total_count, handleChange }: PaginationProps) => {
    const totalCount = total_count > 1000 ? 1000 : total_count;

    if (totalCount <= 10) return null;

    return (
        <Space style={{ display: "flex", justifyContent: "center" }}>
            <PaginationComponent
                defaultCurrent={1}
                defaultPageSize={10}
                total={totalCount}
                showSizeChanger={false}
                onChange={handleChange}
            />
        </Space>
    );
};
