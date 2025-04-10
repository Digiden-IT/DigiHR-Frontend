import { Button } from "antd";
import { useState } from "react";

type AddNewEmployeeModalProps = {
  closeModal: () => void;
};

const defaultFormData = {
  name: "",
  number: "",
  birth: "",
  gender: "",
  group: "",
  email: "",
  role: "",
  type: "",
  department: "",
  join: "",
  designation: "",
  address: "",
};

const AddNewEmployeeModal = ({ closeModal }: AddNewEmployeeModalProps) => {
  const [formData, setformData] = useState(defaultFormData);
  const {
    name,
    number,
    birth,
    gender,
    group,
    email,
    role,
    type,
    department,
    join,
    designation,
    address,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setformData(defaultFormData);
    closeModal();
  };
  return (
    <div className="p-8">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm mb-1">Enter Employee Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => onChange(e)}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Enter Mobile Number</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Date of Birth</label>
          <input
            type="date"
            id="birth"
            value={birth}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Select Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={onChangeDropdown}
            className="w-full border rounded p-2 bg-white"
          >
            <option>Choose Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Select Blood Group</label>
          <select
            id="group"
            value={group}
            onChange={onChangeDropdown}
            className="w-full border rounded p-2 bg-white"
          >
            <option>Choose Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Enter Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="abc@gmail.com"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Select Role</label>
          <select
            id="role"
            value={role}
            onChange={onChangeDropdown}
            className="w-full border rounded p-2 bg-white"
          >
            <option>Select Role</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stact</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Select Employee Type</label>
          <select
            id="type"
            value={type}
            onChange={onChangeDropdown}
            className="w-full border rounded p-2 bg-white"
          >
            <option>Select Type</option>

            <option>Employee</option>
            <option>Intern</option>
            <option>Manager</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Select Department</label>
          <select
            id="department"
            value={department}
            onChange={onChangeDropdown}
            className="w-full border rounded p-2 bg-white"
          >
            <option>Department name</option>
            <option>HR</option>
            <option>Management</option>
            <option>Client</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Select Joining Date</label>
          <input
            type="date"
            id="join"
            value={join}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Select Designation</label>
          <select
            id="designation"
            value={designation}
            onChange={onChangeDropdown}
            className="w-full border rounded p-2 bg-white"
          >
            <option>Designation</option>
            <option>Senior Employee</option>
            <option>junior Employee</option>
            <option>Mid Level</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Enter Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="street, district etc.."
            className="w-full border rounded p-2"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
          <Button onClick={closeModal}>Cancel</Button>
          <Button htmlType="submit" className="btn-1">
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewEmployeeModal;
