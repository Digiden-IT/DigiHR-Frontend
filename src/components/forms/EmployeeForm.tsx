import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Button, InputNumber } from "antd";
import {
  EmployeeFormProps,
  AddNewEmployeeFormOptionsType,
} from "../../types/props.type";
import { useGetUserFilerOptionsQuery } from "../../redux/feature/userApi/userApi";

const { Option } = Select;

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  form,
  isEditMode,
  isViewMode,
  onSubmit,
  onCancel,
  showButtons,
}) => {
  const { data: filterOptionsData } = useGetUserFilerOptionsQuery(undefined);
  const [formOptions, setFormOptions] = useState<AddNewEmployeeFormOptionsType>(
    {
      departments: [],
      roles: [],
      employeeTypes: [],
      bloodGroups: [],
      genders: [],
    }
  );

  useEffect(() => {
    if (filterOptionsData && !isViewMode) {
      setFormOptions({
        departments: filterOptionsData.departments || [],
        roles: filterOptionsData.roles || [],
        employeeTypes: filterOptionsData.employeeTypes || [],
        bloodGroups: filterOptionsData.bloodGroups || [],
        genders: filterOptionsData.genders || [],
      });
    }
  }, [filterOptionsData, isViewMode]);
  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
      disabled={isViewMode}
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
        rules={[
          {
            required: true,
            message: "Please input mobile number",
          },
        ]}
        className="w-full"
      >
        <InputNumber
          prefix="+88"
          placeholder="Enter 11 digit number"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: "Please input birthdate" }]}
        className="w-full"
      >
        <DatePicker
          className="w-full"
          placeholder="dd/mm/year"
          disabled={isEditMode}
        />
      </Form.Item>

      <Form.Item
        label="Select Gender"
        name="gender"
        rules={[{ required: true, message: "Please input gender" }]}
        className="w-full"
      >
        <Select placeholder="Choose Gender" disabled={isEditMode}>
          {formOptions.genders.map((gender) => (
            <Option key={gender.constant} value={gender.constant}>
              {gender.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Select Blood Group"
        name="bloodGroup"
        rules={[{ required: true, message: "Please input blood group" }]}
        className="w-full"
      >
        <Select placeholder="Choose Group" disabled={isEditMode}>
          {formOptions.bloodGroups.map((bloodGroup) => (
            <Option key={bloodGroup.constant} value={bloodGroup.constant}>
              {bloodGroup.name}
            </Option>
          ))}
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
        <Select placeholder="Select Role" disabled={isEditMode}>
          {formOptions.roles.map((role) => (
            <Option key={role.constant} value={role.constant}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Select Employee Type"
        name="employeeType"
        rules={[{ required: true, message: "Please input type" }]}
        className="w-full"
      >
        <Select placeholder="Select Type" disabled={isEditMode}>
          {formOptions.employeeTypes.map((type) => (
            <Option key={type.constant} value={type.constant}>
              {type.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Select Department"
        name="department"
        rules={[{ required: true }]}
        className="w-full"
      >
        <Select placeholder="Department name" disabled={isEditMode}>
          {formOptions.departments.map((department) => (
            <Option key={department.constant} value={department.constant}>
              {department.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Select Joining Date"
        name="dateOfJoining"
        rules={[{ required: true, message: "Please input joining date" }]}
        className="w-full"
      >
        <DatePicker
          className="w-full"
          placeholder="dd/mm/year"
          disabled={isEditMode}
        />
      </Form.Item>

      <Form.Item
        label="Select Designation"
        name="designation"
        rules={[{ required: true, message: "Please input designation" }]}
        className="w-full"
      >
        <Input placeholder="Enter designation" disabled={isEditMode} />
      </Form.Item>

      <Form.Item
        label="Enter Address"
        name="address"
        rules={[{ required: true, message: "Please input address" }]}
        className="w-full"
      >
        <Input placeholder="street, district etc.." />
      </Form.Item>

      {!isEditMode && !isViewMode && (
        <>
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
        </>
      )}

      {showButtons && (
        <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button className="btn-1" htmlType="submit">
            Apply
          </Button>
        </div>
      )}
    </Form>
  );
};

export default EmployeeForm;
