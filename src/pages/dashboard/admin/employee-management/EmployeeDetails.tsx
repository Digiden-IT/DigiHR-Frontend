import { useState, useEffect } from "react";
import { Button, Spin, Form } from "antd";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../../redux/feature/userApi/userApi";
import EmployeeForm from "../../../../components/forms/EmployeeForm";
import { toast } from "sonner";
import BasicLoader from "../../../../components/shared/BasicLoader";


const EmployeeDetails = () => {
  const { userId } = useParams();
  const employeeId = userId ? parseInt(userId, 10) : undefined;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: employeeData,
    isLoading,
    refetch: refetchEmployee,
  } = useGetSingleUserQuery(employeeId as number);

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  // Reset form when toggling edit mode or when data changes
  // useEffect(() => {
  //   if (employeeData) {
  //     form.resetFields(); // Clear any previous form data
  //   }
  // }, [isEditMode, employeeData, form]);

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
      toast.success("Employee updated successfully", { id: toastId });
      refetchEmployee();
      setIsEditMode(false);
    } catch (error) {
      toast.error("Failed to update employee", { id: toastId });
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    form.resetFields(); // This will reset the form to the initialValues
  };

  if (isLoading) {
    return (
      <BasicLoader/>
    );
  }


  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-6 mb-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMxLW5LbeJApiOdKAWdx7973rVC1iEUPtXg&s"
            alt="Profile"
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {employeeData?.name || "Loading..."}
            </h2>
            <p className="text-gray-600">
              {employeeData?.department || "Loading..."}
            </p>
            <p className="text-gray-500">
              {employeeData?.email || "Loading..."}
            </p>
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
      />
    </div>
  );
};

export default EmployeeDetails;
