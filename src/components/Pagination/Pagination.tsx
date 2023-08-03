import { Pagination as PaginationComponent, Space } from "antd";

interface PaginationProps {
    page: number;
    total_count: number;
    changePage: (page: number) => void;
}
export const Pagination = ({ total_count, changePage }: PaginationProps) => {
    const totalCount = total_count > 1000 ? 1000 : total_count;

    if (totalCount === 0) return null;

    return (
        <Space style={{ display: "flex", justifyContent: "center" }}>
            <PaginationComponent
                defaultCurrent={1}
                defaultPageSize={10}
                total={totalCount}
                showSizeChanger={false}
                onChange={changePage}
            />
        </Space>
    );
};
