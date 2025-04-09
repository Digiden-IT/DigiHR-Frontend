import React from "react";
import { DatePicker, Form, Input, Select } from "antd";
import type { FormItemProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(
  str: string | number | (string | number)[]
): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<
  React.PropsWithChildren<MyFormItemGroupProps>
> = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );

  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName =
    name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const AddNewEmployeeModal: React.FC = () => {
  const onFinish = (value: object) => {
    console.log(value);
  };

  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItemGroup prefix={["user"]}>
        <div className="grid grid-cols-2 gap-4">
          <MyFormItemGroup prefix={["name"]}>
            <MyFormItem name="EnterEmployeeName" label="Enter Employee Name">
              <Input />
            </MyFormItem>
            <MyFormItem name="EnterMobileNumber" label="Enter Mobile Number">
              <Input />
            </MyFormItem>
          </MyFormItemGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MyFormItem name="DateofBirth" label="Date of Birth">
            <DatePicker defaultValue={dayjs("01/01/2015")} className="w-full" />
          </MyFormItem>

          <MyFormItem name="SelectGender" label="Select Gender">
            <Select
              defaultValue="Select Gender"
              style={{ width: "100%" }}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
          </MyFormItem>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MyFormItemGroup prefix={["name"]}>
            <MyFormItem name="SelectBloodGroup" label="Select Blood Group">
              <Select
                defaultValue="Choose Group"
                style={{ width: "100%" }}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </MyFormItem>
            <MyFormItem name="EnterEmailAddress" label="Enter Email Address">
              <Input />
            </MyFormItem>
          </MyFormItemGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MyFormItemGroup prefix={["name"]}>
            <MyFormItem name="SelectRole" label="Select Role">
              <Select
                defaultValue="Choose Role"
                style={{ width: "100%" }}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </MyFormItem>
            <MyFormItem name="SelectEmployeeType" label="Select Employee Type">
              <Select
                defaultValue="Choose Type"
                style={{ width: "100%" }}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </MyFormItem>
          </MyFormItemGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MyFormItemGroup prefix={["name"]}>
            <MyFormItem name="SelectDepartment" label="Select Department">
              <Select
                defaultValue="Department Name"
                style={{ width: "100%" }}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </MyFormItem>
            <MyFormItem name="SelectJoiningDate" label="Select Joining Date">
              <DatePicker
                defaultValue={dayjs("01/01/2015")}
                className="w-full"
              />
            </MyFormItem>
          </MyFormItemGroup>
        </div>
        <MyFormItem name="EnterAddress" label="Enter Address">
          <Input placeholder="Street, district etc..." />
        </MyFormItem>
      </MyFormItemGroup>
    </Form>
  );
};

export default AddNewEmployeeModal;
