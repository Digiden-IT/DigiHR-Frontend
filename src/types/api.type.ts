import type { PaginationProps } from "antd";
export interface TQueryParam {
  name: string;
  value: string | number | boolean;
}
export interface PaginateProps {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  onChange: PaginationProps["onChange"];
}
