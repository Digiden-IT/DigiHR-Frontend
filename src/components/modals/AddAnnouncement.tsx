import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";

interface AnnouncementProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (announcement: AnnouncementType) => void;
  initialData?: AnnouncementType | null;
  isEditing?: boolean;
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
  initialData = null,
  isEditing = false,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue({
        topic: initialData.topic,
        message: initialData.content,
      });
    } else if (visible && !initialData) {
      form.resetFields();
    }
  }, [visible, initialData, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setIsLoading(true);

      const announcementData = {
        id: initialData ? initialData.id : Date.now(), // Use existing ID when editing
        name: initialData ? initialData.name : "Jabed Uddin",
        role: initialData ? initialData.role : "CEO",
        time: initialData
          ? initialData.time
          : new Date().toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
        topic: values.topic,
        content: values.message,
        avatar: initialData
          ? initialData.avatar
          : "https://avatars.githubusercontent.com/u/90123719?v=4",
      };

      onAdd(announcementData);
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
      title={
        <div className="text-2xl font-semibold mb-6">
          {isEditing ? "Edit Announcement" : "Create New Announcement"}
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
            {isEditing ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default AddAnnouncement;
