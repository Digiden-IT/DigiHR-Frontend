import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";

interface AnnouncementProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (announcement: AnnouncementType) => void;
}

interface AnnouncementType {
  id: number;
  name: string;
  role: string;
  time: string;
  topic: string;
  content: string;
  avatar: string;
}

const AddAnnouncement: React.FC<AnnouncementProps> = ({
  visible,
  onCancel,
  onAdd,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setIsLoading(true);

      const newAnnouncement = {
        id: Date.now(), // Simple ID generation
        name: "Darlene Robertson", // Hardcoded for demo
        role: "Project Manager",
        time: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        topic: values.topic,
        content: values.message,
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      };

      onAdd(newAnnouncement);
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
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      className="rounded-xl"
      title={
        <div className="text-2xl font-semibold mb-6">
          Create New Announcement
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
          label={
            <span className="text-lg font-medium">
              Enter Announcement Topic
            </span>
          }
          name="topic"
          rules={[{ required: true, message: "Please enter a topic" }]}
          className="text-2xl mb-6"
        >
          <Input
            placeholder="Announcement Subject"
            size="large"
            className="rounded-md py-2"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-lg font-medium"> Give Announcement </span>
          }
          name="message"
          rules={[
            { required: true, message: "Please enter an announcement message" },
          ]}
          className="mb-6"
        >
          <Input.TextArea
            placeholder="Announcement Message"
            size="large"
            className="rounded-md py-2"
            rows={4}
          />
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
export default AddAnnouncement;
