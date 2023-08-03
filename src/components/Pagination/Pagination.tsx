import { Pagination as PaginationComponent, Space } from "antd";

interface PaginationProps {
    page: number;
    handleChange: (page: number) => void;
    totalCount: number;
}
export const Pagination = ({
    page,
    handleChange,
    totalCount,
}: PaginationProps) => {
    const totalUsers = totalCount > 1000 ? 1000 : totalCount;

    if (totalUsers <= 10) return null;

    return (
        <Space style={{ display: "flex", justifyContent: "center" }}>
            <PaginationComponent
                data-testid="pagination"
                defaultCurrent={1}
                current={page}
                defaultPageSize={10}
                total={totalUsers}
                showSizeChanger={false}
                onChange={handleChange}
            />
        </Space>
    );
};
