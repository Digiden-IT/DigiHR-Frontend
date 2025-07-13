import {
  useAddLeaveRequestMutation,
  useGetAllLeaveOptionsQuery,
} from "../../redux/feature/userApi/userLeaveScheduleApi";
import {
  LeaveRequestModalProps,
  AddLeaveRequestFormOptionsType,
  FormFieldFilterType,
} from "../../types/props.type";
import { Alert, Button, DatePicker, Form, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AddLeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  visible,
  onCloseModal,
  refetchLeave,
}) => {
  const [form] = Form.useForm();
  const [addLeaveRequest, { isLoading: isAddLoading }] =
    useAddLeaveRequestMutation();
  const { data: allLeaveOptions } = useGetAllLeaveOptionsQuery(undefined);
  const [leaveReasons, setLeaveReasons] =
    useState<AddLeaveRequestFormOptionsType>({
      departments: [],
      leaveReason: [],
      requestStatus: [],
    });
  useEffect(() => {
    if (allLeaveOptions) {
      setLeaveReasons({
        departments: allLeaveOptions.departments || [],
        leaveReason: allLeaveOptions.leaveReason || [],
        requestStatus: allLeaveOptions.requestStatus || [],
      });
    }
  }, [allLeaveOptions]);

  const handleSubmit = async () => {
    const toastId = toast.loading("Requesting Leave...");
    if (isAddLoading) return;

    const values = await form.validateFields();

    const formattedValues = {
      leaveReason: values.leaveReason,
      startDate: values.range[0].format("YYYY-MM-DD"),
      endDate: values.range[1].format("YYYY-MM-DD"),
    };

    if (formattedValues.startDate > formattedValues.endDate) {
      toast.error("From date cannot be greater than To date", { id: toastId });
      return;
    }
    try {
      const response = await addLeaveRequest(formattedValues).unwrap();
      if (response) {
        toast.success("New Leave request added successfully!", { id: toastId });
        form.resetFields();
        refetchLeave();
        onCloseModal();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.errorFields) {
        toast.error("Please check form inputs.", { id: toastId });
      } else {
        toast.error("Failed to add leave request", { id: toastId });
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
      title={
        <div className="text-2xl font-semibold mb-6 text-center">
          Apply for Leave Request
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label=" Leave Reason"
          name="leaveReason"
          rules={[{ required: true, message: "Please input leave reason" }]}
          className="w-full mb-4"
        >
          <Select placeholder="Leave Reason" className="w-full">
            {leaveReasons.leaveReason.map((leave: FormFieldFilterType) => (
              <Option key={leave.constant} value={leave.constant}>
                {leave.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="range"
          name="range"
          rules={[{ required: true, message: "Please input a date" }]}
          className="w-full mb-4"
        >
          <RangePicker
            className="w-full"
            showTime={{ format: "HH" }}
            format="YYYY-MM-DD HH:mm"
            mode={["date", "date"]}
          />
        </Form.Item>
        <Alert
          message="Ensure your request is submitted at least one day prior."
          type="warning"
          showIcon
        />
        <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button className="btn-1" htmlType="submit">
            Apply
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default AddLeaveRequestModal;
