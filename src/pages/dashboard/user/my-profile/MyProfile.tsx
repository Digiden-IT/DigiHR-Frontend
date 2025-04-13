import { PiPencilSimpleLineThin } from "react-icons/pi";

import { Button } from "antd";

type ProfileFieldProps = {
  label: string;
  value: string;
  editable?: boolean;
};

const ProfileField = ({ label, value, editable }: ProfileFieldProps) => (
  <div className="mb-4">
    <p className="text-gray-500 text-sm">{label}</p>
    <div className="flex items-center justify-between">
      <p className="text-gray-900">{value}</p>
      {editable && (
        <PiPencilSimpleLineThin
          size={20}
          className="text-gray-800 cursor-pointer"
        />
      )}
    </div>
  </div>
);

export default function MyProfile() {
  return (
    <div className="min-h-screen mx-auto p-12 shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-16">
        <div className="flex items-center gap-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMxLW5LbeJApiOdKAWdx7973rVC1iEUPtXg&s"
            alt="Profile"
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">Osman Mahmud</h2>
            <p className="flex items-center gap-2 text-gray-600">
              <span>Project Manager</span>
            </p>
            <p className="text-sm text-gray-500">Random@gmail.com</p>
          </div>
        </div>
        <Button className="btn-1 py-6 px-5 rounded-lg">
          <PiPencilSimpleLineThin size={20} />
          Edit Profile
        </Button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField label="Full Name" value="Brooklyn Simmons" editable />
        <ProfileField label="Employee ID" value="879912390" />
        <ProfileField label="Mobile Number" value="(702) 555-0122" editable />
        <ProfileField label="Employee Type" value="Office" />
        <ProfileField label="Date of Birth" value="July 14, 1995" />
        <ProfileField label="Department" value="Project Manager" />
        <ProfileField label="Gender" value="Female" />
        <ProfileField label="Designation" value="Project Manager" />
        <ProfileField
          label="Address"
          value="2464 Royal Ln. Mesa, New Jersey"
          editable
        />
        <ProfileField label="Blood Group" value="O+" />
        <ProfileField
          label="Email Address"
          value="brooklyn.s@example.com"
          editable
        />
        <ProfileField label="Joining Date" value="July 10, 2022" />
      </div>
    </div>
  );
}
