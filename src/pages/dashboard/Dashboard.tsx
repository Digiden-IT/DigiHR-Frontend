import DashboardLayout from "../../layouts/DashboardLayout";
import ProtectedRoute from "../../layouts/ProtectedRoute";

const Dashboard = () => {
  return (
    <div className="min-h-screen text-primary">
      <ProtectedRoute role={undefined}>
        <DashboardLayout />
      </ProtectedRoute>
    </div>
  );
};

export default Dashboard;
