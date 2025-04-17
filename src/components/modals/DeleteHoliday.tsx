import { HolidayProps } from "../../types/props.type";
import { Modal, Button } from "antd";
import { useDeleteHolidayMutation } from "../../redux/api/holidayManagementApi";
import { toast } from "sonner";
import BasicLoader from "../shared/BasicLoader";

const DeleteHoliday: React.FC<HolidayProps> = ({
  visible,
  onCancel,
  refetchHolidays,
  id,
}) => {
  const [deleteHoliday, { isLoading: isDeleting }] = useDeleteHolidayMutation();

  const handleOk = async () => {
    try {
      await deleteHoliday(id);
      toast.success("Holiday deleted successfully");
      refetchHolidays();
      onCancel();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete holiday");
    }
  };

  if (isDeleting) {
    return <BasicLoader />; 
  }

  return (
    <Modal
      open={visible}
      footer={null}
      centered
      closable={false}
      className="rounded-xl"
      title={
        <div className="text-xl font-semibold mb-6 text-center text-red-500">
          Delete Holiday?
        </div>
      }
    >
      <div className="flex justify-center gap-4 mt-8">
        <Button
          className="py-2 border rounded-md"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button className="btn-1" onClick={handleOk} loading={isDeleting}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteHoliday;
