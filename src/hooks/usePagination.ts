import { useState } from "react";
import { PaginationProps } from "antd";

type PaginationState = {
  currentPage: number;
  pageSize: number;
};

export const usePagination = (initialPageSize: number = 5) => {
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: initialPageSize,
  });

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    setPagination({
      currentPage: page,
      pageSize: pageSize || pagination.pageSize,
    });
  };

  return {
    pagination,
    handlePageChange,
    setPagination,
  };
};
