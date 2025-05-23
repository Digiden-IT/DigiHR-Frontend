import { Button, DatePicker, Form, Input, Modal } from "antd";
import { HolidayProps } from "../../types/props.type";
import { useAddNewHolidayMutation } from "../../redux/api/holidayManagementApi";
import { toast } from "sonner";

const AddNewHoliday: React.FC<HolidayProps> = ({
  visible,
  onCloseModal,
  refetchHolidays,
}) => {
  const [form] = Form.useForm();
  const [addNewHoliday, { isLoading }] = useAddNewHolidayMutation();

  const handleSubmit = async () => {
    const toastId = toast.loading("Adding new holiday");
    try {
      const values = await form.validateFields();
      const newHoliday = {
        holidayName: values.holidayName,
        date: values.date.format("YYYY-MM-DD"),
      };
      
      const response = await addNewHoliday(newHoliday).unwrap();

      if (response) {
        toast.success("New holiday added successfully!", { id: toastId });
        form.resetFields();
        refetchHolidays();
        onCloseModal();
      }
    } catch (err: any) {
      if (err.errorFields) {
        toast.error("Please check form inputs.", { id: toastId });
      } else {
        toast.error("Failed to add new holiday", { id: toastId });
      }
    }
  };
  const handleCancel = () => {
    form.resetFields();
    onCloseModal();
  };

  return (
    <Modal
      open={visible}
      footer={null}
      centered
      closable={false}
      className="rounded-xl"
      title={<div className="text-2xl font-semibold mb-6 text-center">Add New Holiday</div>}
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
