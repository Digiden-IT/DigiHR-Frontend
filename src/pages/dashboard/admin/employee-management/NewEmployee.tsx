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

const NewEmployee: React.FC = () => {
  const onFinish = (value: object) => {
    console.log(value);
  };

  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
      <MyFormItemGroup prefix={["user"]}>
        <MyFormItemGroup prefix={["name"]}>
          <MyFormItem name="EnterEmployeeName" label="Enter Employee Name">
            <Input />
          </MyFormItem>
          <MyFormItem name="EnterMobileNumber" label="Enter Mobile Number">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>

        <MyFormItem name="EnterEmailAddress" label="Enter Email Address">
          <Input />
        </MyFormItem>

        <MyFormItem name="SelectRole" label="Select Role">
          <Select
            defaultValue="Select Role"
            style={{ width: "100%" }}
            options={[
              { value: "Intern", label: "Intern" },
              { value: "Employee", label: "Employee" },
            ]}
          />
        </MyFormItem>

        <MyFormItem name="SelectDepartment" label="Select Department">
          <Select
            defaultValue="Department Name"
            style={{ width: "100%" }}
            options={[
              { value: "Frontend", label: "Frontend" },
              { value: "Backend", label: "Backend" },
            ]}
          />
        </MyFormItem>
        <MyFormItem name="SelectJoiningDate" label="Select Joining Date">
          <DatePicker defaultValue={dayjs("01/01/2015")} />
        </MyFormItem>
      </MyFormItemGroup>
    </Form>
  );
};

export default NewEmployee;
