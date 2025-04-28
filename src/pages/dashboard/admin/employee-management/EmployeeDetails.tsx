// import { useState, useEffect } from "react";
// import { Form, Input, Button, message, Spin } from "antd";
// import { PiPencilSimpleLineThin } from "react-icons/pi";
// import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
// import { useNavigate, useParams } from "react-router-dom";
// import { useGetSingleUserQuery } from "../../../../redux/feature/userApi/userApi";
// import { AddNewEmployeeFieldType } from "../../../../types/props.type";

// const EmployeeDetails = () => {
//   const { userId } = useParams();
//   const employeeId = userId ? parseInt(userId, 10) : undefined;
//     const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [isEditing, setIsEditing] = useState(false);
//   const { data: employeeData, isLoading } =
//     useGetSingleUserQuery<AddNewEmployeeFieldType>(employeeId as number);


//   useEffect(() => {
//     if (employeeData) {
//       form.setFieldsValue({
//         name: employeeData.name,
//         employeeId: employeeData.id,
//         mobileNumber: employeeData.phoneNumber,
//         employeeType: employeeData.employeeType,
//         dateOfBirth: employeeData.dateOfBirth,
//         department: employeeData.department,
//         gender: employeeData.gender,
//         designation: employeeData.designation,
//         address: employeeData.address,
//         bloodGroup: employeeData.bloodGroup,
//         emailAddress: employeeData.email,
//         joiningDate: employeeData.dateOfJoining,
//       });
//     }
//   }, [employeeData, form]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       await form.validateFields();
//       const values = form.getFieldsValue();
//       console.log("Saved values:", values);
//       message.success("Profile updated successfully!");
//       setIsEditing(false);
//     } catch (errorInfo) {
//       console.log("Validation Failed:", errorInfo);
//     }
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen">
//       <div className="flex justify-between my-5">
//         <div className="flex items-center gap-6 mb-8">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMxLW5LbeJApiOdKAWdx7973rVC1iEUPtXg&s"
//             alt="Profile"
//             className="w-20 h-20 rounded-xl object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-bold">
//               {employeeData?.name || "Loading..."}
//             </h2>
//             <p className="text-gray-600">
//               {employeeData?.department || "Loading..."}
//             </p>
//             <p className="text-gray-500">
//               {employeeData?.email || "Loading..."}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-between gap-2">
//           <Button
//             icon={<MdOutlineSubdirectoryArrowLeft size={18} />}
//             onClick={handleGoBack}
//           >
//             Go Back
//           </Button>

//           {!isEditing ? (
//             <Button
//               type="primary"
//               icon={<PiPencilSimpleLineThin size={18} />}
//               onClick={handleEditClick}
//               className="btn-1"
//             >
//               Edit Profile
//             </Button>
//           ) : (
//             <Button type="primary" onClick={handleSave}>
//               Save Changes
//             </Button>
//           )}
//         </div>
//       </div>
//       <Form layout="vertical" form={form} disabled={!isEditing}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Form.Item
//             label="Enter Employee Name"
//             name="name"
//             rules={[{ required: true, message: "Please input name" }]}
//             className="w-full"
//           >
//             <Input bordered={false} />
//           </Form.Item>

//           <Form.Item label="Employee ID" name="employeeId">
//             <Input
//               className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none "
//               disabled
//             />
//           </Form.Item>

//           <Form.Item
//             label="Mobile Number"
//             name="mobileNumber"
//             rules={[{ required: true }]}
//           >
//             <Input className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none " />
//           </Form.Item>

//           <Form.Item label="Employee Type" name="employeeType">
//             <Input className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none " />
//           </Form.Item>

//           <Form.Item label="Date of Birth" name="dateOfBirth">
//             <Input disabled />
//           </Form.Item>

//           <Form.Item label="Department" name="department">
//             <Input className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none " />
//           </Form.Item>

//           <Form.Item label="Gender" name="gender">
//             <Input disabled />
//           </Form.Item>

//           <Form.Item label="Designation" name="designation">
//             <Input className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none " />
//           </Form.Item>

//           <Form.Item label="Address" name="address">
//             <Input className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none " />
//           </Form.Item>

//           <Form.Item label="Blood Group" name="bloodGroup">
//             <Input disabled />
//           </Form.Item>

//           <Form.Item
//             label="Email Address"
//             name="emailAddress"
//             rules={[{ required: true, type: "email" }]}
//           >
//             <Input className="border-b border-gray-300 focus:border-purple-500 focus:shadow-none " />
//           </Form.Item>

