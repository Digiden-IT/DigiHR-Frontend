import { Layout } from "antd";
import DashboardSidebar from "../components/shared/DashboardSidebar";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/shared/DashboardHeader";


const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout className="h-full">
      <DashboardSidebar />
      <Layout className="bg-[#FBF9FF]">
        <DashboardHeader />
        <Content className="mt-6 mx-4">
          <div className="bg-[#f6f3e8] rounded-[15px] border border-[#E8DDFF]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
