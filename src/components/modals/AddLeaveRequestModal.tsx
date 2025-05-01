import { useAddLeaveRequestMutation } from "../../redux/feature/userApi/userLeaveScheduleApi";
import { LeaveRequestModalProps,AddLeaveRequestFormOptionsType } from "../../types/props.type";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import React, { useState } from "react";

const AddLeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  visible,
  onCloseModal,
  refetchLeave,
}) => {
  const [form] = Form.useForm();
  const [addLeaveRequest, { isLoading }] = useAddLeaveRequestMutation();
  const [leaveReasons, setLeaveReasons] =
    useState<AddLeaveRequestFormOptionsType>({
      departments: [],
      leaveReason: [],
      requestStatus: [],
    });

  const handleSubmit = () => {};
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
      ></Form>
    </Modal>
  );
};
export default AddLeaveRequestModal;
