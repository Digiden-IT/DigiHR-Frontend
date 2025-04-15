import { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";

const LeaveCountSetting = () => {
  const [form] = Form.useForm();
  const [formChanged, setFormChanged] = useState(false);

  const initialValues = {
    sickLeaves: "7 days",
    casualLeaves: "15 days",
    otherLeaves: "7 days",
    yearlyLeave: "25 days",
    leavesPerMonth: "5 days",
  };

  const handleValuesChange = () => {
    setFormChanged(true);
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      console.log("Form values:", values);
      setFormChanged(false);
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leave Count Settings</h1>

      <Form
        form={form}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <Form.Item
            name="sickLeaves"
            label="Total Sick Leaves"
            labelAlign="left"
          >
            <InputNumber min={1} max={50}/>
          </Form.Item>

          <Form.Item
            name="yearlyLeave"
            label="Total Yearly Leave"
            labelAlign="left"
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="casualLeaves"
            label="Total Casual Leaves"
            labelAlign="left"
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="leavesPerMonth"
            label="Leaves Per Month"
            labelAlign="left"
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item name="otherLeaves" label="Other Leaves" labelAlign="left">
            <Input className="rounded-md" />
          </Form.Item>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!formChanged}
            className={`px-8 ${
              !formChanged ? "bg-gray-200 text-gray-400" : "btn-1"
            }`}
          >
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LeaveCountSetting;
