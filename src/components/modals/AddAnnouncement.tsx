import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { AnnouncementProps } from "../../types/props.type";
import { useAddAnnouncementsMutation } from "../../redux/api/announcementApi";
import { toast } from "sonner";

const AddAnnouncement: React.FC<AnnouncementProps> = ({
  visible,
  onCancel,
  // onAdd,
  initialData = null,
  isEditing = false,
}) => {
  const [addAnnouncement, { error, isLoading }] = useAddAnnouncementsMutation();
  console.log(error);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue({
        topic: initialData.title,
        message: initialData.description,
      });
    } else if (visible && !initialData) {
      form.resetFields();
    }
  }, [visible, initialData, form]);

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const announcementData = {
        title: values.topic,
        description: values.message,
      };
      try {
        const response = await addAnnouncement(announcementData).unwrap();
        if (response) {
          toast.success("Announcement added successfully!");
        }
        form.resetFields();
      } catch (err) {
        console.log(err);
        toast.error("Failed to add announcement");
      }

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
