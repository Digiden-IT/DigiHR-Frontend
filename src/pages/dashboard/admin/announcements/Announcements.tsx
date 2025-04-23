import { Card, Button, Avatar, Dropdown } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import AddEditAnnouncement from "../../../../components/modals/AddEditAnnouncement";
import DeleteModal from "../../../../components/modals/DeleteModal";
import { AnnouncementType } from "../../../../types/props.type";
import {
  useGetAllAnnouncementsQuery,
  useDeleteAnnouncementMutation,
} from "../../../../redux/api/announcementApi";
import BasicLoader from "../../../../components/shared/BasicLoader";
import { toast } from "sonner";

const Announcements: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] =
    useState<number>(0);
  const [announcementModal, setAnnouncementModal] = useState<{
    visible: boolean;
    mode: "add" | "edit";
    data: AnnouncementType | null;
  }>({
    visible: false,
    mode: "add",
    data: null,
  });
  const {
    data: announcements,
    isLoading,
    refetch,
  } = useGetAllAnnouncementsQuery([
    { name: "sort", value: "announcementDate,desc" },
  ]);
  const [deleteAnnouncement, { isLoading: isDeleting }] =
    useDeleteAnnouncementMutation();

  const openAddModal = () => {
    setAnnouncementModal({ visible: true, mode: "add", data: null });
  };

  const openEditModal = (announcement: AnnouncementType) => {
    setAnnouncementModal({ visible: true, mode: "edit", data: announcement });
  };

  const handleCloseModals = () => {
    setAnnouncementModal({ visible: false, mode: "add", data: null });
    setIsDeleteModalOpen(false);
    setSelectedAnnouncementId(0);
  };

  const handleOpenDeleteModal = (id: number) => {
    setIsDeleteModalOpen(true);
    setSelectedAnnouncementId(id);
  };
  const handleOk = async () => {
    if (isDeleting) return;

    const toastId = toast.loading("Deleting...");
    try {
      await deleteAnnouncement(selectedAnnouncementId);
      toast.success("Announcement deleted successfully", { id: toastId });
      refetch();
      handleCloseModals();
    } catch (error) {
      toast.error("Failed to delete announcement", { id: toastId }); // Fixed "holiday" to "announcement"
    }
  };

  const getDropdownItems = (announcement: AnnouncementType) => [
    {
      key: "edit",
      label: (
        <div
          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => openEditModal(announcement)}
        >
          Edit
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <div
          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleOpenDeleteModal(announcement.id)}
        >
          Delete
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Recent Announcements</h1>
        <Button className="btn-1" icon={<FaPlus />} onClick={openAddModal}>
          Add Announcement
        </Button>
      </div>

      {isLoading ? (
        <BasicLoader />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {announcements?.data.map((announcement: AnnouncementType) => (
            <Card
              key={announcement.id}
              className="shadow-md rounded-lg border-blue-300 h-60"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  size={30}
                  src={"https://avatars.githubusercontent.com/u/90123719?v=4"}
                />
                <div>
                  <h4 className="font-medium">{announcement.authorName}</h4>
                  <h6 className="text-gray-500 text-sm">
                    {announcement.announcementDate}
                  </h6>
                </div>
                <Dropdown
                  menu={{ items: getDropdownItems(announcement) }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <AiOutlineMore className="ml-auto cursor-pointer" size={20} />
                </Dropdown>
              </div>
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <p className="text-gray-600 my-2 overflow-hidden text-ellipsis line-clamp-3">
                {announcement.description}
              </p>
            </Card>
          ))}
        </div>
      )}

      <AddEditAnnouncement
        visible={announcementModal.visible}
        onCancel={handleCloseModals}
        initialData={announcementModal.data}
        isEditing={announcementModal.mode === "edit"}
        refetchAnnouncements={refetch}
      />
      <DeleteModal
        visible={isDeleteModalOpen}
        onCancel={handleCloseModals}
        onOk={handleOk}
        deleteModalMessage="Delete Announcement?"
      />
    </div>
  );
};

export default Announcements;