//           <Form.Item label="Joining Date" name="joiningDate">
//             <Input disabled />
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default EmployeeDetails;

// import { useState } from "react";
// import { Button, Spin } from "antd";
// import { PiPencilSimpleLineThin } from "react-icons/pi";
// import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
// import { useNavigate, useParams } from "react-router-dom";
// import { useGetSingleUserQuery } from "../../../../redux/feature/userApi/userApi";
// import EmployeeModal from "../../../../components/modals/AddNewEmployeeModal"; // Update with correct path

// const EmployeeDetails = () => {
//   const { userId } = useParams();
//   const employeeId = userId ? parseInt(userId, 10) : undefined;
//   const navigate = useNavigate();
//   const [isEditMode, setIsEditMode] = useState(false);

//   const {
//     data: employeeData,
//     isLoading,
//     refetch: refetchEmployee,
//   } = useGetSingleUserQuery(employeeId as number);
  
//   console.log(employeeData);
//   const handleEditClick = () => {
//     setIsEditMode(true);
//   };

//   const handleCloseModal = () => {
//     setIsEditMode(false);
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen">
//       <div className="flex justify-between my-5">
//         <div className="flex items-center gap-6 mb-8">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMxLW5LbeJApiOdKAWdx7973rVC1iEUPtXg&s"
//             alt="Profile"
//             className="w-20 h-20 rounded-xl object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-bold">
//               {employeeData?.name || "Loading..."}
//             </h2>
//             <p className="text-gray-600">
//               {employeeData?.department || "Loading..."}
//             </p>
//             <p className="text-gray-500">
//               {employeeData?.email || "Loading..."}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-between gap-2">
//           <Button
//             icon={<MdOutlineSubdirectoryArrowLeft size={18} />}
//             onClick={handleGoBack}
//           >
//             Go Back
//           </Button>

//           <Button
//             type="primary"
//             icon={<PiPencilSimpleLineThin size={18} />}
//             onClick={handleEditClick}
//             className="btn-1"
//           >
//             Edit Profile
//           </Button>
//         </div>
//       </div>

//       {/* Employee Details Section */}
//       {/* <div className="bg-white p-6 rounded-lg shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <p className="text-gray-500">Employee Name</p>
//             <p className="font-medium">{employeeData?.name || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Employee ID</p>
//             <p className="font-medium">{employeeData?.id || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Mobile Number</p>
//             <p className="font-medium">{employeeData?.phoneNumber || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Employee Type</p>
//             <p className="font-medium">{employeeData?.employeeType || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Date of Birth</p>
//             <p className="font-medium">{employeeData?.dateOfBirth || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Department</p>
//             <p className="font-medium">{employeeData?.department || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Gender</p>
//             <p className="font-medium">{employeeData?.gender || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Designation</p>
//             <p className="font-medium">{employeeData?.designation || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Address</p>
//             <p className="font-medium">{employeeData?.address || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Blood Group</p>
//             <p className="font-medium">{employeeData?.bloodGroup || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Email Address</p>
//             <p className="font-medium">{employeeData?.email || "N/A"}</p>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-500">Joining Date</p>
//             <p className="font-medium">
//               {employeeData?.dateOfJoining || "N/A"}
//             </p>
//           </div>
//         </div>
//       </div> */}

//       {/* Edit Modal */}
//       <EmployeeModal
//         visible={true}
//         onCloseModal={handleCloseModal}
//         refetchUsers={refetchEmployee}
//         initialData={employeeData}
//         isEditMode={isEditMode}
//       />
//     </div>
//   );
// };

// export default EmployeeDetails;

// import { useState } from "react";
// import { Button, Spin, Form } from "antd";
// import { PiPencilSimpleLineThin } from "react-icons/pi";
// import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
// import { IoSaveOutline } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetSingleUserQuery,
//   useUpdateUserMutation,
//   useGetUserFilerOptionsQuery,
// } from "../../../../redux/feature/userApi/userApi";
// import EmployeeForm from "../../../../components/forms/EmployeeForm";
// import { toast } from "sonner";

// const EmployeeDetails = () => {
//   const { userId } = useParams();
//   const employeeId = userId ? parseInt(userId, 10) : undefined;
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const [isEditMode, setIsEditMode] = useState(false);

//   // Fetch employee data
//   const {
//     data: employeeData,
//     isLoading,
//     refetch: refetchEmployee,
//   } = useGetSingleUserQuery(employeeId);

