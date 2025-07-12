import { PaginateProps } from "../../types/api.type";
import { Pagination } from "antd";

const PageNavigation: React.FC<PaginateProps> = ({
  currentPage,
  pageSize,
  totalElements,
  onChange,
}) => {
  return (
    <Pagination
      className="flex justify-end"
      current={currentPage}
      total={totalElements}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
      itemRender={(page, type, originalElement) => {
        if (type === "page") {
          return (
            <div
              className={`flex items-center justify-center w-8 h-8 rounded ${
                page === currentPage
                  ? "btn-1 text-white"
                  : "bg-white text-black border border-purple-500"
              }`}
            >
              {page}
            </div>
          );
        }
        return originalElement;
      }}
    />
  );
};

export default PageNavigation;
