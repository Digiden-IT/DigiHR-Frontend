import { PiPencilSimpleLineThin } from "react-icons/pi";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

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

export default function EmployeeDetails() {
  return (
    <div className="mx-auto p-8 bg-white rounded-2xl shadow-md border border-purple-100 mb-2">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
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
        <Link
          to={"/admin/employee-management"}
          className="flex items-center gap-2 text-purple-600 border border-purple-300 px-4 py-1.5 rounded-lg hover:bg-purple-50"
        >
          <MdOutlineSubdirectoryArrowLeft size={16} /> Go Back
        </Link>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField label="Full Name" value="Brooklyn Simmons" />
        <ProfileField label="Employee ID" value="879912390" />
        <ProfileField label="Mobile Number" value="(702) 555-0122" editable />
        <ProfileField label="Employee Type" value="Office" editable />
        <ProfileField label="Date of Birth" value="July 14, 1995" />
        <ProfileField label="Department" value="Project Manager" editable />
        <ProfileField label="Gender" value="Female" />
        <ProfileField label="Designation" value="Project Manager" editable />
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
