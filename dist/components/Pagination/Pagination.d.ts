import React from "react";
export interface PaginationProps {
    className?: string;
    style?: React.CSSProperties;
    pageSize: number;
    current?: number;
    total: number;
    disabled?: boolean;
    showQuickJumper?: boolean;
    onChange?: (next: number) => void;
}
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
