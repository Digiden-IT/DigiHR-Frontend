import { Form, Button, InputNumber } from "antd";

import { toast } from "sonner";
import { useWatch } from "antd/es/form/Form";
import {
  useGetAllLeaveCountQuery,
  useLeaveCountSettingMutation,
} from "../../../../redux/api/leaveCountSettingsApi";
import BasicLoader from "../../../../components/shared/BasicLoader";

const LeaveCountSetting = () => {
  const [LeaveCountSetting, { isLoading }] = useLeaveCountSettingMutation();
  const { data: previousLeaveCount, isLoading: getCountSettingsLoading } =
    useGetAllLeaveCountQuery(undefined);

  const [form] = Form.useForm();
  const totalSickLeaves = useWatch("totalSickLeaves", form) || 0;
  const totalCasualLeaves = useWatch("totalCasualLeaves", form) || 0;
  const totalVacationLeaves = useWatch("totalVacationLeaves", form) || 0;

  const totalLeaves = totalSickLeaves + totalCasualLeaves + totalVacationLeaves;

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      const toastId = toast.loading("Updating Leave Count Settings");

      try {
        const res = await LeaveCountSetting(values).unwrap();
        toast.success(res?.message || "Leave Count Settings updated", {
          id: toastId,
        });
      } catch (err: any) {
        toast.error(err?.data?.message || `Failed to update, try again. Error:`, {
          id: toastId,
        });
      }
    });
  };

  const initialValues = {
    totalSickLeaves: previousLeaveCount?.totalSickLeaves || 0,
    totalCasualLeaves: previousLeaveCount?.totalCasualLeaves || 0,
    totalVacationLeaves: previousLeaveCount?.totalVacationLeaves || 0,
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Leave Count Settings</h1>
      {getCountSettingsLoading ? (
        <BasicLoader />
      ) : (
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={initialValues}
          labelCol={{ span: 8 }}
          className="md:w-1/2 space-y-5 mb-5"
        >
          <div className="grid grid-cols-1 gap-y-6">
            <Form.Item
              name="totalSickLeaves"
              label="Total Sick Leaves"
              labelAlign="left"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Value must be a positive number",
                },
              ]}
            >
              <InputNumber className="rounded-md w-full" addonAfter="Days" />
            </Form.Item>

            <Form.Item
              name="totalCasualLeaves"
              label="Total Casual Leaves"
              labelAlign="left"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Value must be a positive number",
                },
              ]}
            >
              <InputNumber className="rounded-md w-full" addonAfter="Days" />
            </Form.Item>

            <Form.Item
              name="totalVacationLeaves"
              label="Other Leaves"
              labelAlign="left"
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Value must be a positive number",
                },
              ]}
            >
              <InputNumber className="rounded-md w-full" addonAfter="Days" />
            </Form.Item>
          </div>
          <div className="flex justify-between">
            <p>
              Total Yearly Leave:{" "}
              <span className="ml-20 font-bold text-lg text-[#B0003A]">
                {totalLeaves}
              </span>
            </p>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-1"
              disabled={isLoading}
            >
              Apply
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default LeaveCountSetting;
