import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { AnnouncementProps } from "../../types/props.type";
import {
  useAddAnnouncementsMutation,
  useUpdateAnnouncementMutation,
} from "../../redux/api/announcementApi";
import { toast } from "sonner";

const AddEditAnnouncement: React.FC<AnnouncementProps> = ({
  visible,
  onCancel,
  initialData,
  isEditing,
  refetchAnnouncements,
}) => {
  const [addAnnouncement, { isLoading: isAdding }] =
    useAddAnnouncementsMutation();
  const [updateAnnouncement, { isLoading: isUpdating }] =
    useUpdateAnnouncementMutation();
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
      const toastId = toast.loading("Updating Announcement...");
      const announcementData = {
        title: values.topic,
        description: values.message,
      };
      try {
        if (isEditing && initialData) {
          await updateAnnouncement({
            id: initialData.id,
            ...announcementData,
          }).unwrap();
          toast.success("Announcement updated successfully!", { id: toastId });
        } else {
          await addAnnouncement(announcementData).unwrap();
          toast.success("Announcement added successfully!", { id: toastId });
        }
        refetchAnnouncements();
        form.resetFields();
        onCancel();
      } catch (err) {
        console.log(err);
        toast.error(
          isEditing
            ? "Failed to update announcement"
            : "Failed to add announcement",
          { id: toastId }
        );
      }
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
        <div className="text-2xl font-semibold mb-6 text-center">
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
          label={<span className="text-lg font-medium">Give Announcement</span>}
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
            className="btn-1"
            loading={isAdding || isUpdating}
            onClick={handleSubmit}
          >
            {isEditing ? "Update" : "+ Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditAnnouncement;
