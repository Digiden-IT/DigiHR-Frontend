import { Button, DatePicker, Form, Input, Modal } from "antd";
import { HolidayProps } from "../../types/props.type";
import { useState } from "react";

const AddNewHoliday: React.FC<HolidayProps> = ({
  visible,
  onCancel,
  onAdd,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setIsLoading(true);
      
      const newHoliday = {
        key: Date.now().toString(), 
        holidayName: values.holidayName,
        date: values.date.format("MMMM DD, YYYY"),
        day: values.date.format("dddd"),
      };

      onAdd(newHoliday);
      form.resetFields();
      setIsLoading(false);
      onCancel();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={visible}
      footer={null}
      centered
      closable={false}
      className="rounded-xl"
      title={<div className="text-2xl font-semibold mb-6">Add New Holiday</div>}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="holidayName"
          rules={[{ required: true, message: "Please enter a holiday name" }]}
          className="text-2xl mb-6"
        >
          <Input
            placeholder="Holiday Name"
            size="large"
            className="rounded-md py-2"
          />
        </Form.Item>

        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please enter a date" }]}
          className="mb-6"
        >
          <DatePicker size="large" className="w-full rounded-md py-3" />
        </Form.Item>
        <div className="flex justify-center gap-4 mt-8">
          <Button className="py-2 border rounded-md" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-1"
            loading={isLoading}
          >
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddNewHoliday;
