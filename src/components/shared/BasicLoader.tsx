import { Spin } from "antd";

const BasicLoader = () => {
  return (
    <div className="flex items-center justify-center h-60">
      <Spin tip={"loading"} size="large"></Spin>
    </div>
  );
};

export default BasicLoader;