//   // Fetch form options for the select inputs
//   const { data: filterOptionsData } = useGetUserFilerOptionsQuery(undefined);

//   // Update user mutation
//   const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

//   // Prepare form options
//   const formOptions = {
//     departments: filterOptionsData?.departments || [],
//     roles: filterOptionsData?.roles || [],
//     employeeTypes: filterOptionsData?.employeeTypes || [],
//     bloodGroups: filterOptionsData?.bloodGroups || [],
//     genders: filterOptionsData?.genders || [],
//   };

//   const handleEditClick = () => {
//     setIsEditMode(true);
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const handleSubmit = async () => {
//     const toastId = toast.loading("Updating employee...");

//     try {
//       const values = await form.validateFields();
//       const formattedValues = {
//         ...values,
//         dateOfBirth: values.dateOfBirth
//           ? values.dateOfBirth.format("YYYY-MM-DD")
//           : undefined,
//         dateOfJoining: values.dateOfJoining
//           ? values.dateOfJoining.format("YYYY-MM-DD")
//           : undefined,
//       };

//       await updateUser({ id: employeeData.id, ...formattedValues }).unwrap();
//       toast.success("Employee updated successfully", { id: toastId });
//       refetchEmployee();
//       setIsEditMode(false);
//     } catch (error) {
//       toast.error("Failed to update employee", { id: toastId });
//     }
//   };

//   const handleCancel = () => {
//     setIsEditMode(false);
//     // Reset form to original values from employee data
//     if (employeeData) {
//       form.setFieldsValue({
//         name: employeeData.name,
//         phoneNumber: employeeData.phoneNumber,
//         dateOfBirth: employeeData.dateOfBirth,
//         gender: employeeData.gender,
//         bloodGroup: employeeData.bloodGroup,
//         email: employeeData.email,
//         role: employeeData.role,
//         employeeType: employeeData.employeeType,
//         department: employeeData.department,
//         dateOfJoining: employeeData.dateOfJoining,
//         designation: employeeData.designation,
//         address: employeeData.address,
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen">
//       <div className="flex justify-between my-5">
//         <div className="flex items-center gap-6 mb-8">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMxLW5LbeJApiOdKAWdx7973rVC1iEUPtXg&s"
//             alt="Profile"
//             className="w-20 h-20 rounded-xl object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-bold">
//               {employeeData?.name || "Loading..."}
//             </h2>
//             <p className="text-gray-600">
//               {employeeData?.department || "Loading..."}
//             </p>
//             <p className="text-gray-500">
//               {employeeData?.email || "Loading..."}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-between gap-2">
//           <Button
//             icon={<MdOutlineSubdirectoryArrowLeft size={18} />}
//             onClick={handleGoBack}
//           >
//             Go Back
//           </Button>

//           {isEditMode ? (
//             <>
//               <Button onClick={handleCancel}>Cancel</Button>
//               <Button
//                 type="primary"
//                 icon={<IoSaveOutline size={18} />}
//                 onClick={handleSubmit}
//                 loading={isUpdateLoading}
//                 className="btn-1"
//               >
//                 Save Changes
//               </Button>
//             </>
//           ) : (
//             <Button
//               type="primary"
//               icon={<PiPencilSimpleLineThin size={18} />}
//               onClick={handleEditClick}
//               className="btn-1"
//             >
//               Edit Profile
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Employee Form */}
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <EmployeeForm
//           form={form}
//           formOptions={formOptions}
//           isEditMode={isEditMode}
//           isViewOnly={!isEditMode}
//           isLoading={isUpdateLoading}
//           onSubmit={handleSubmit}
//           onCancel={handleCancel}
//           showButtons={false} // We're handling buttons in the header
//         />
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;

import { useState } from "react";
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
    if (employeeData) {
      form.setFieldsValue({
        name: employeeData.name,
        phoneNumber: employeeData.phoneNumber,
        dateOfBirth: employeeData.dateOfBirth,
        gender: employeeData.gender,
        bloodGroup: employeeData.bloodGroup,
        email: employeeData.email,
        role: employeeData.role,
        employeeType: employeeData.employeeType,
        department: employeeData.department,
        dateOfJoining: employeeData.dateOfJoining,
        designation: employeeData.designation,
        address: employeeData.address,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
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
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                icon={<IoSaveOutline size={18} />}
                onClick={handleSubmit}
                loading={isUpdateLoading}
                className="btn-1"
              >
                Save Changes
              </Button>
            </>
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
        />
    </div>
  );
};

export default EmployeeDetails;