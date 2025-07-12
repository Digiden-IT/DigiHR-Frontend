import { Modal, Button } from "antd";
import { DeleteModalProps } from "../../types/props.type";

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onCloseModal,
  onOk,
  deleteModalMessage,
}) => {
  return (
    <Modal
      open={visible}
      okText="Ok"
      cancelText="Cancel"
      centered
      closable={false}
      className="rounded-xl"
      title={
        <div className="text-xl font-semibold mb-6 text-center text-red-500">
          {deleteModalMessage}
        </div>
      }
      footer={
        <div className="flex justify-center gap-4 mt-8">
          <Button className="py-2 border rounded-md" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button className="btn-1" onClick={onOk}>
            Ok
          </Button>
        </div>
      }
    />
  );
};
export default DeleteModal;
