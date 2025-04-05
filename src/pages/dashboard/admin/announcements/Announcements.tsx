import { Card, Button, Avatar,Modal,Input } from "antd";
import { AiOutlineMore } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useState } from 'react';

const { TextArea } = Input;


const announcements = [
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
];

const Announcements = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic,setTopic] = useState('');
  const [message,setMessage] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);
  const handleAdd = () => {
    console.log('New announcement:', topic, message);
    setIsModalOpen(false);
    setTopic('');
    setMessage('');
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Recent Announcements</h1>
        <Button className="btn-1" icon={<FaPlus />} onClick={showModal} >Add Announcement</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="shadow-md rounded-lg border-blue-300 h-60 ">
            <div className="flex items-center gap-3 mb-4">
              <Avatar size={30} src={announcement.avatar} />
              <div>
                <h4 className="font-medium">{announcement.name}</h4>
                <h6 className="text-gray-500 text-sm">
                  {announcement.role} • {announcement.time}
                </h6>
              </div>
              <AiOutlineMore className="ml-auto text-lg cursor-pointer" />
            </div>
            <h3 className="text-lg font-semibold">{announcement.topic}</h3>
            <p className="text-gray-600 my-2 overflow-hidden text-ellipsis line-clamp-3">{announcement.content}</p>
          </Card>
        ))}
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        closable = {false}
        className="rounded-xl"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Create New Announcement</h2>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Enter Announcement Topic</label>
            <Input
              placeholder="Announcement Subject"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-lg py-2"
            />
          </div>
          <div className="mb-5">
            <label className="block font-semibold mb-1">Give Announcement</label>
            <TextArea
              placeholder="Announcement Message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-lg py-2"
            />
          </div>
          <div className="flex justify-center gap-7">
            <Button
              onClick={handleCancel}
              className="rounded-xl border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6"
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </div>

    
  );
};

export default Announcements;
