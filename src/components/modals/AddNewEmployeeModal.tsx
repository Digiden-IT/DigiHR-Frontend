import React from "react";
import { Form, Modal } from "antd";
import { toast } from "sonner";
import EmployeeForm from "../forms/EmployeeForm";
import { useAddUserMutation } from "../../redux/feature/userApi/userApi";
import { AddEmployeeModalProps } from "../../types/props.type";

const AddNewEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  visible,
  onCloseModal,
  refetchUsers,
}) => {
  const [form] = Form.useForm();
  const [addUser, { isLoading: isAddLoading }] = useAddUserMutation();
  const handleSubmit = async () => {
    if (isAddLoading) return;
    const toastId = toast.loading("Adding employee...");

    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
        dateOfJoining: values.dateOfJoining.format("YYYY-MM-DD"),
      };

      const { confirmPassword, ...dataToSubmit } = formattedValues;

      if (values.password !== confirmPassword) {
        toast.error("Passwords do not match", { id: toastId });
        return;
      }
      await addUser(dataToSubmit).unwrap();
      toast.success("Employee added successfully", { id: toastId });
      form.resetFields();
      refetchUsers();
      onCloseModal();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add employee", {
        id: toastId,
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCloseModal();
  };

  return (
    <Modal
      closeIcon={false}
      open={visible}
      footer={null}
      onCancel={onCloseModal}
      width={"60%"}
      centered
      title={
        <div className="text-2xl font-semibold mx-6 text-center">
          Add New Employee
        </div>
      }
    >
      <div className="p-6">
        <EmployeeForm
          form={form}
          isEditMode={false}
          isViewMode={false}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          showButtons={true}
        />
      </div>
    </Modal>
  );
};

export default AddNewEmployeeModal;
