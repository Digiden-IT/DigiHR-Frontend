import React from "react";
import { Form, Input, Select, DatePicker, Button, Modal } from "antd";
import {
  AddNewEmployeeProps,
} from "../../types/props.type";
import { useAddUserMutation } from "../../redux/feature/userApi/userApi";
import { toast } from "sonner";

const { Option } = Select;

const AddNewEmployeeModal: React.FC<AddNewEmployeeProps> = ({
  visible,
  onCancel,
  refetchUsers,
}) => {
  const [form] = Form.useForm();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async () => {
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
      onCancel();
    } catch (error) {
      console.error("Failed to add employee:", error);
      toast.error("Failed to add employee", { id: toastId });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };



  return (
    <Modal
      closeIcon={null}
      open={visible}
      footer={null}
      onCancel={onCancel}
      className=""
      width={"60%"}
      height={"100%"}
      centered
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Employee</h2>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
        >
          <Form.Item
            label="Enter Employee Name"
            name="name"
            rules={[{ required: true, message: "Please input name" }]}
            className="w-full"
          >
            <Input placeholder="john watson" />
          </Form.Item>

          <Form.Item
            label="Enter Mobile Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please input mobile number" }]}
            className="w-full"
          >
            <Input placeholder="0246576" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please input birthdate" }]}
            className="w-full"
          >
            <DatePicker className="w-full" placeholder="dd/mm/year" />
          </Form.Item>

          <Form.Item
            label="Select Gender"
            name="gender"
            rules={[{ required: true, message: "Please input gender" }]}
            className="w-full"
          >
            <Select placeholder="Choose Gender">
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Blood Group"
            name="bloodGroup"
            rules={[{ required: true, message: "Please input blood group" }]}
            className="w-full"
          >
            <Select placeholder="Choose Group">
              <Option value="A_POSITIVE">A+</Option>
              <Option value="A_NEGATIVE">A-</Option>
              <Option value="B_POSITIVE">B+</Option>
              <Option value="B_NEGATIVE">B-</Option>
              <Option value="O_POSITIVE">O+</Option>
              <Option value="O_NEGATIVE">O-</Option>
              <Option value="AB_POSITIVE">AB+</Option>
              <Option value="AB_NEGATIVE">AB-</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Enter Email Address"
            name="email"
            rules={[
              { type: "email" },
              { required: true, message: "Please input Email!" },
            ]}
            className="w-full"
          >
            <Input placeholder="abc@digidenit.com" />
          </Form.Item>

          <Form.Item
            label="Select Role"
            name="role"
            rules={[{ required: true, message: "Please input role" }]}
            className="w-full"
          >
            <Select placeholder="Select Role">
              <Option value="ADMIN">Admin</Option>
              <Option value="USER">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Employee Type"
            name="employeeType"
            rules={[{ required: true, message: "Please input type" }]}
            className="w-full"
          >
            <Select placeholder="Select Type">
              <Option value="FULL_TIME">Full Time</Option>
              <Option value="PART_TIME">Part Time</Option>
              <Option value="CONTRACTUAL">Contractual</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Department"
            name="department"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Department name">
              <Option value="HR">HR</Option>
              <Option value="SALES">Sales</Option>
              <Option value="ENGINEERING">Engineering</Option>
              <Option value="MARKETING">Marketing</Option>
              <Option value="ADMIN">Admin</Option>
              <Option value="TECHNOLOGY">Technology</Option>
              <Option value="FINANACE">Finance</Option>
              <Option value="OTHER">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Joining Date"
            name="dateOfJoining"
            rules={[{ required: true, message: "Please input joining date" }]}
            className="w-full"
          >
            <DatePicker className="w-full" placeholder="dd/mm/year" />
          </Form.Item>

          <Form.Item
            label="Select Designation"
            name="designation"
            rules={[{ required: true, message: "Please input designation" }]}
            className="w-full"
          >
            <Select placeholder="Designation">
              <Option value="DEVELOPER">Developer</Option>
              <Option value="DESIGNER">Designer</Option>
              <Option value="ANALYST">Analyst</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Enter Address"
            name="address"
            rules={[{ required: true, message: "Please input address" }]}
            className="w-full"
          >
            <Input placeholder="street, district etc.." />
          </Form.Item>

          <Form.Item
            label="Enter Password"
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
            className="w-full"
          >
            <Input.Password placeholder="Abc@1234@3#" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input.Password placeholder="Retype password" />
          </Form.Item>

          <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button className="btn-1" htmlType="submit" loading={isLoading}>
              Apply
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewEmployeeModal;
