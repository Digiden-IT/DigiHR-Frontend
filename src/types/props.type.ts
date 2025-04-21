export type ServiceCardProps = {
  icon: string;
  text: string;
};

export type FeatureCardProps = {
  title: string;
  content: string;
  image: string;
  bgColor: string;
};
export interface AnnouncementType {
  id: number;
  title: string;
  description: string;
  authorName: string;
  announcementDate: string;
}
export interface AnnouncementProps {
  visible: boolean;
  onCancel: () => void;
  onAdd?: (announcement: AnnouncementType) => void;
  initialData?: AnnouncementType | null;
  isEditing?: boolean;
  refetchAnnouncements: ()=>void;
};
export interface HolidayType {
  id: number;
  date: string;
  dayOfWeek: string;
  holidayName: string;
}
export interface EmployeeManagementDataType {
  key: React.Key;
  EmployeeName: string;
  Email: string;
  Department: string;
  Role: string;
  JoiningDate: string;
}
export type AddNewEmployeeFieldType = {
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  email?: string;
  role?: string;
  employeeType?: string;
  department?: string;
  dateOfJoining?: string;
  designation?: string;
  address?: string;
  password?: string;
};

export interface AddNewEmployeeProps {
  visible: boolean;
  onCancel: () => void;
}

export interface HolidayProps {
  visible: boolean;
  onCancel: () => void;
  refetchHolidays: () => void;
  id?: number;
}

export interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  deleteModalMessage: string;
}
