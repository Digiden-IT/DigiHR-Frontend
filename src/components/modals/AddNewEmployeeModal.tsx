import React from "react";
import type { FormProps } from "antd";
import { Form, Input, Select, DatePicker, Button, Modal } from "antd";
import {
  AddNewEmployeeFieldType,
  AddNewEmployeeProps,
} from "../../types/props.type";

const { Option } = Select;

const AddNewEmployeeModal: React.FC<AddNewEmployeeProps> = ({
  visible,
  onCancel,
  refetchUsers,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: AddNewEmployeeFieldType) => {
    console.log("Success:", values);
    form.resetFields();
    onCancel();
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const onFinishFailed: FormProps<AddNewEmployeeFieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      closeIcon={null}
      open={visible}
      footer={null}
      onCancel={onCancel}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "60%",
      }}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Employee</h2>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
        >
          <Form.Item
            label="Enter Employee Name"
            name="name"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input placeholder="john watson" />
          </Form.Item>

          <Form.Item
            label="Enter Mobile Number"
            name="phoneNumber"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input placeholder="0246576" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true }]}
            className="w-full"
          >
            <DatePicker className="w-full" placeholder="dd/mm/year" />
          </Form.Item>

          <Form.Item
            label="Select Gender"
            name="gender"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Choose Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Blood Group"
            name="bloodGroup"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Choose Group">
              <Option value="A+">A+</Option>
              <Option value="B+">B+</Option>
              <Option value="O+">O+</Option>
              <Option value="AB+">AB+</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Enter Email Address"
            name="email"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input placeholder="abc@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Select Role"
            name="role"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Select Role">
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Employee Type"
            name="employeeType"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Select Type">
              <Option value="full-time">Full Time</Option>
              <Option value="part-time">Part Time</Option>
              <Option value="contract">Contract</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Department"
            name="department"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Department name">
              <Option value="hr">HR</Option>
              <Option value="sales">Sales</Option>
              <Option value="engineering">Engineering</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Select Joining Date"
            name="dateOfJoining"
            rules={[{ required: true }]}
            className="w-full"
          >
            <DatePicker className="w-full" placeholder="dd/mm/year" />
          </Form.Item>

          <Form.Item
            label="Select Designation"
            name="designation"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Select placeholder="Designation">
              <Option value="developer">Developer</Option>
              <Option value="designer">Designer</Option>
              <Option value="analyst">Analyst</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Enter Address"
            name="address"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input placeholder="street, district etc.." />
          </Form.Item>

          <Form.Item
            label="Enter Password"
            name="password"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input.Password placeholder="6 digit password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input.Password placeholder="Retype password" />
          </Form.Item>

          {/* Submit and Cancel Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button className="btn-1" htmlType="submit">
              Apply
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewEmployeeModal;
