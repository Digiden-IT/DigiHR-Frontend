import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Button, InputNumber } from "antd";
import {
  EmployeeFormProps,
  AddNewEmployeeFormOptionsType,
  FormFieldFilterType,
} from "../../types/props.type";
import { useGetUserFilerOptionsQuery } from "../../redux/feature/userApi/userApi";
import dayjs from "dayjs";

const { Option } = Select;

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  form,
  isEditMode,
  isViewMode,
  onSubmit,
  onCancel,
  showButtons,
  initialValues,
  currentUserRole,
}) => {
  console.log("initialValues", initialValues);
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
    if (initialValues) {
      console.log("Setting initial values:", initialValues);

      // Create a modified version of initialValues that extracts constants from objects
      const formValues = {
        ...initialValues,
        gender: initialValues.gender,
        bloodGroup: initialValues.bloodGroup,
        role: initialValues.role,
        department: initialValues.department,
        employeeType: initialValues.employeeType,
        dateOfBirth: initialValues.dateOfBirth
          ? dayjs(initialValues.dateOfBirth)
          : undefined,
        dateOfJoining: initialValues.dateOfJoining
          ? dayjs(initialValues.dateOfJoining)
          : undefined,
      };

      console.log("Form values being set:", formValues);
      form.setFieldsValue(formValues);
    }
  }, [initialValues, form]);

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

  const isUserRestricted = currentUserRole === "user" || isViewMode;
  const isDisabledForEdit = isViewMode || isEditMode;

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      autoComplete="off"
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
    >
      <Form.Item
        label="Enter Employee Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
        className="w-full"
      >
        <Input placeholder="john watson" disabled={isViewMode} />
      </Form.Item>
      {isDisabledForEdit ? (
        <Form.Item
          label="Employee ID"
          name="id"
          className="w-full"
          rules={[{ required: true, message: "Please input employee id" }]}
        >
          <Input placeholder="123456" disabled />
        </Form.Item>
      ) : null}
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
          disabled={isViewMode}
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
          disabled={isDisabledForEdit}
        />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please input gender" }]}
        className="w-full"
      >
        <Select placeholder="Choose Gender" disabled={isDisabledForEdit}>
          {formOptions.genders.map((gender: FormFieldFilterType) => (
            <Option key={gender.constant} value={gender.constant}>
              {gender.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Blood Group"
        name="bloodGroup"
        rules={[{ required: true, message: "Please input blood group" }]}
        className="w-full"
      >
        <Select placeholder="Choose Group" disabled={isDisabledForEdit}>
          {formOptions.bloodGroups.map((bloodGroup: FormFieldFilterType) => (
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
        <Input placeholder="abc@digidenit.com" disabled={isViewMode} />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please input role" }]}
        className="w-full"
      >
        <Select placeholder="Select Role" disabled={isUserRestricted}>
          {formOptions.roles.map((role: FormFieldFilterType) => (
            <Option key={role.constant} value={role.constant}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Employee Type"
        name="employeeType"
        rules={[{ required: true, message: "Please input type" }]}
        className="w-full"
      >
        <Select placeholder="Select Type" disabled={isUserRestricted}>
          {formOptions.employeeTypes.map((type: FormFieldFilterType) => (
            <Option key={type.constant} value={type.constant}>
              {type.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[{ required: true }]}
        className="w-full"
      >
        <Select placeholder="Department name" disabled={isUserRestricted}>
          {formOptions.departments.map((department: FormFieldFilterType) => (
            <Option key={department.constant} value={department.constant}>
              {department.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Joining Date"
        name="dateOfJoining"
        rules={[{ required: true, message: "Please input joining date" }]}
        className="w-full"
      >
        <DatePicker
          className="w-full"
          placeholder="dd/mm/year"
          disabled={isDisabledForEdit}
        />
      </Form.Item>

      <Form.Item
        label="Designation"
        name="designation"
        rules={[{ required: true, message: "Please input designation" }]}
        className="w-full"
      >
        <Input placeholder="Enter designation" disabled={isUserRestricted} />
      </Form.Item>

      <Form.Item
        label="Enter Address"
        name="address"
        rules={[{ required: true, message: "Please input address" }]}
        className="w-full"
      >
        <Input placeholder="street, district etc.." disabled={isViewMode} />
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
