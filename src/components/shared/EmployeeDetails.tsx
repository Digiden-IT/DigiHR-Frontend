import { useState } from "react";
import { Button, Form } from "antd";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/feature/userApi/userApi";
import EmployeeForm from "../../components/forms/EmployeeForm";
import { toast } from "sonner";
import BasicLoader from "../../components/shared/BasicLoader";
import { TUser } from "../../types/user.type";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";

const EmployeeDetails = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const { userId } = useParams();
  const routeEmployeeId = userId ? parseInt(userId, 10) : undefined;
  const employeeId = routeEmployeeId ?? user?.id;
  const currentUserRole = user?.role.toLowerCase() ?? "admin";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: employeeData,
    isLoading,
    refetch: refetchEmployee,
  } = useGetSingleUserQuery(employeeId as number);

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Updating employee...");
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.format("YYYY-MM-DD")
          : undefined,
        dateOfJoining: values.dateOfJoining
          ? values.dateOfJoining.format("YYYY-MM-DD")
          : undefined,
      };

      await updateUser({ id: employeeData.id, ...formattedValues }).unwrap();
      toast.success("Updated successfully", { id: toastId });
      refetchEmployee();
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update", { id: toastId });
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    form.resetFields();
  };

  if (isLoading) {
    return <BasicLoader />;
  }

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex flex-col md:flex-row justify-between my-5">
        <div className="flex items-center gap-6 mb-8">
          {employeeData?.gender?.constant === "FEMALE" ? (
            <img
              src="https://avatar.iran.liara.run/public/girl"
              alt="Profile"
              className="w-20 h-20 rounded-xl object-cover"
            />
          ) : (
            <img
              src="https://avatar.iran.liara.run/public/boy"
              alt="Profile"
              className="w-20 h-20 rounded-xl object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-[#b0003a]">
              {employeeData?.name}
            </h2>
            <p className="text-gray-600">{employeeData?.designation}</p>
            <p className="text-gray-500">{employeeData?.email}</p>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            icon={<MdOutlineSubdirectoryArrowLeft size={18} />}
            onClick={handleGoBack}
          >
            Go Back
          </Button>

          {isEditMode ? (
            <Button
              type="primary"
              icon={<IoSaveOutline size={18} />}
              onClick={handleSubmit}
              loading={isUpdateLoading}
              className="btn-1"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<PiPencilSimpleLineThin size={18} />}
              onClick={handleEditClick}
              className="btn-1"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <EmployeeForm
        form={form}
        isEditMode={isEditMode}
        isViewMode={!isEditMode}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        showButtons={false}
        initialValues={employeeData}
        currentUserRole={currentUserRole}
      />
    </div>
  );
};

export default EmployeeDetails;
