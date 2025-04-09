import { Card, Button, Avatar, Dropdown } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import AddAnnouncement from "../../../../components/modals/AddAnnouncement";
import { AnnouncementType } from "../../../../types/props.type";

const Announcements: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<AnnouncementType | null>(null);
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([
    {
      id: 1,
      name: "Darlene Robertson",
      role: "Project Manager",
      time: "Mar 16, 09:00 pm",
      topic: "Announcement Topic",
      content:
        "Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas ertum dolor sit amet consectetur. Lorem tortor Lorem ipsum dolor sit amet consectetur. Lorem tortor Lorem ipsum dolor sit amet consectetur. Lorem tortor Lorem ipsum dolor sit amet consectetur. Lorem tortor Lorem ipsum dolor sit amet consectetur. Lorem tortor t consectetur. Lorem tortor dolor elLorem ipsum dolor sit amet consectetur. Lorem tortor Lorem ipsum dolor sit amet consectetur. Lorem tortor it tincidunt cursus tincidunt amet varius. Lorem ipsum dolor sit amet consectetur. Lorem tortor dolor elit tincidunt cursus tincidunt amet varius.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Darlene Robertson",
      role: "Project Manager2",
      time: "Mar 16, 09:00 pm",
      topic: "Announcement Topic",
      content:
        "Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas  Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas Lorem ipsum dolor sit amet consectetur. Lorem tortor dolor elit tincidunt cursus tincidunt amet varius.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 3,
      name: "Darlene Robertson",
      role: "Project Manager3",
      time: "Mar 16, 09:00 pm",
      topic: "Announcement Topic",
      content:
        "Lorem ipsum dolor sit amet consectetur. Lorem tortor dolor elit tincidunt cursus tincidunt amet varius.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 4,
      name: "Darlene Robertson",
      role: "Project Manager4",
      time: "Mar 16, 09:00 pm",
      topic: "Announcement Topic",
      content:
        "Lorem ipsum Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas dolor sit amet consectetur. Lorem tortor dolor elit tincidunt cursus tincidunt amet varius.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 5,
      name: "Darlene Robertson",
      role: "Project Manager3",
      time: "Mar 16, 09:00 pm",
      topic: "Announcement Topic",
      content:
        "Lorem ipsum dolor sit amet consectetur. Lorem tortor dolor elit tincidunt cursus tincidunt amet varius.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 6,
      name: "Darlene Robertson",
      role: "Project Manager4",
      time: "Mar 16, 09:00 pm",
      topic: "Announcement Topic",
      content:
        "Lorem ipsum dolor sit Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas Lorem ipsum dolor sit ameLorem ipssdf  adfar ar Lorem aetfas eftaerft aer gas  amet consectetur. Lorem tortor dolor elit tincidunt cursus tincidunt amet varius.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  ]);

  const handleAddAnnouncement = (newAnnouncement: AnnouncementType) => {
    if (editingAnnouncement) {
      // Update existing announcement
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === editingAnnouncement.id
            ? newAnnouncement
            : announcement
        )
      );
      setEditingAnnouncement(null);
    } else {
      // Add new announcement to the beginning of the array
      setAnnouncements([newAnnouncement, ...announcements]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  const handleEdit = (id: number) => {
    const announcementToEdit = announcements.find(
      (announcement) => announcement.id === id
    );
    if (announcementToEdit) {
      setEditingAnnouncement(announcementToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setAnnouncements(
      announcements.filter((announcement) => announcement.id !== id)
    );
  };

  // Menu items for the dropdown
  const getDropdownItems = (id: number) => [
    {
      key: "edit",
      label: (
        <div
          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleEdit(id)}
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
          onClick={() => handleDelete(id)}
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
        <Button
          className="btn-1"
          icon={<FaPlus />}
          onClick={() => {
            setEditingAnnouncement(null);
            setIsModalOpen(true);
          }}
        >
          Add Announcement
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className="shadow-md rounded-lg border-blue-300 h-60"
          >
            <div className="flex items-center gap-3 mb-4">
              <Avatar size={30} src={announcement.avatar} />
              <div>
                <h4 className="font-medium">{announcement.name}</h4>
                <h6 className="text-gray-500 text-sm">
                  {announcement.role} • {announcement.time}
                </h6>
              </div>
              <Dropdown
                menu={{ items: getDropdownItems(announcement.id) }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <AiOutlineMore className="ml-auto cursor-pointer" size={20} />
              </Dropdown>
            </div>
            <h3 className="text-lg font-semibold">{announcement.topic}</h3>
            <p className="text-gray-600 my-2 overflow-hidden text-ellipsis line-clamp-3">
              {announcement.content}
            </p>
          </Card>
        ))}
      </div>
      <AddAnnouncement
        visible={isModalOpen}
        onCancel={handleCloseModal}
        onAdd={handleAddAnnouncement}
        initialData={editingAnnouncement}
        isEditing={!!editingAnnouncement}
      />
    </div>
  );
};

export default Announcements;
